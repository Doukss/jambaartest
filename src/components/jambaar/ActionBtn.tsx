import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors, useThemedStyles } from "@/theme/useTheme";

interface ActionBtnProps {
  icon: any;
  label: string;
  color: string;
  onPress: () => void;
}

export function ActionBtn({ icon, label, color, onPress }: ActionBtnProps) {
  const colors = useColors();
  const styles = useThemedStyles((c) => ({
    row: { flexDirection: "row", alignItems: "center", gap: 14, padding: 16 },
    iconWrap: {
      width: 42,
      height: 42,
      borderRadius: 12,
      backgroundColor: color + "26",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    label: { flex: 1, color: c.white, fontSize: 15, fontWeight: "600" },
  }));

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Ionicons name="chevron-forward" size={16} color={colors.textSubtle} />
    </TouchableOpacity>
  );
}
