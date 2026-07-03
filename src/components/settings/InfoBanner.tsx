import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/theme/useTheme";

export function InfoBanner({
  icon,
  text,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  color?: string;
}) {
  const colors = useColors();
  const bannerColor = color ?? colors.amber;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        padding: 12,
        marginHorizontal: 12,
        marginBottom: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: bannerColor + "25",
        backgroundColor: bannerColor + "08",
      }}
    >
      <Ionicons
        name={icon}
        size={15}
        color={bannerColor}
        style={{ marginTop: 1 }}
      />
      <Text
        style={{
          flex: 1,
          color: colors.textMuted,
          fontSize: 11,
          lineHeight: 16,
        }}
      >
        {text}
      </Text>
    </View>
  );
}
