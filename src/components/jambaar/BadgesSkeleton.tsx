import React from "react";
import { View } from "react-native";
import { useColors, useThemedStyles } from "@/src/theme/useTheme";

export function BadgesSkeleton() {
  const colors = useColors(); // ← Autonome
  const styles = useThemedStyles((c) => ({
    cardBg: {
      backgroundColor: c.cardBg,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.cardBorder,
    },
    line: { height: 10, borderRadius: 5, backgroundColor: c.cardBorder },
    gridItem: {
      width: "31%",
      aspectRatio: 0.78,
      borderRadius: 18,
      borderWidth: 1.5,
      borderColor: c.cardBorder,
      backgroundColor: c.cardBg,
    },
  }));

  return (
    <View style={{ opacity: 0.6, gap: 28 }}>
      <View style={[styles.cardBg, { padding: 18, gap: 12 }]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={[styles.line, { width: "40%" }]} />
          <View style={[styles.line, { width: "15%" }]} />
        </View>
        <View
          style={{
            height: 7,
            borderRadius: 4,
            backgroundColor: colors.cardBorder,
          }}
        />
        <View style={[styles.line, { width: "60%", height: 8 }]} />
      </View>
      <View style={{ gap: 14 }}>
        <View style={[styles.line, { width: "30%", height: 8 }]} />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <View key={i} style={styles.gridItem} />
          ))}
        </View>
      </View>
    </View>
  );
}
