import React from "react";
import { View, Text } from "react-native";
import { useColors, useThemedStyles } from "@/theme/useTheme";

interface SectionHeaderProps {
  title: string;
  count: number;
  color: string;
  hasNew?: boolean;
}

export function SectionHeader({
  title,
  count,
  color,
  hasNew,
}: SectionHeaderProps) {
  const colors = useColors(); // ← Autonome
  const styles = useThemedStyles((c) => ({
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 14,
    },
    sectionDot: { width: 6, height: 6, borderRadius: 3 },
    sectionTitle: {
      color: c.white,
      fontSize: 13,
      fontWeight: "700",
      flex: 1,
      letterSpacing: 0.2,
    },
    sectionCount: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 8,
      borderWidth: 1,
    },
    sectionCountText: { fontSize: 12, fontWeight: "800" },
  }));

  const accentColor = hasNew ? colors.amber : color;

  return (
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionDot, { backgroundColor: accentColor }]} />
      <Text style={styles.sectionTitle}>{title}</Text>
      {hasNew && <Text style={{ fontSize: 14 }}>🎉</Text>}
      <View
        style={[
          styles.sectionCount,
          {
            borderColor: accentColor + "40",
            backgroundColor: accentColor + "15",
          },
        ]}
      >
        <Text style={[styles.sectionCountText, { color: accentColor }]}>
          {count}
        </Text>
      </View>
    </View>
  );
}
