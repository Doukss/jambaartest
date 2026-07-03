import React from "react";
import { View, Text } from "react-native";
import { useColors, useThemedStyles } from "@/theme/useTheme";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  subColor?: string;
  isRank?: boolean;
}

export function StatCard({
  label,
  value,
  sub,
  subColor,
  isRank,
}: StatCardProps) {
  const colors = useColors();
  const styles = useThemedStyles((c) => ({
    card: {
      flex: 1,
      backgroundColor: c.cardBg,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: c.cardBorder,
      padding: 16,
      gap: 4,
    },
    label: {
      color: c.textSubtle,
      fontSize: 9,
      fontWeight: "700",
      letterSpacing: 1.2,
    },
    value: {
      color: c.white,
      fontSize: 30,
      fontWeight: "900",
      letterSpacing: -1,
    },
    sub: { fontSize: 11, fontWeight: "500", color: subColor ?? c.textSubtle },
  }));

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {sub && <Text style={styles.sub}>{sub}</Text>}
    </View>
  );
}
