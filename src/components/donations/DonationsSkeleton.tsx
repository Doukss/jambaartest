import React from "react";
import { View } from "react-native";
import { useColors, useThemedStyles } from "@/theme/useTheme";

export function DonationsSkeleton() {
  // ← Plus de props colors
  const colors = useColors();
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
    <View style={{ paddingHorizontal: 20, gap: 12, opacity: 0.6 }}>
      {[1, 2, 3].map((i) => (
        <View key={i} style={[styles.cardBg, { padding: 16, gap: 12 }]}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                width: "50%",
              }}
            >
              <View
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  backgroundColor: colors.cardBorder,
                }}
              />
              <View style={[styles.line, { flex: 1 }]} />
            </View>
            <View style={[styles.line, { width: "20%" }]} />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                backgroundColor: colors.cardBorder,
              }}
            />
            <View style={{ gap: 6, flex: 1 }}>
              <View style={[styles.line, { width: "30%" }]} />
              <View style={[styles.line, { width: "50%", height: 8 }]} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
