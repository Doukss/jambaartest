import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import dayjs from "dayjs";
import { useJambaarProfile } from "@/src/hooks/useJambaar";
import { isNetworkError } from "@/src/utils/error.utils";
import { GRADE_CONFIG } from "@/src/constants/jambaarConfig";
import { useIsEligible } from "./useAuthStore";

export function useJambaarProfileScreen() {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useJambaarProfile();

  const progressWidth = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (data?.progression) {
      Animated.spring(progressWidth, {
        toValue: data.progression.progressPercent,
        friction: 7,
        tension: 40,
        useNativeDriver: false,
      }).start();
    }
  }, [data?.progression]);

  const hasNetworkError = isError && isNetworkError(error);

  // ── Dérivés ──
  const profile = data?.profile;
  const progression = data?.progression;
  const ranks = data?.ranks;

  const gradeConfig = profile
    ? (GRADE_CONFIG[profile.currentGrade] ?? GRADE_CONFIG.ASPIRANT)
    : null;
  const nextGradeConfig = progression?.nextGrade
    ? GRADE_CONFIG[progression.nextGrade]
    : null;

  const { isEligible, daysLeft: daysUntilEligible } = useIsEligible();

  // ── Actions ──
  const tap = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

  const goToBadges = () => {
    tap();
    router.push("/(donor)/jambaar/badges?from=jambaar" as any);
  };
  const goToLeaderboard = () => {
    tap();
    router.push("/(donor)/jambaar/leaderboard?from=jambaar" as any);
  };
  const goToRewards = () => {
    tap();
    router.push("/(donor)/jambaar/rewards?from=jambaar" as any);
  };

  return {
    data,
    isLoading,
    isError,
    hasNetworkError,
    refetch,
    profile,
    progression,
    ranks,
    gradeConfig,
    nextGradeConfig,
    isEligible,
    daysUntilEligible,
    fadeAnim,
    progressWidth,
    goToBadges,
    goToLeaderboard,
    goToRewards,
  };
}
