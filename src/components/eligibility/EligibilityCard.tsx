import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/theme/useTheme";

interface BaseItem {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  detail: string;
}

export function EligibilityCard({
  item,
  delay,
  accentColor,
  badge,
}: {
  item: BaseItem;
  delay: number;
  accentColor: string;
  badge?: string;
}) {
  const colors = useColors();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(anim, {
      toValue: 1,
      duration: 320,
      delay,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 0],
            }),
          },
        ],
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
        backgroundColor: colors.cardBg,
        borderRadius: 14,
        borderWidth: 0.5,
        borderColor: colors.cardBorder,
        padding: 13,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: accentColor + "18",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Ionicons name={item.icon} size={17} color={accentColor} />
      </View>

      <View style={{ flex: 1 }}>
        {/* FIX DU BADGE: flexShrink: 1 sur le wrapper du titre et flexWrap sur le conteneur parent */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginBottom: 3,
            flexWrap: "wrap",
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: 13,
              fontWeight: "700",
              flexShrink: 1,
            }}
          >
            {item.title}
          </Text>
          {badge && (
            <View
              style={{
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 6,
                backgroundColor: accentColor + "18",
                borderWidth: 0.5,
                borderColor: accentColor + "38",
              }}
            >
              <Text
                style={{
                  color: accentColor,
                  fontSize: 9,
                  fontWeight: "700",
                  letterSpacing: 0.4,
                }}
              >
                {badge}
              </Text>
            </View>
          )}
        </View>

        <Text style={{ color: colors.textMuted, fontSize: 12, lineHeight: 17 }}>
          {item.detail}
        </Text>
      </View>
    </Animated.View>
  );
}
