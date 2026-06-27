import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors, useThemedStyles } from "@/src/theme/useTheme";
import { LeaderboardEntry } from "@/src/types/domain.types";
import { DonorGrade } from "@/src/types/shared.types";
import { GRADE_EMOJI } from "@/src/constants/jambaarConfig";

interface LeaderboardRowProps {
  item: LeaderboardEntry;
  isMe: boolean;
  index: number;
}

export function LeaderboardRow({ item, isMe, index }: LeaderboardRowProps) {
  const colors = useColors(); // ← Autonome
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(12)).current;

  const rowStyles = useThemedStyles((c) => ({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: c.cardBg,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: c.cardBorder,
      padding: 12,
      marginBottom: 8,
    },
    rowMe: {
      backgroundColor: c.red + "06",
      borderWidth: 1.5,
      borderColor: c.red + "25",
    },
    rankWrap: {
      width: 36,
      height: 36,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    rankText: { fontSize: 12, fontWeight: "900", letterSpacing: -0.3 },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: c.cardBorder,
      borderWidth: 1,
      borderColor: c.cardBorder,
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    avatarMe: { backgroundColor: c.red + "10", borderColor: c.red + "30" },
    avatarEmoji: { fontSize: 20 },
    infoBlock: { flex: 1, gap: 3 },
    nameText: { color: c.white, fontSize: 13, fontWeight: "700" },
    nameMe: { color: c.red, fontWeight: "800" },
    metaRow: { flexDirection: "row", alignItems: "center", gap: 5 },
    metaGrade: { fontSize: 10, fontWeight: "600" },
    metaDot: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
      backgroundColor: c.textSubtle,
    },
    metaBlood: { color: c.textSubtle, fontSize: 10, fontWeight: "700" },
    metaDons: { color: c.textSubtle, fontSize: 10 },
    ptsBlock: { alignItems: "flex-end", flexShrink: 0 },
    ptsValue: {
      color: c.amber,
      fontSize: 15,
      fontWeight: "900",
      letterSpacing: -0.5,
    },
    ptsLabel: { color: c.textSubtle, fontSize: 9, fontWeight: "600" },
  }));

  const getRankStyle = (rank: number) => {
    if (rank === 1) return { color: "#FFD700", bg: "#FFD70010" };
    if (rank === 2) return { color: "#C0C0C0", bg: "#C0C0C008" };
    if (rank === 3) return { color: "#CD7F32", bg: "#CD7F3208" };
    return { color: colors.textMuted, bg: "transparent" };
  };

  const getGradeColor = (grade: DonorGrade) => {
    if (grade === "ASPIRANT") return colors.success;
    if (grade === "SENTINELLE") return colors.amber;
    if (grade === "AMBASSADEUR") return colors.red;
    return colors.textMuted;
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 280,
        delay: Math.min(index * 35, 400),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 280,
        delay: Math.min(index * 35, 400),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const rs = getRankStyle(item.rank);
  const grade = item.currentGrade as DonorGrade;

  return (
    <Animated.View
      style={[
        rowStyles.row,
        isMe && rowStyles.rowMe,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View
        style={[
          rowStyles.rankWrap,
          { backgroundColor: isMe ? colors.red + "18" : rs.bg },
        ]}
      >
        <Text
          style={[
            rowStyles.rankText,
            { color: isMe ? colors.white : rs.color },
          ]}
        >
          {item.rank === 1 ? "👑" : `#${item.rank}`}
        </Text>
      </View>
      <View style={[rowStyles.avatar, isMe && rowStyles.avatarMe]}>
        <Text style={rowStyles.avatarEmoji}>{GRADE_EMOJI[grade] ?? "🌱"}</Text>
      </View>
      <View style={rowStyles.infoBlock}>
        <Text
          style={[rowStyles.nameText, isMe && rowStyles.nameMe]}
          numberOfLines={1}
        >
          {item.user.firstName} {item.user.lastName}
          {isMe ? " 👤" : ""}
        </Text>
        <View style={rowStyles.metaRow}>
          <Text
            style={[
              rowStyles.metaGrade,
              { color: getGradeColor(grade) + "CC" },
            ]}
          >
            {GRADE_EMOJI[grade]} {grade}
          </Text>
          <View style={rowStyles.metaDot} />
          <Text style={rowStyles.metaBlood}>
            {item.user.bloodType?.replace("_", "") ?? "?"}
          </Text>
          <View style={rowStyles.metaDot} />
          <Text style={rowStyles.metaDons}>
            {item.donationCount} don{item.donationCount > 1 ? "s" : ""}
          </Text>
        </View>
      </View>
      <View style={rowStyles.ptsBlock}>
        <Text style={[rowStyles.ptsValue, isMe && { color: colors.red }]}>
          {item.totalPoints.toLocaleString()}
        </Text>
        <Text style={rowStyles.ptsLabel}>pts</Text>
      </View>
    </Animated.View>
  );
}
