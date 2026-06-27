import React from "react";
import { View, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/src/theme/useTheme";

export function HeroOrb({
  pulseAnim,
  ring2Anim,
}: {
  pulseAnim: Animated.Value;
  ring2Anim: Animated.Value;
}) {
  const colors = useColors();

  return (
    <View
      style={{
        width: 180,
        height: 180,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 28,
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          width: 180,
          height: 180,
          borderRadius: 90,
          borderWidth: 1,
          borderColor: "rgba(200,20,20,0.12",
          transform: [{ scale: pulseAnim }],
        }}
      />
      <Animated.View
        style={{
          position: "absolute",
          width: 137,
          height: 137,
          borderRadius: 68,
          borderWidth: 1,
          borderColor: "rgba(200,20,20,0.18)",
          transform: [{ scale: ring2Anim }],
        }}
      />
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: "rgba(200,20,20,0.30)",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(200,20,20,0.08)",
        }}
      >
        <LinearGradient
          colors={["rgba(232,53,53,0.25)", "rgba(139,0,0,0.12)"]}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            borderRadius: 50,
          }}
        />
        <Ionicons name="heart" size={44} color={colors.red} />
      </View>
    </View>
  );
}
