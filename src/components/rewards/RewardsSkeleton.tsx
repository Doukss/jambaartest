import React from "react";
import { View } from "react-native";
import { useColors, useThemedStyles } from "@/src/theme/useTheme";

export function RewardsSkeleton() {
  const colors = useColors(); // ← Autonome
  const styles = useThemedStyles((c) => ({
    cardBg: {
      backgroundColor: c.cardBg,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: c.cardBorder,
    },
    line: { height: 10, borderRadius: 5, backgroundColor: c.cardBorder },
  }));

  return (
    <View style={{ paddingHorizontal: 20, gap: 12, opacity: 0.6 }}>
      {[1, 2, 3].map((i) => (
        <View key={i} style={[styles.cardBg, { padding: 16, gap: 10 }]}>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                backgroundColor: colors.cardBorder,
              }}
            />
            <View style={[styles.line, { width: "30%", height: 8 }]} />
          </View>
          <View style={[styles.line, { width: "70%" }]} />
          <View style={[styles.line, { width: "50%", height: 8 }]} />
          <View
            style={{
              height: 4,
              borderRadius: 2,
              backgroundColor: colors.cardBorder,
            }}
          />
          <View
            style={{
              height: 40,
              borderRadius: 12,
              backgroundColor: colors.cardBorder,
              marginTop: 4,
            }}
          />
        </View>
      ))}
    </View>
  );
}
