import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/theme/useTheme";

interface BloodTypeBannerProps {
  onPress: () => void;
}

export function BloodTypeBanner({ onPress }: BloodTypeBannerProps) {
  const colors = useColors(); // ← Autonome

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginHorizontal: 20,
        marginBottom: 14,
        backgroundColor: colors.amber + "12",
        borderWidth: 1.5,
        borderColor: colors.amber + "40",
        borderRadius: 16,
        paddingVertical: 13,
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 11,
          backgroundColor: colors.amber + "20",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Ionicons name="water-outline" size={20} color={colors.amber} />
      </View>
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={{ color: colors.amber, fontSize: 13, fontWeight: "700" }}>
          Groupe sanguin manquant
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: 12, lineHeight: 16 }}>
          Renseignez-le pour n'afficher que les alertes compatibles.
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.amber} />
    </TouchableOpacity>
  );
}
