import React from "react";
import { View } from "react-native";
import { useColors, useThemedStyles } from "@/src/theme/useTheme";

export function LeaderboardSkeleton() {
  const colors = useColors(); // ← Autonome
  const styles = useThemedStyles((c) => ({
    cardBg: {
      backgroundColor: c.cardBg,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: c.cardBorder,
    },
  }));

  return (
    <View style={{ paddingHorizontal: 20, opacity: 0.6 }}>
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 24 }}>
        {[1, 2, 3].map((i) => (
          <View
            key={i}
            style={[styles.cardBg, { height: 32, borderRadius: 20, width: 90 }]}
          />
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 8,
          marginBottom: 30,
        }}
      >
        <View
          style={[
            styles.cardBg,
            { height: 90, width: "30%", borderRadius: 10 },
          ]}
        />
        <View
          style={[
            styles.cardBg,
            { height: 110, width: "30%", borderRadius: 10 },
          ]}
        />
        <View
          style={[
            styles.cardBg,
            { height: 70, width: "30%", borderRadius: 10 },
          ]}
        />
      </View>
      {[1, 2, 3, 4, 5].map((i) => (
        <View
          key={i}
          style={[
            styles.cardBg,
            {
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              padding: 12,
              marginBottom: 8,
            },
          ]}
        >
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: colors.cardBorder,
            }}
          />
          <View style={{ flex: 1, gap: 6 }}>
            <View
              style={{
                height: 10,
                borderRadius: 5,
                backgroundColor: colors.cardBorder,
                width: "50%",
              }}
            />
            <View
              style={{
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.cardBorder,
                width: "30%",
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}
