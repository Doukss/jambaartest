import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/src/theme/useTheme";

export function SettingRow({
  icon,
  label,
  hint,
  color,
  right,
  onPress,
  last,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  hint?: string;
  color?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  last?: boolean;
}) {
  const colors = useColors();
  const rowColor = color ?? colors.textMuted;

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 14,
        minHeight: 50,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: colors.cardBorder,
      }}
      onPress={onPress}
      activeOpacity={onPress ? 0.6 : 1}
      disabled={!onPress}
    >
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          backgroundColor: rowColor + "15",
        }}
      >
        <Ionicons name={icon} size={17} color={rowColor} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            color: color ?? colors.white,
            fontSize: 14,
            fontWeight: "500",
          }}
        >
          {label}
        </Text>
        {hint && (
          <Text style={{ color: colors.textMuted, fontSize: 11 }}>{hint}</Text>
        )}
      </View>
      {right ??
        (onPress && (
          <Ionicons
            name="chevron-forward"
            size={14}
            color={colors.textSubtle}
          />
        ))}
    </TouchableOpacity>
  );
}
