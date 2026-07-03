import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors, useThemedStyles } from "@/theme/useTheme";
import { Badge } from "@/types/domain.types";
import {
  getDefaultEmoji,
  isNewBadge,
  parseCriteria,
} from "@/utils/badge.utils";
import dayjs from "dayjs";

interface BadgeCardProps {
  badge: Badge;
  index: number;
}

export function BadgeCard({ badge, index }: BadgeCardProps) {
  const colors = useColors(); // ← Autonome
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;

  const [imageFailed, setImageFailed] = useState(false);

  const isUnlocked = badge.isUnlocked;
  const isNew = isNewBadge(badge);
  const showEmoji = !badge.iconUrl || imageFailed;
  const badgeEmoji = showEmoji ? getDefaultEmoji(badge) : null;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 50,
        delay: index * 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const styles = useThemedStyles((c) => ({
    badgeCard: {
      width: "31%",
      aspectRatio: 0.78,
      borderRadius: 18,
      borderWidth: 1.5,
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      position: "relative",
      overflow: "hidden",
    },
    badgeUnlocked: {
      backgroundColor: c.amber + "06",
      borderColor: c.amber + "28",
    },
    badgeLocked: { backgroundColor: c.cardBg, borderColor: c.cardBorder },
    unlockedAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 2.5,
      borderRadius: 2,
      backgroundColor: c.amber,
      opacity: 0.7,
    },
    newPill: {
      position: "absolute",
      top: 6,
      right: 6,
      backgroundColor: c.amber,
      borderRadius: 5,
      paddingHorizontal: 4,
      paddingVertical: 1,
    },
    newPillText: {
      color: "#1A1A1A",
      fontSize: 6,
      fontWeight: "900",
      letterSpacing: 0.5,
    },
    badgeIconWrap: {
      width: 48,
      height: 48,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    iconUnlocked: {
      backgroundColor: c.amber + "14",
      borderWidth: 1,
      borderColor: c.amber + "28",
    },
    iconNewUnlocked: {
      backgroundColor: c.amber + "22",
      borderColor: c.amber + "50",
      borderWidth: 2,
    },
    iconLocked: {
      backgroundColor: c.cardBorder,
      borderWidth: 1,
      borderColor: c.cardBorder,
    },
    badgeImage: { width: 36, height: 36 },
    badgeImageLocked: { opacity: 0.25 },
    lockedImageContainer: {
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
    },
    lockOverlay: {
      position: "absolute",
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: "rgba(0,0,0,0.65)",
      alignItems: "center",
      justifyContent: "center",
    },
    badgeEmoji: { fontSize: 24 },
    badgeName: {
      color: c.white,
      fontSize: 11,
      fontWeight: "800",
      textAlign: "center",
      letterSpacing: -0.2,
      lineHeight: 15,
    },
    badgeNameLocked: { color: c.textSubtle, fontWeight: "600" },
    earnedPill: {
      backgroundColor: c.amber + "15",
      borderRadius: 6,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderWidth: 1,
      borderColor: c.amber + "28",
    },
    earnedPillNew: {
      backgroundColor: c.amber + "25",
      borderColor: c.amber + "50",
    },
    earnedPillText: {
      color: c.amber,
      fontSize: 9,
      fontWeight: "700",
      letterSpacing: 0.3,
    },
    badgeCriteria: {
      color: c.textMuted,
      fontSize: 9,
      textAlign: "center",
      lineHeight: 13,
    },
  }));

  return (
    <Animated.View
      style={[
        styles.badgeCard,
        isUnlocked ? styles.badgeUnlocked : styles.badgeLocked,
        isNew && { borderColor: colors.amber + "70" },
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      {isUnlocked && (
        <View
          style={[
            styles.unlockedAccentBar,
            isNew && { backgroundColor: colors.amber },
          ]}
        />
      )}
      {isNew && (
        <View style={styles.newPill}>
          <Text style={styles.newPillText}>NOUVEAU</Text>
        </View>
      )}

      <View
        style={[
          styles.badgeIconWrap,
          isUnlocked
            ? isNew
              ? styles.iconNewUnlocked
              : styles.iconUnlocked
            : styles.iconLocked,
        ]}
      >
        {isUnlocked ? (
          !showEmoji ? (
            <Image
              source={{ uri: badge.iconUrl! }}
              style={styles.badgeImage}
              resizeMode="contain"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <Text style={[styles.badgeEmoji, isNew && { fontSize: 28 }]}>
              {badgeEmoji}
            </Text>
          )
        ) : badge.iconUrl && !imageFailed ? (
          <View style={styles.lockedImageContainer}>
            <Image
              source={{ uri: badge.iconUrl }}
              style={[styles.badgeImage, styles.badgeImageLocked]}
              resizeMode="contain"
              onError={() => setImageFailed(true)}
            />
            <View style={styles.lockOverlay}>
              <Ionicons name="lock-closed" size={12} color={colors.white} />
            </View>
          </View>
        ) : (
          <Ionicons name="lock-closed" size={20} color={colors.textSubtle} />
        )}
      </View>

      <Text
        style={[
          styles.badgeName,
          !isUnlocked && styles.badgeNameLocked,
          isNew && { color: colors.amber },
        ]}
        numberOfLines={2}
      >
        {badge.name}
      </Text>

      {isUnlocked ? (
        <View style={[styles.earnedPill, isNew && styles.earnedPillNew]}>
          <Text style={styles.earnedPillText}>
            {dayjs(badge.earnedAt).format("MMM YYYY")}
          </Text>
        </View>
      ) : (
        <Text style={styles.badgeCriteria} numberOfLines={2}>
          {parseCriteria(badge.criteria)}
        </Text>
      )}
    </Animated.View>
  );
}
