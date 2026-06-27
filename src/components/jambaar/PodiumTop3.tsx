import React from "react";
import { View, Text } from "react-native";
import { useColors, useThemedStyles } from "@/src/theme/useTheme";
import { LeaderboardEntry } from "@/src/types/domain.types";
import { DonorGrade } from "@/src/types/shared.types";
import { GRADE_EMOJI } from "@/src/constants/jambaarConfig";

interface PodiumTop3Props {
  entries: LeaderboardEntry[];
  myId?: string;
}

export function PodiumTop3({ entries, myId }: PodiumTop3Props) {
  const colors = useColors(); // ← Autonome

  const styles = useThemedStyles((c) => ({
    container: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "center",
      gap: 8,
      marginBottom: 24,
      paddingHorizontal: 12,
    },
    col: { flex: 1, alignItems: "center", gap: 4 },
    avatar: {
      width: 52,
      height: 52,
      borderRadius: 16,
      backgroundColor: c.cardBorder,
      borderWidth: 2,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarMe: { backgroundColor: c.red + "12", borderColor: c.red + "60" },
    avatarEmoji: { fontSize: 26 },
    name: {
      color: c.white,
      fontSize: 12,
      fontWeight: "700",
      textAlign: "center",
    },
    pts: { color: c.textMuted, fontSize: 10, fontWeight: "600" },
    column: {
      width: "100%",
      borderRadius: 10,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    rankLabel: { fontSize: 16, fontWeight: "900" },
  }));

  const getRankStyle = (rank: number) => {
    if (rank === 1) return { color: "#FFD700", bg: "#FFD70010", label: "👑" };
    if (rank === 2)
      return { color: "#C0C0C0", bg: "#C0C0C008", label: `#${rank}` };
    if (rank === 3)
      return { color: "#CD7F32", bg: "#CD7F3208", label: `#${rank}` };
    return { color: colors.textMuted, bg: "transparent", label: `#${rank}` };
  };

  const top3 = entries.slice(0, 3);
  if (top3.length < 3) return null;

  const order = [top3[1], top3[0], top3[2]];
  const heights = [70, 90, 55];
  const rankStyles = [getRankStyle(2), getRankStyle(1), getRankStyle(3)];

  return (
    <View style={styles.container}>
      {order.map((entry, i) => {
        const rs = rankStyles[i];
        const isMe = entry.user.id === myId;
        const grade = entry.currentGrade as DonorGrade;
        return (
          <View key={entry.user.id} style={styles.col}>
            <View
              style={[
                styles.avatar,
                { borderColor: rs.color + "50" },
                isMe && styles.avatarMe,
              ]}
            >
              <Text style={styles.avatarEmoji}>
                {GRADE_EMOJI[grade] ?? "🌱"}
              </Text>
            </View>
            <Text
              style={[styles.name, isMe && { color: colors.red }]}
              numberOfLines={1}
            >
              {entry.user.firstName}
            </Text>
            <Text style={styles.pts}>{entry.totalPoints.toLocaleString()}</Text>
            <View
              style={[
                styles.column,
                {
                  height: heights[i],
                  backgroundColor: rs.color + "18",
                  borderColor: rs.color + "35",
                },
              ]}
            >
              <Text style={[styles.rankLabel, { color: rs.color }]}>
                {rs.label}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
