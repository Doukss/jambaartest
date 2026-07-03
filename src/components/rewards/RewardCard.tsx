import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors, useThemedStyles } from "@/theme/useTheme";
import { Reward } from "@/types/domain.types";

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onRedeem: (id: string) => void;
  isRedeeming: boolean;
}

export function RewardCard({
  reward,
  userPoints,
  onRedeem,
  isRedeeming,
}: RewardCardProps) {
  const colors = useColors(); // ← Autonome
  const canAfford = userPoints >= reward.pointsCost;
  const pointsNeeded = reward.pointsCost - userPoints;
  const progressPct = Math.min((userPoints / reward.pointsCost) * 100, 100);
  const accentColor = canAfford ? colors.success : colors.amber;

  const styles = useThemedStyles((c) => ({
    card: {
      backgroundColor: c.cardBg,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.cardBorder,
      overflow: "hidden",
      marginBottom: 12,
    },
    accentBar: { height: 3, width: "100%" },
    body: { padding: 16, paddingBottom: 14, gap: 0 },
    partnerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 11,
    },
    partnerChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingVertical: 4,
      paddingLeft: 5,
      paddingRight: 8,
      borderRadius: 8,
      backgroundColor: c.cardBorder + "30",
      borderWidth: 1,
      borderColor: c.cardBorder,
    },
    partnerIconBox: {
      width: 18,
      height: 18,
      borderRadius: 5,
      backgroundColor: c.cardBorder + "50",
      alignItems: "center",
      justifyContent: "center",
    },
    partnerName: { color: c.textMuted, fontSize: 11, fontWeight: "600" },
    title: {
      color: c.white,
      fontSize: 16,
      fontWeight: "800",
      letterSpacing: -0.3,
      lineHeight: 21,
      marginBottom: 5,
    },
    desc: {
      color: c.textSubtle,
      fontSize: 12,
      lineHeight: 19,
      marginBottom: 14,
    },
    costTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 7,
    },
    costPts: { fontSize: 19, fontWeight: "800", letterSpacing: -0.5 },
    costRight: { fontSize: 11, fontWeight: "600" },
    progressTrack: {
      height: 5,
      borderRadius: 3,
      backgroundColor: c.cardBorder,
      overflow: "hidden",
    },
    progressFill: { height: "100%", borderRadius: 3 },
    redeemZone: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingVertical: 13,
    },
    redeemActive: {
      backgroundColor: c.success + "18",
      borderTopWidth: 1,
      borderTopColor: c.success + "22",
    },
    redeemLocked: {
      backgroundColor: c.cardBg,
      borderTopWidth: 1,
      borderTopColor: c.cardBorder,
    },
    redeemText: { fontSize: 13, fontWeight: "700" },
  }));

  return (
    <View style={styles.card}>
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />
      <View style={styles.body}>
        <View style={styles.partnerRow}>
          <View style={styles.partnerChip}>
            <View style={styles.partnerIconBox}>
              <Ionicons
                name="business-outline"
                size={11}
                color={colors.textMuted}
              />
            </View>
            <Text style={styles.partnerName} numberOfLines={1}>
              {reward.partner.name}
            </Text>
          </View>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {reward.title}
        </Text>
        <Text style={styles.desc} numberOfLines={2}>
          {reward.description}
        </Text>

        <View style={styles.costTop}>
          <Text style={[styles.costPts, { color: accentColor }]}>
            {reward.pointsCost.toLocaleString()} pts
          </Text>
          {canAfford ? (
            <Text style={[styles.costRight, { color: colors.success }]}>
              ✓ Solde suffisant
            </Text>
          ) : (
            <Text style={[styles.costRight, { color: colors.textSubtle }]}>
              − {pointsNeeded.toLocaleString()} pts manquants
            </Text>
          )}
        </View>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${progressPct}%`, backgroundColor: accentColor },
            ]}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.redeemZone,
          canAfford ? styles.redeemActive : styles.redeemLocked,
        ]}
        onPress={() => canAfford && onRedeem(reward.id)}
        activeOpacity={canAfford ? 0.75 : 1}
        disabled={!canAfford || isRedeeming}
      >
        {isRedeeming ? (
          <ActivityIndicator color={colors.success} size="small" />
        ) : canAfford ? (
          <>
            <Ionicons name="gift-outline" size={16} color={colors.success} />
            <Text style={[styles.redeemText, { color: colors.success }]}>
              Échanger maintenant
            </Text>
          </>
        ) : (
          <>
            <Ionicons
              name="lock-closed-outline"
              size={14}
              color={colors.textSubtle}
            />
            <Text
              style={[
                styles.redeemText,
                { color: colors.textSubtle, fontWeight: "600", fontSize: 12 },
              ]}
            >
              Points insuffisants
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}
