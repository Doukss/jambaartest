import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { useSmartBack } from "./useSmartBack";
import { useMyBadges } from "./useJambaar";
import { isNetworkError } from "@/utils/error.utils";
import { isNewBadge } from "@/utils/badge.utils";


export function useBadgesScreen() {
  const { data, isLoading, isError, error, refetch } = useMyBadges();
  const hasNetworkError = isError && isNetworkError(error);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const goBack = useSmartBack({
    defaultRoute: "/(donor)/jambaar",
    routeMap: {
      jambaar: "/(donor)/jambaar",
      profile: "/(donor)/profile",
      settings: "/(donor)/profile/settings",
    },
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (!data) return;
    const pct = data.total > 0 ? data.earned / data.total : 0;
    Animated.timing(progressAnim, {
      toValue: pct,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [data]);

  // ── Dérivés ──
  const unlockedBadges = data?.badges.filter((b) => b.isUnlocked) ?? [];
  const lockedBadges = data?.badges.filter((b) => !b.isUnlocked) ?? [];
  const hasNewBadges = unlockedBadges.some((b) => isNewBadge(b));
  const progressPct =
    data && data.total > 0 ? (data.earned / data.total) * 100 : 0;
  const isComplete = data ? data.earned === data.total : false;

  return {
    data,
    isLoading,
    hasNetworkError,
    refetch,
    goBack,
    fadeAnim,
    progressAnim,
    unlockedBadges,
    lockedBadges,
    hasNewBadges,
    progressPct,
    isComplete,
  };
}
