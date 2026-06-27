import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { useRouter } from "expo-router";
import { useCheckPendingRegistration } from "@/src/hooks/usePendingRegistration";

export function useWelcomeScreen() {
  const router = useRouter();
  useCheckPendingRegistration();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const btnAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const ring2Anim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animation d'entrée
    const entranceAnim = Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 650,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(btnAnim, {
        toValue: 1,
        duration: 380,
        useNativeDriver: true,
      }),
    ]);

    // Pulsation anneau 1
    const pulse1 = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
      ]),
    );

    // Pulsation anneau 2
    const pulse2 = Animated.loop(
      Animated.sequence([
        Animated.delay(600),
        Animated.timing(ring2Anim, {
          toValue: 1.1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(ring2Anim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
      ]),
    );

    entranceAnim.start();
    pulse1.start();
    pulse2.start();

    return () => {
      entranceAnim.stop();
      pulse1.stop();
      pulse2.stop();
    };
  }, []);

  const handleRegister = () => router.push("/(auth)/register-donor");
  const handleReconnect = () => router.push("/(auth)/reconnect-donor");

  return {
    handleRegister,
    handleReconnect,
    fadeAnim,
    slideAnim,
    btnAnim,
    pulseAnim,
    ring2Anim,
  };
}
