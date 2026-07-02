import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useSmartBack } from "./useSmartBack";

export function useEligibilityScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(18)).current;

  const goBack = useSmartBack({
    defaultRoute: "/(donor)/profile",
    routeMap: { profile: "/(donor)/profile" },
  });

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (router.canGoBack()) router.back();
    else goBack();
  };

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
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

  return { handleBack, fadeAnim, slideAnim };
}
