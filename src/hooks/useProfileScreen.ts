import { useEffect, useRef } from "react";
import { Animated, Alert } from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";

import { GRADE_CONFIG } from "../constants/jambaarConfig";
import { useColors } from "@/theme/useTheme";
import { useAuthStore } from "@/store/auth.store";
import { useIsEligible, useUserJambaarProfile } from "./useAuthStore";
import { useUpdateAvailability } from "./useAvailability";
import { useLogout } from "./useAuth";
import { BLOOD_TYPE_LABELS } from "@/utils/format.utils";

export function useProfileScreen() {
  const router = useRouter();
  const colors = useColors();

  const user = useAuthStore((s) => s.user);
  const profile = useUserJambaarProfile();
  const { isEligible, daysLeft } = useIsEligible();

  const { mutate: toggleAvailability } = useUpdateAvailability();
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 9,
        tension: 55,
        useNativeDriver: true,
      }),
    ]);
    animation.start();
    return () => animation.stop();
  }, []);

  const handleLogout = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert("Déconnexion", "Voulez-vous vous déconnecter de Vita-Link ?", [
      { text: "Annuler", style: "cancel" },
      { text: "Déconnexion", style: "destructive", onPress: () => logout() },
    ]);
  };

  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Alert.alert(
      "Supprimer mon compte",
      "Cette action est irréversible. Toutes vos données seront anonymisées.",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Supprimer", style: "destructive", onPress: () => {} },
      ],
    );
  };

  // ── Dérivés ─────────────────────────────────────────────────
  const rawGradeConfig = profile?.currentGrade
    ? GRADE_CONFIG[profile.currentGrade]
    : GRADE_CONFIG.ASPIRANT;

  // 👈 3. On résout la vraie couleur à partir du colorKey
  const gradeColor = colors[rawGradeConfig.colorKey as keyof typeof colors];

  // 👈 4. On reconstitue un objet gradeConfig complet avec la vraie couleur
  const gradeConfig = {
    ...rawGradeConfig,
    color: gradeColor,
    gradient: [gradeColor + "1A", gradeColor + "00"] as [string, string],
  };

  const bloodLabel = user?.bloodType
    ? (BLOOD_TYPE_LABELS[user.bloodType] ?? user.bloodType.replace("_", ""))
    : "Non défini";

  return {
    router,
    user,
    profile,
    isEligible,
    daysLeft,
    isLoggingOut,
    fadeAnim,
    slideAnim,
    toggleAvailability,
    handleLogout,
    handleDelete,
    gradeConfig,
    bloodLabel,
  };
}
