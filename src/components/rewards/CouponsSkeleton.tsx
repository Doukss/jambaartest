import React from "react";
import { View } from "react-native";
import { useColors, useThemedStyles } from "@/src/theme/useTheme";

export function CouponsSkeleton() {
  const colors = useColors(); // ← Autonome
  const styles = useThemedStyles((c) => ({
    cardBg: {
      backgroundColor: c.cardBg,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: c.cardBorder,
    },
    line: { height: 10, borderRadius: 5, backgroundColor: c.cardBorder },
  }));

  return (
    <View style={{ paddingHorizontal: 20, gap: 10, opacity: 0.6 }}>
      {[1, 2, 3].map((i) => (
        <View
          key={i}
          style={[
            styles.cardBg,
            { flexDirection: "row", padding: 14, gap: 12 },
          ]}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: colors.cardBorder,
            }}
          />
          <View style={{ flex: 1, gap: 6, justifyContent: "center" }}>
            <View style={[styles.line, { width: "60%" }]} />
            <View style={[styles.line, { width: "40%", height: 8 }]} />
          </View>
        </View>
      ))}
    </View>
  );
}
