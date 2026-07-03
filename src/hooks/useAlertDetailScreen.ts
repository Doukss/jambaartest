import { useState, useRef, useCallback } from "react";
import { Share, Animated } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useIsEligible } from "@/hooks/useAuthStore";
import {
  useAlert,
  useActiveEngagement,
  useCancelConfirmation,
  useConfirmAlert,
  useDeclineAlert,
  useHasActiveConfirmation,
} from "@/hooks/useAlerts";
import { useSmartBack } from "@/hooks/useSmartBack";
import { savePendingQr } from "@/utils/qr.utils";
import { formatBloodType } from "@/utils/format.utils";

export function useAlertDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isEligible, daysLeft } = useIsEligible();
  const router = useRouter();

  const { data: alert, isLoading, isError, error, refetch } = useAlert(id);
  const { data: activeEngagement } = useActiveEngagement();
  const { mutateAsync: cancelConfirmation, isPending: isCancelling } =
    useCancelConfirmation();
  const hasConfirmedThisAlert = activeEngagement?.alert?.id === id;
  const { mutateAsync: confirmAlert, isPending: isConfirming } =
    useConfirmAlert();
  const { mutateAsync: declineAlert, isPending: isDeclining } =
    useDeclineAlert();
  const { data: hasActiveConfirmation = false } = useHasActiveConfirmation();

  const [showEtaModal, setShowEtaModal] = useState(false);
  const confirmAnim = useRef(new Animated.Value(1)).current;

  const goBack = useSmartBack({
    defaultRoute: "/(donor)",
    routeMap: { home: "/(donor)", notifications: "/(donor)" },
  });

  // ── Dérivés ──
  const isVital = alert?.urgencyLevel === "VITAL";
  const isRare = alert?.bloodType === "O_NEG" || alert?.bloodType === "AB_NEG";
  const isCntsAlert =
    alert?.origin === "CNTS_DIRECT" || alert?.origin === "CNTS_ESCALATION";
  const destinationText = isCntsAlert ? "au CNTS" : "à l'hôpital";
  const quotaPct = alert
    ? Math.min((alert.quantityConfirmed / alert.quantityNeeded) * 100, 100)
    : 0;

  // ── Actions ──
  const handleConfirm = useCallback(
    async (etaMinutes?: number) => {
      if (!id || !alert) return;
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        const result = await confirmAlert({ alertId: id, etaMinutes });
        setShowEtaModal(false);
        Animated.sequence([
          Animated.timing(confirmAnim, {
            toValue: 0.95,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.spring(confirmAnim, { toValue: 1, useNativeDriver: true }),
        ]).start();
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success,
        );

        await savePendingQr({
          qrCode: result.qrCode,
          alertId: id,
          hospitalName: alert.healthStructure.name,
          bloodType: alert.bloodType,
          confirmedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
        });

        router.push({
          pathname: "/(donor)/qrcode" as any,
          params: {
            qrCode: result.qrCode,
            alertId: id,
            isExpired: "false",
            origin: alert.origin || "HOSPITAL_DIRECT",
          },
        });
      } catch {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setShowEtaModal(false);
      }
    },
    [id, alert, confirmAlert, router, confirmAnim],
  );

  const handleRelay = async () => {
    if (!alert) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      await Share.share({
        message: `🚨 URGENCE : L'hôpital ${alert.healthStructure.name} a besoin de sang ${formatBloodType(alert.bloodType)} ! Si tu es disponible, aide-nous.`,
      });
    } catch {}
  };

  const handleDecline = useCallback(async () => {
    if (!id) return;
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await declineAlert(id);
      router.back();
    } catch {}
  }, [id, declineAlert, router]);

  const handleCancel = useCallback(async () => {
    if (!id) return;
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      await cancelConfirmation(id);
    } catch {}
  }, [id, cancelConfirmation]);

  const openQrViewer = () => {
    if (!activeEngagement) return;
    router.push({
      pathname: "/(donor)/qrcode" as any,
      params: {
        qrCode: activeEngagement.qrCode,
        alertId: activeEngagement.alert?.id,
        origin: activeEngagement.alert?.origin || "HOSPITAL_DIRECT",
        isExpired: "false",
      },
    });
  };

  return {
    id,
    alert,
    isLoading,
    isError,
    error,
    refetch,
    goBack,
    isEligible,
    daysLeft,
    isVital,
    isRare,
    destinationText,
    quotaPct,
    hasConfirmedThisAlert,
    hasActiveConfirmation,
    activeEngagement,
    showEtaModal,
    setShowEtaModal,
    confirmAnim,
    isConfirming,
    isDeclining,
    isCancelling,
    handleConfirm,
    handleRelay,
    handleDecline,
    handleCancel,
    openQrViewer,
  };
}
