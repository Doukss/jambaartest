import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/theme/useTheme";

export function PrimaryButton({
  icon,
  label,
  sublabel,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sublabel: string;
  onPress: () => void;
}) {
  const colors = useColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.82}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        borderRadius: 16,
        padding: 16,
        backgroundColor: colors.red,
      }}
    >
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          backgroundColor: "rgba(255,255,255,0.15)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={icon} size={18} color="#FFFFFF" />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: "600",
            letterSpacing: -0.2,
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: 11,
            marginTop: 1,
          }}
        >
          {sublabel}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={16}
        color="rgba(255,255,255,0.6)"
      />
    </TouchableOpacity>
  );
}
