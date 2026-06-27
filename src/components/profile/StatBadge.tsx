import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/src/theme/useTheme";

export function StatBadge({
  icon,
  label,
  value,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string | number;
  color: string;
}) {
  const colors = useColors();
  return (
    <View style={{ flex: 1, alignItems: "center", gap: 4 }}>
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: color + "15",
        }}
      >
        <Ionicons name={icon} size={13} color={color} />
      </View>
      <Text
        style={{ fontSize: 15, fontWeight: "800", letterSpacing: -0.3, color }}
      >
        {value}
      </Text>
      <Text
        style={{
          color: "rgba(255,255,255,0.42)",
          fontSize: 10,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
    </View>
  );
}
