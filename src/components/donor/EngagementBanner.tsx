import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/src/theme/useTheme";
import { ActiveEngagement } from "@/src/types/alert.types";
import { PendingQr } from "@/src/utils/qr.utils";
import { BLOOD_TYPE_LABELS } from "@/src/utils/format.utils";

interface EngagementBannerProps {
  engagement: ActiveEngagement | PendingQr;
  isExpired?: boolean;
  onPress: () => void;
}

export function EngagementBanner({
  engagement,
  isExpired = false,
  onPress,
}: EngagementBannerProps) {
  const colors = useColors();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  const isLocalQr = "hospitalName" in engagement;
  const hospitalName = isLocalQr
    ? (engagement as PendingQr).hospitalName
    : (engagement as ActiveEngagement).alert.healthStructure.name;
  const bloodLabel = isLocalQr
    ? (engagement as PendingQr).bloodType
    : (BLOOD_TYPE_LABELS[(engagement as ActiveEngagement).alert.bloodType] ??
      (engagement as ActiveEngagement).alert.bloodType.replace("_", ""));
  const accentColor = isExpired ? colors.amber : colors.red;

  return (
    <Animated.View
      style={{
        marginHorizontal: 20,
        marginBottom: 16,
        transform: [{ scale: pulseAnim }],
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={{
          borderRadius: 18,
          borderWidth: 1.5,
          overflow: "hidden",
          borderColor: accentColor + "30",
          backgroundColor: accentColor + "07",
          shadowColor: colors.red,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.18,
          shadowRadius: 14,
          elevation: 8,
        }}
      >
        <View
          style={{ height: 3, backgroundColor: accentColor, opacity: 0.85 }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
            paddingHorizontal: 16,
            paddingVertical: 14,
          }}
        >
          <View style={{ position: "relative", flexShrink: 0 }}>
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                backgroundColor: accentColor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="qr-code-outline" size={26} color="#FFFFFF" />
            </View>
            <View
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                borderRadius: 7,
                borderWidth: 2,
                borderColor: colors.bg,
                paddingHorizontal: 5,
                paddingVertical: 1,
                backgroundColor: isExpired ? colors.amber : colors.success,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 9,
                  fontWeight: "800",
                  letterSpacing: 0.5,
                }}
              >
                {isExpired ? "RETARD" : "LIVE"}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, gap: 4, minWidth: 0 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Text
                style={{ color: accentColor, fontSize: 14, fontWeight: "700" }}
              >
                {isExpired ? "Retard — Pass Classique" : "Vous êtes attendu !"}
              </Text>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: accentColor,
                }}
              />
            </View>
            <Text
              style={{ color: colors.textMuted, fontSize: 12 }}
              numberOfLines={1}
            >
              {hospitalName} • {bloodLabel}
            </Text>
          </View>
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              backgroundColor: "rgba(255,255,255,0.07)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.10)",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Ionicons
              name="chevron-forward"
              size={18}
              color="rgba(255,255,255,0.60)"
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
