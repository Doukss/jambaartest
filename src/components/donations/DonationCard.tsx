import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import { useColors, useThemedStyles } from "@/src/theme/useTheme";
import { Donation } from "@/src/types/domain.types";
import { BLOOD_TYPE_LABELS } from "@/src/utils/format.utils";

dayjs.extend(relativeTime);
dayjs.locale("fr");

interface DonationCardProps {
  item: Donation;
}

export function DonationCard({ item }: DonationCardProps) {
  // ← Plus de props colors
  const colors = useColors(); // ← Autonome
  const alertData = item.alertResponse?.alert;

  const validationStructureName =
    item.healthStructure?.name ?? "Centre de collecte";
  const alertOriginName = alertData?.healthStructure.name;

  const bloodLabel = alertData?.bloodType
    ? (BLOOD_TYPE_LABELS[alertData.bloodType] ?? alertData.bloodType)
    : "?";
  const isVital = alertData?.urgencyLevel === "VITAL";
  const donatedDate = item.donatedAt
    ? dayjs(item.donatedAt).format("DD MMM YYYY")
    : "";
  const donatedTimeAgo = item.donatedAt ? dayjs(item.donatedAt).fromNow() : "";

  const styles = useThemedStyles((c) => ({
    card: {
      backgroundColor: c.cardBg,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: c.cardBorder,
      padding: 16,
      marginBottom: 12,
      gap: 12,
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    topRowLeft: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
    cntsIconWrap: {
      width: 26,
      height: 26,
      borderRadius: 8,
      backgroundColor: c.red + "1F",
      alignItems: "center",
      justifyContent: "center",
    },
    structureName: { color: c.white, fontSize: 14, fontWeight: "700", flex: 1 },
    dateText: { color: c.textMuted, fontSize: 12, fontWeight: "500" },
    middleRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    bloodBadge: {
      width: 42,
      height: 42,
      borderRadius: 12,
      backgroundColor: c.red + "1A",
      borderWidth: 1,
      borderColor: c.red + "40",
      alignItems: "center",
      justifyContent: "center",
    },
    bloodText: { color: c.red, fontSize: 16, fontWeight: "900" },
    pointsWrapper: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      flex: 1,
    },
    pointsIconWrap: {
      width: 28,
      height: 28,
      borderRadius: 8,
      backgroundColor: c.amber + "20",
      alignItems: "center",
      justifyContent: "center",
    },
    pointsValue: { color: c.amber, fontSize: 16, fontWeight: "800" },
    pointsLabel: { color: c.textMuted, fontSize: 11 },
    vitalBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: c.red + "26",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    vitalText: {
      color: c.white,
      fontSize: 9,
      fontWeight: "800",
      letterSpacing: 0.5,
    },
    bottomRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: -4,
    },
    alertOriginText: { color: c.textSubtle, fontSize: 11, flex: 1 },
    alertTimeText: { color: c.textSubtle, fontSize: 11 },
  }));

  return (
    <View style={styles.card}>
      {/* Top Row : Lieu de validation (CNTS) */}
      <View style={styles.topRow}>
        <View style={styles.topRowLeft}>
          <View style={styles.cntsIconWrap}>
            <Ionicons name="water-outline" size={14} color={colors.red} />
          </View>
          <Text style={styles.structureName} numberOfLines={1}>
            {validationStructureName}
          </Text>
        </View>
        <Text style={styles.dateText}>{donatedDate}</Text>
      </View>

      {/* Middle Row : Groupe sanguin + Points */}
      <View style={styles.middleRow}>
        <View style={styles.bloodBadge}>
          <Text style={styles.bloodText}>{bloodLabel}</Text>
        </View>
        <View style={styles.pointsWrapper}>
          <View style={styles.pointsIconWrap}>
            <Ionicons name="star" size={14} color={colors.amber} />
          </View>
          <View>
            <Text style={styles.pointsValue}>+{item.pointsAwarded}</Text>
            <Text style={styles.pointsLabel}>points Jambaar</Text>
          </View>
        </View>
        {isVital && (
          <View style={styles.vitalBadge}>
            <Ionicons name="flash" size={10} color={colors.white} />
            <Text style={styles.vitalText}>VITAL</Text>
          </View>
        )}
      </View>

      {/* Bottom Row : Alerte d'origine */}
      {alertOriginName && (
        <View style={styles.bottomRow}>
          <Ionicons name="medkit-outline" size={12} color={colors.textSubtle} />
          <Text style={styles.alertOriginText} numberOfLines={1}>
            Alerte pour {alertOriginName}
          </Text>
          <Text style={styles.alertTimeText}>{donatedTimeAgo}</Text>
        </View>
      )}
    </View>
  );
}
