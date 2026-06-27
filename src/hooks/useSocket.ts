import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import Constants from "expo-constants";
import * as Haptics from "expo-haptics";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/src/store/auth.store";
import { tokenManager } from "@/src/utils/token.utils";
import { QUERY_KEYS } from "@/src/constants/query_key";
import { Alert } from "@/src/types/alert.types";
import logger from "@/src/utils/logger.utils";
import { useAlertStore } from "../store/alerts.store";
import { clearPendingQr } from "../utils/qr.utils";

export const useSocket = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);

  const {
    setInAppAlert,
    setJambaarCelebration,
    setBadgeUnlock,
    addAlert,
    removeAlert,
  } = useAlertStore();

  const socketRef = useRef<Socket | null>(null);
  const isConnecting = useRef(false);

  const connect = useCallback(async () => {
    if (!user) return;

    if (socketRef.current?.connected) return;
    if (isConnecting.current) return;

    const socketUrl = Constants.expoConfig?.extra?.socketUrl;
    if (!socketUrl) {
      logger.warn("SOCKET_URL non définie dans app.config.ts");
      return;
    }

    const token = await tokenManager.getAccessToken();
    if (!token) return;

    isConnecting.current = true;

    const socket = io(socketUrl, {
      auth: { token },
      transports: ["polling", "websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
      timeout: 10000,
    });

    // ── Événements de connexion ──────────────────────────────

    socket.on("connect", () => {
      isConnecting.current = false;
      logger.info("✅ Socket.io connecté");
    });

    socket.on("disconnect", (reason) => {
      logger.warn("🔌 Socket.io déconnecté :", reason);
    });

    socket.on("connect_error", (err) => {
      isConnecting.current = false;
      logger.error("❌ Socket.io erreur de connexion :", err.message);
    });

    // ── 1. NOUVELLE ALERTE (Pour les DONNEURS) ────────────────
    socket.on("alert:new", (data: Alert) => {
      logger.info("🚨 Nouvelle alerte reçue via Socket :", data.id);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

      setInAppAlert({
        id: data.id,
        title:
          data.urgencyLevel === "VITAL"
            ? "🚨 URGENCE VITALE"
            : "🩸 Alerte donneur",
        body: `Groupe ${data.bloodType} requis — ${data.healthStructure?.name}`,
        data: { alertId: data.id, urgencyLevel: data.urgencyLevel },
        receivedAt: new Date(),
      });

      addAlert(data);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.nearbyAlerts });
    });

    // ── 2. DON VALIDÉ (Pour les DONNEURS) ────────────────────
    socket.on("donation:validated", (data: any) => {
      logger.info("🎉 Don validé, points crédités :", data.pointsAwarded);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      clearPendingQr().catch((err) =>
        logger.warn("Erreur nettoyage QR local", err),
      );

      const currentUser = useAuthStore.getState().user;
      if (currentUser?.jambaarsProfile) {
        updateUser({
          jambaarsProfile: {
            ...currentUser.jambaarsProfile,
            totalPoints:
              data.totalPoints ??
              currentUser.jambaarsProfile.totalPoints + data.pointsAwarded,
            donationCount: currentUser.jambaarsProfile.donationCount + 1,
            currentGrade:
              data.newGrade ?? currentUser.jambaarsProfile.currentGrade,
            nextEligibilityAt:
              data.nextEligibilityAt ??
              currentUser.jambaarsProfile.nextEligibilityAt,
            lastDonationAt: new Date().toISOString(),
            livesSavedEstimate:
              currentUser.jambaarsProfile.livesSavedEstimate + 3,
          },
        });
      }

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.me });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activeEngagement });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.hasActiveConfirmation,
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.nearbyAlerts });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myDonations });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.jambaarsProfile });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.leaderboard });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.jambaarssBadges });

      setJambaarCelebration({
        pointsEarned: data.pointsAwarded,
        message: data.gradeChanged
          ? `Nouveau grade : ${data.newGrade} !`
          : "Votre don a été validé !",
      });
    });

    // ── 3. BADGE DÉBLOQUÉ (Pour les DONNEURS) ────────────────
    socket.on(
      "badges:earned",
      (data: {
        badges: {
          id: string;
          name: string;
          description: string;
          iconUrl?: string;
        }[];
      }) => {
        logger.info(
          "🏅 Badges débloqués :",
          data.badges.map((b) => b.name),
        );
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        // Affiche chaque badge avec un délai pour ne pas les superposer
        data.badges.forEach((badge, index) => {
          setTimeout(() => {
            setBadgeUnlock({
              name: badge.name,
              description: badge.description,
              iconUrl: badge.iconUrl,
            });
          }, index * 2500); // 2.5s entre chaque badge
        });

        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.jambaarssBadges });
      },
    );

    // ── 9. NOUVEAU BADGE CRÉÉ PAR L'ADMIN ────────────────────
    socket.on("badges:new", () => {
      logger.info("🏅 Nouveau badge disponible");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.jambaarssBadges });
    });

    // ── 4. QUOTA ATTEINT ─────────────────────────────────────
    socket.on("alert:quota_reached", (data: { alertId: string }) => {
      logger.info("🎯 Quota atteint pour l'alerte :", data.alertId);

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.nearbyAlerts });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.alert(data.alertId),
      });
    });

    // ── 5. ALERTE FERMÉE ─────────────────────────────────────
    socket.on("alert:closed", (data: { alertId: string; status: string }) => {
      logger.info("🔒 Alerte fermée :", data.alertId);

      removeAlert(data.alertId);

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.nearbyAlerts });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.alert(data.alertId),
      });
    });

    // ── 6. JOURNÉE DE DON ANNULÉE (Pour le Donneur) ──────────
    socket.on(
      "donation-day:cancelled",
      (data: { dayId: string; title: string; cancelReason: string }) => {
        logger.info("📅 Journée de don annulée via Socket :", data.dayId);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

        setInAppAlert({
          id: data.dayId,
          title: "📅 Collecte annulée",
          body: `"${data.title}" a été annulée. Raison : ${data.cancelReason}`,
          data: { dayId: data.dayId, type: "day_cancelled" },
          receivedAt: new Date(),
        });

        queryClient.invalidateQueries({
          queryKey: ["donation-days", "published"],
        });
        queryClient.invalidateQueries({
          queryKey: ["donation-days", "my-registrations"],
        });
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.donationDay(data.dayId),
        });
      },
    );

    // ── 7. JOURNÉE DE DON MODIFIÉE (Pour le Donneur) ────────
    socket.on("donation-day:updated", (data: { dayId: string }) => {
      logger.info("✏️ Journée de don modifiée via Socket :", data.dayId);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

      setInAppAlert({
        id: `update-${data.dayId}`,
        title: "📅 Modification de collecte",
        body: "Les détails d'une journée à laquelle vous êtes inscrit ont changé.",
        data: { dayId: data.dayId, type: "day_updated" },
        receivedAt: new Date(),
      });

      queryClient.invalidateQueries({
        queryKey: ["donation-days", "published"],
      });
      queryClient.invalidateQueries({
        queryKey: ["donation-days", "my-registrations"],
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.donationDay(data.dayId),
      });
    });

    // ── 8. STATUT INSCRIPTION MIS À JOUR ────────────────────
    socket.on(
      "registration:status-updated",
      (data: { dayId: string; status: string }) => {
        logger.info(
          "✅ Statut inscription mis à jour via Socket :",
          data.status,
        );

        if (data.status === "ATTENDED") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          setInAppAlert({
            id: `reg-${data.dayId}`,
            title: "✅ Présence confirmée",
            body: "Votre présence à la collecte a été validée par l'équipe médicale.",
            data: { dayId: data.dayId, type: "registration_updated" },
            receivedAt: new Date(),
          });
        }

        queryClient.invalidateQueries({
          queryKey: ["donation-days", "my-registrations"],
        });
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.donationDay(data.dayId),
        });
      },
    );

    socketRef.current = socket;
  }, [
    user?.id,
    queryClient,
    updateUser,
    setInAppAlert,
    setJambaarCelebration,
    setBadgeUnlock,
    addAlert,
    removeAlert,
  ]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      isConnecting.current = false;
      logger.info("🔌 Socket.io déconnecté manuellement");
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return { disconnect, socketRef };
};
