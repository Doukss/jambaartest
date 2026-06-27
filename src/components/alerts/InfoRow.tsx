import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors, useThemedStyles } from "@/src/theme/useTheme";

interface InfoRowProps {
  icon: any;
  label: string;
  value: string;
  valueColor?: string;
}

export function InfoRow({ icon, label, value, valueColor }: InfoRowProps) {
  const colors = useColors();

  const styles = useThemedStyles((c) => ({
    row: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14 },
    iconWrap: {
      width: 32,
      height: 32,
      borderRadius: 9,
      backgroundColor: c.cardBg,
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    label: { color: c.textMuted, fontSize: 11, marginBottom: 2 },
    value: { color: valueColor ?? c.white, fontSize: 14, fontWeight: "600" },
  }));

  return (
    <View style={styles.row}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={16} color={colors.textMuted} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}
