import React from "react";
import { View } from "react-native";
import { useColors, useThemedStyles } from "@/theme/useTheme";

export function JambaarSkeleton() {
  const colors = useColors();
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
      <View
        style={[styles.cardBg, { height: 180, borderRadius: 24, padding: 20 }]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View style={{ gap: 8, width: "60%" }}>
            <View style={[styles.line, { width: "40%" }]} />
            <View style={[styles.line, { width: "80%", height: 20 }]} />
            <View style={[styles.line, { width: "50%" }]} />
          </View>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 18,
              backgroundColor: colors.cardBorder,
            }}
          />
        </View>
        <View style={{ marginTop: 20, gap: 8 }}>
          <View
            style={{
              height: 6,
              borderRadius: 3,
              backgroundColor: colors.cardBorder,
            }}
          />
          <View style={[styles.line, { width: "60%" }]} />
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={[styles.cardBg, { flex: 1, height: 90 }]} />
        <View style={[styles.cardBg, { flex: 1, height: 90 }]} />
      </View>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={[styles.cardBg, { flex: 1, height: 90 }]} />
        <View style={[styles.cardBg, { flex: 1, height: 90 }]} />
      </View>
      <View style={[styles.cardBg, { height: 180 }]} />
    </View>
  );
}
