import React from "react";
import { View } from "react-native";
import { useColors } from "@/theme/useTheme";

export function DonorDaySkeleton() {
  const colors = useColors(); // ← Autonome

  return (
    <View
      style={{
        backgroundColor: colors.cardBg,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: colors.cardBorder,
        marginBottom: 14,
        overflow: "hidden",
        opacity: 0.45,
      }}
    >
      <View
        style={{ height: 130, backgroundColor: colors.cardBorder + "60" }}
      />
      <View style={{ padding: 16, gap: 10 }}>
        <View
          style={{
            height: 10,
            width: "45%",
            borderRadius: 5,
            backgroundColor: colors.cardBorder,
          }}
        />
        <View
          style={{
            height: 14,
            width: "80%",
            borderRadius: 7,
            backgroundColor: colors.cardBorder,
          }}
        />
        <View style={{ height: 0.5, backgroundColor: colors.cardBorder }} />
        <View style={{ gap: 6 }}>
          <View
            style={{
              height: 10,
              width: "55%",
              borderRadius: 5,
              backgroundColor: colors.cardBorder,
            }}
          />
          <View
            style={{
              height: 10,
              width: "70%",
              borderRadius: 5,
              backgroundColor: colors.cardBorder,
            }}
          />
        </View>
      </View>
    </View>
  );
}
