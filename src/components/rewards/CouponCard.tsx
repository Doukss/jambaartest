import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useColors, useThemedStyles } from "@/theme/useTheme";
import { Coupon } from "@/types/domain.types";

interface CouponCardProps {
  coupon: Coupon;
}

export function CouponCard({ coupon }: CouponCardProps) {
  const colors = useColors(); // ← Autonome
  const isActive = coupon.status === "ACTIVE";
  const isUsed = coupon.status === "USED";
  const isExpired = coupon.status === "EXPIRED";
  const statusColor = isActive
    ? colors.success
    : isUsed
      ? colors.textSubtle
      : colors.amber;
  const statusLabel = isActive ? "Actif" : isUsed ? "Utilisé" : "Expiré";
  const statusEmoji = isActive ? "🎫" : isUsed ? "✅" : "⏳";

  const styles = useThemedStyles((c) => ({
    card: {
      flexDirection: "row",
      alignItems: "stretch",
      backgroundColor: c.cardBg,
      borderRadius: 16,
      borderWidth: isActive ? 1.5 : 1,
      borderColor: isActive ? c.success + "38" : c.cardBorder,
      overflow: "hidden",
      marginBottom: 10,
    },
    stripe: {
      width: 54,
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      backgroundColor: isActive
        ? c.success + "12"
        : isUsed
          ? c.cardBorder + "20"
          : c.amber + "10",
      opacity: isUsed ? 0.55 : 1,
    },
    stripeDivider: {
      position: "absolute",
      right: 0,
      top: "15%",
      bottom: "15%",
      width: 1,
      backgroundColor: c.cardBorder,
    },
    stripeEmoji: { fontSize: 20 },
    body: {
      flex: 1,
      paddingVertical: 13,
      paddingLeft: 14,
      paddingRight: 12,
      opacity: isUsed || isExpired ? 0.55 : 1,
      gap: 0,
    },
    title: { color: c.white, fontSize: 14, fontWeight: "700", marginBottom: 3 },
    partner: { color: c.textSubtle, fontSize: 11, marginBottom: 9 },
    metaRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    pill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingVertical: 3,
      paddingHorizontal: 9,
      borderRadius: 20,
    },
    pillDot: { width: 5, height: 5, borderRadius: 3 },
    pillText: { fontSize: 10, fontWeight: "700", letterSpacing: 0.3 },
    expiry: { color: c.textSubtle, fontSize: 10 },
    codeBlock: {
      paddingVertical: 12,
      paddingHorizontal: 14,
      alignItems: "flex-end",
      justifyContent: "center",
      flexShrink: 0,
    },
    codeLabel: {
      fontSize: 9,
      fontWeight: "700",
      letterSpacing: 1.2,
      color: c.textSubtle,
      textTransform: "uppercase",
      marginBottom: 4,
    },
    codeValue: {
      fontSize: 12,
      fontWeight: "800",
      color: c.amber,
      fontVariant: ["tabular-nums"],
      backgroundColor: c.amber + "12",
      paddingVertical: 4,
      paddingHorizontal: 9,
      borderRadius: 7,
      borderWidth: 1,
      borderColor: c.amber + "25",
      overflow: "hidden",
    },
  }));

  return (
    <View style={styles.card}>
      <View style={styles.stripe}>
        <Text style={styles.stripeEmoji}>{statusEmoji}</Text>
        <View style={styles.stripeDivider} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {coupon.reward.title}
        </Text>
        <Text style={styles.partner}>{coupon.reward.partner.name}</Text>
        <View style={styles.metaRow}>
          <View style={[styles.pill, { backgroundColor: statusColor + "15" }]}>
            <View style={[styles.pillDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.pillText, { color: statusColor }]}>
              {statusLabel}
            </Text>
          </View>
          {isActive && coupon.expiresAt && (
            <Text style={styles.expiry}>
              Expire {dayjs(coupon.expiresAt).format("DD MMM")}
            </Text>
          )}
        </View>
      </View>
      {isActive && (
        <View style={styles.codeBlock}>
          <Text style={styles.codeLabel}>Code</Text>
          <Text style={styles.codeValue}>{coupon.code}</Text>
        </View>
      )}
    </View>
  );
}
