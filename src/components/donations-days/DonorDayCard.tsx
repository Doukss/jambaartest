import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { useColors, useThemedStyles } from "@/src/theme/useTheme";
import { DonationDay } from "@/src/types/donation-day.types";

dayjs.locale("fr");

interface DonorDayCardProps {
  item: DonationDay;
  onPress: () => void;
}

export function DonorDayCard({ item, onPress }: DonorDayCardProps) {
  const colors = useColors();

  const registrationsCount = item._count?.registrations ?? 0;

  const remainingSpots = item.remainingSpots ?? 0;
  const isFull = remainingSpots === 0;

  const pct =
    item.targetDonors > 0
      ? Math.min((registrationsCount / item.targetDonors) * 100, 100)
      : 0;

  const styles = useThemedStyles((c) => ({
    card: {
      backgroundColor: c.cardBg,
      borderRadius: 20,
      borderWidth: 0.5,
      borderColor: c.cardBorder,
      marginBottom: 14,
      overflow: "hidden",
    },
    cover: {
      height: 130,
      backgroundColor: c.cardBorder + "30",
      alignItems: "center",
      justifyContent: "center",
    },
    coverImage: { width: "100%", height: "100%" },
    coverTop: {
      position: "absolute",
      top: 10,
      left: 12,
      right: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    dateBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: c.bg,
      borderWidth: 0.5,
      borderColor: c.cardBorder,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    dateDay: {
      color: c.white,
      fontSize: 18,
      fontWeight: "500",
      lineHeight: 22,
    },
    dateSep: { width: 0.5, height: 16, backgroundColor: c.cardBorder },
    dateMonth: {
      color: c.textMuted,
      fontSize: 11,
      fontWeight: "500",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
      borderWidth: 0.5,
    },
    statusOpen: { backgroundColor: c.red + "18", borderColor: c.red + "40" },
    statusFull: {
      backgroundColor: c.success + "18",
      borderColor: c.success + "40",
    },
    statusText: { fontSize: 11, fontWeight: "500" },
    statusTextOpen: { color: c.red },
    statusTextFull: { color: c.success },
    body: { padding: 16, gap: 10 },
    structure: {
      color: c.textMuted,
      fontSize: 11,
      fontWeight: "500",
      textTransform: "uppercase",
      letterSpacing: 0.8,
    },
    title: { color: c.white, fontSize: 16, fontWeight: "500", lineHeight: 22 },
    divider: { height: 0.5, backgroundColor: c.cardBorder },
    metaRow: { gap: 6 },
    metaItem: { flexDirection: "row", alignItems: "center", gap: 8 },
    metaText: { color: c.textMuted, fontSize: 13, flex: 1 },
    bloodRow: { flexDirection: "row", gap: 5, flexWrap: "wrap" },
    pill: {
      paddingHorizontal: 9,
      paddingVertical: 3,
      borderRadius: 99,
      backgroundColor: c.red + "15",
      borderWidth: 0.5,
      borderColor: c.red + "40",
    },
    pillText: { color: c.red, fontSize: 11, fontWeight: "500" },
    pillAll: {
      paddingHorizontal: 9,
      paddingVertical: 3,
      borderRadius: 99,
      backgroundColor: c.cardBorder + "20",
      borderWidth: 0.5,
      borderColor: c.cardBorder,
    },
    pillAllText: { color: c.textMuted, fontSize: 11, fontWeight: "500" },
    progressSection: { gap: 6 },
    progressLabelRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    progressLabel: { color: c.textMuted, fontSize: 12 },
    progressValue: { color: c.white, fontSize: 12, fontWeight: "500" },
    progressSub: { color: c.textMuted, fontWeight: "400" },
    progressTrack: {
      height: 3,
      borderRadius: 99,
      backgroundColor: c.cardBorder,
      overflow: "hidden",
    },
    cta: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: 10,
      borderRadius: 10,
      borderWidth: 0.5,
    },
    ctaOpen: { backgroundColor: c.red + "15", borderColor: c.red + "40" },
    ctaFull: {
      backgroundColor: c.cardBorder + "20",
      borderColor: c.cardBorder,
    },
    ctaText: { fontSize: 13, fontWeight: "500" },
    ctaTextOpen: { color: c.red },
    ctaTextFull: { color: c.textMuted },
  }));

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.cover}>
        {item.photoUrl ? (
          <Image
            source={{ uri: item.photoUrl }}
            style={styles.coverImage}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <Ionicons
            name="calendar-outline"
            size={42}
            color={colors.cardBorder}
          />
        )}
        <View style={styles.coverTop}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateDay}>
              {dayjs(item.scheduledDate).format("DD")}
            </Text>
            <View style={styles.dateSep} />
            <Text style={styles.dateMonth}>
              {dayjs(item.scheduledDate).format("MMM")}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              isFull ? styles.statusFull : styles.statusOpen,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                isFull ? styles.statusTextFull : styles.statusTextOpen,
              ]}
            >
              {isFull ? "Complet" : `${remainingSpots} places`}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        {item.healthStructure?.name ? (
          <Text style={styles.structure}>{item.healthStructure.name}</Text>
        ) : null}
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.divider} />
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={15} color={colors.textMuted} />
            <Text style={styles.metaText}>
              {item.startTime} – {item.endTime}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons
              name="location-outline"
              size={15}
              color={colors.textMuted}
            />
            <Text style={styles.metaText} numberOfLines={1}>
              {item.address}
            </Text>
          </View>
        </View>
        <View style={styles.bloodRow}>
          {item.bloodTypesNeeded.length === 0 ? (
            <View style={styles.pillAll}>
              <Text style={styles.pillAllText}>Tous les groupes</Text>
            </View>
          ) : (
            item.bloodTypesNeeded.map((bt) => (
              <View key={bt} style={styles.pill}>
                <Text style={styles.pillText}>
                  {bt.replace("_POS", "+").replace("_NEG", "−")}
                </Text>
              </View>
            ))
          )}
        </View>
        <View style={styles.progressSection}>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressLabel}>Inscrits</Text>
            <Text style={styles.progressValue}>
              {registrationsCount}
              <Text style={styles.progressSub}> / {item.targetDonors}</Text>
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={{
                height: "100%",
                width: `${pct}%`,
                borderRadius: 99,
                backgroundColor: isFull ? colors.success : colors.red,
              }}
            />
          </View>
        </View>
        <View style={[styles.cta, isFull ? styles.ctaFull : styles.ctaOpen]}>
          <Text
            style={[
              styles.ctaText,
              isFull ? styles.ctaTextFull : styles.ctaTextOpen,
            ]}
          >
            {isFull ? "Liste d'attente" : "Voir les détails"}
          </Text>
          <Ionicons
            name={isFull ? "time-outline" : "arrow-forward"}
            size={14}
            color={isFull ? colors.textMuted : colors.red}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
