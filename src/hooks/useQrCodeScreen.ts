import { useEffect, useRef, useState } from "react";
import { Animated, Share, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Brightness from "expo-brightness";
import * as Haptics from "expo-haptics";
import { useCancelConfirmation } from "./useAlerts";
import { clearPendingQr } from "@/utils/qr.utils";


export function useQrCodeScreen() {
  const router = useRouter();
  const { qrCode, alertId, isExpired, origin } = useLocalSearchParams<{
    qrCode: string;
    alertId: string;
    isExpired?: string;
    origin?: string;
  }>();

  const [previousBrightness, setPreviousBrightness] = useState<number | null>(
    null,
  );

  const { mutateAsync: cancelConfirmation, isPending: isCancelling } =
    useCancelConfirmation();

  // ── Animations ──
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.88)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 70,
        friction: 9,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  // ── Luminosité ──
  useEffect(() => {
    const setup = async () => {
      try {
        const { status } = await Brightness.requestPermissionsAsync();
        if (status !== "granted") return;
        const current = await Brightness.getBrightnessAsync();
        setPreviousBrightness(current);
        await Brightness.setBrightnessAsync(1);
      } catch {}
    };
    setup();
    return () => {
      const restore = async () => {
        try {
          if (previousBrightness !== null)
            await Brightness.setBrightnessAsync(previousBrightness);
        } catch {}
      };
      restore();
    };
  }, []);

  // ── Dérivés ──
  const isCntsAlert = origin === "CNTS_DIRECT" || origin === "CNTS_ESCALATION";
  const destinationText = isCntsAlert
    ? "au Centre National de Transfusion Sanguine (CNTS)"
    : "à l'accueil de l'hôpital pour orienter votre passage";
  const instructionDetail = isCntsAlert
    ? "L'agent du CNTS scannera ce code pour valider votre don, mettre à jour les réserves de sang et créditer vos"
    : "L'hôpital vérifiera votre venue. La validation finale par le CNTS créditera vos";

  // ── Actions ──
  const handleShare = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await Share.share({
        message: `🩸 Mon code de passage Jambaar : ${qrCode}`,
      });
    } catch {
      Alert.alert("Erreur", "Impossible de partager le code.");
    }
  };

  const handleCancel = async () => {
    if (!alertId) return;
    Alert.alert(
      "Annuler votre venue ?",
      "L'établissement compte sur vous. Si vous annulez, votre engagement sera supprimé.",
      [
        { text: "Non, je maintiens", style: "cancel" },
        {
          text: "Oui, annuler",
          style: "destructive",
          onPress: async () => {
            try {
              await Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning,
              );
              await cancelConfirmation(alertId);
              await clearPendingQr();
              router.back();
            } catch {
              Alert.alert("Erreur", "Impossible d'annuler. Réessayez.");
            }
          },
        },
      ],
    );
  };

  const goBack = () => router.back();

  return {
    qrCode,
    isExpired,
    isCancelling,
    fadeAnim,
    scaleAnim,
    slideAnim,
    destinationText,
    instructionDetail,
    handleShare,
    handleCancel,
    goBack,
  };
}
