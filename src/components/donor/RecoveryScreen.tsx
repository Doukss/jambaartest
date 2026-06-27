import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemedStyles, useColors } from "@/src/theme/useTheme";
import { HealthTipCard } from "@/src/components/donor/HealthTipCard";
import {
  getShuffledTips,
  CATEGORY_META,
  TipCategory,
} from "@/src/constants/healthTips";

// ─── Types ────────────────────────────────────────────────────
interface RecoveryScreenProps {
  daysLeft: number;
  firstName?: string;
  onGoToEligibility?: () => void;
}

// ─── Constantes ───────────────────────────────────────────────
const TOTAL_REST_DAYS = 56;

const PURPLE = {
  accent: "#7F77DD",
  accentLight: "#AFA9EC",
  dark: "#3C3489",
  bg: "rgba(127,119,221,0.10)",
  bgDark: "rgba(127,119,221,0.06)",
  border: "rgba(127,119,221,0.18)",
  borderStrong: "rgba(83,74,183,0.30)",
};

const CATEGORY_FILTERS: Array<{ key: TipCategory | "ALL"; label: string }> = [
  { key: "ALL", label: "Tous" },
  { key: "HYDRATION", label: "Hydratation" },
  { key: "NUTRITION", label: "Alimentation" },
  { key: "SLEEP", label: "Sommeil" },
  { key: "ACTIVITY", label: "Activité" },
  { key: "WELLBEING", label: "Bien-être" },
];

// ─── HeroCard ─────────────────────────────────────────────────
function HeroCard({ daysLeft, firstName, onGoToEligibility }: RecoveryScreenProps) {
  const elapsed = Math.max(0, TOTAL_REST_DAYS - daysLeft);
  const progressPct = Math.min(Math.round((elapsed / TOTAL_REST_DAYS) * 100), 100);

  const styles = useThemedStyles((c) => ({
    card: {
      backgroundColor: PURPLE.bgDark,
      borderWidth: 1.5,
      borderColor: PURPLE.borderStrong,
      borderRadius: 20,
      marginBottom: 16,
      overflow: "hidden" as const,
    },
    top: {
      flexDirection: "row" as const,
      alignItems: "flex-start" as const,
      justifyContent: "space-between" as const,
      padding: 16,
      paddingBottom: 0,
      gap: 12,
    },
    left: { flex: 1 },
    eyebrow: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: 5,
      marginBottom: 6,
    },
    eyebrowText: {
      color: PURPLE.accent,
      fontSize: 10,
      fontWeight: "700" as const,
      letterSpacing: 1,
    },
    title: {
      color: c.white,
      fontSize: 17,
      fontWeight: "800" as const,
      letterSpacing: -0.3,
      lineHeight: 22,
      marginBottom: 4,
    },
    sub: {
      color: c.textMuted,
      fontSize: 11,
      lineHeight: 16,
    },
    // Countdown
    countdown: {
      backgroundColor: PURPLE.bg,
      borderWidth: 1.5,
      borderColor: PURPLE.border,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 10,
      alignItems: "center" as const,
      flexShrink: 0,
      minWidth: 60,
    },
    countdownNumber: {
      color: PURPLE.accentLight,
      fontSize: 30,
      fontWeight: "900" as const,
      letterSpacing: -1,
      lineHeight: 32,
    },
    countdownUnit: {
      color: PURPLE.accent,
      fontSize: 9,
      fontWeight: "700" as const,
      letterSpacing: 1,
      marginTop: 1,
    },
    // Progress
    progressWrap: {
      paddingHorizontal: 16,
      paddingTop: 14,
    },
    progressLabels: {
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      marginBottom: 6,
    },
    progressLabelLeft: { color: c.textMuted, fontSize: 10 },
    progressLabelRight: { color: PURPLE.accent, fontSize: 10, fontWeight: "600" as const },
    progressTrack: {
      height: 3,
      backgroundColor: PURPLE.bg,
      borderRadius: 2,
      overflow: "hidden" as const,
    },
    progressFill: {
      height: "100%" as any,
      borderRadius: 2,
      backgroundColor: "#534AB7",
    },
    // CTA
    cta: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "space-between" as const,
      margin: 12,
      marginTop: 12,
      backgroundColor: PURPLE.bg,
      borderWidth: 1,
      borderColor: PURPLE.border,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 9,
    },
    ctaText: {
      color: PURPLE.accentLight,
      fontSize: 11,
      fontWeight: "600" as const,
    },
  }));

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.left}>
          <View style={styles.eyebrow}>
            <Ionicons name="pulse-outline" size={13} color={PURPLE.accent} />
            <Text style={styles.eyebrowText}>PÉRIODE DE REPOS</Text>
          </View>
          <Text style={styles.title}>
            Bien récupérer,{"\n"}c'est mieux donner
          </Text>
          <Text style={styles.sub}>
            Votre prochain don sera encore{"\n"}plus précieux.
          </Text>
        </View>

        <View style={styles.countdown}>
          <Text style={styles.countdownNumber}>{daysLeft}</Text>
          <Text style={styles.countdownUnit}>
            {daysLeft > 1 ? "JOURS" : "JOUR"}
          </Text>
        </View>
      </View>

      {/* Barre de progression */}
      <View style={styles.progressWrap}>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabelLeft}>
            Jour {elapsed} / {TOTAL_REST_DAYS}
          </Text>
          <Text style={styles.progressLabelRight}>{progressPct}% accompli</Text>
        </View>
        <View style={styles.progressTrack}>
          <View
            style={[styles.progressFill, { width: `${progressPct}%` as any }]}
          />
        </View>
      </View>

      {/* Lien éligibilité */}
      {onGoToEligibility && (
        <TouchableOpacity
          style={styles.cta}
          onPress={onGoToEligibility}
          activeOpacity={0.75}
        >
          <Text style={styles.ctaText}>Voir mes critères d'éligibilité</Text>
          <Ionicons name="chevron-forward" size={13} color={PURPLE.accent} />
        </TouchableOpacity>
      )}
    </View>
  );
}

// ─── RecoveryScreen ───────────────────────────────────────────
export function RecoveryScreen({
  daysLeft,
  firstName,
  onGoToEligibility,
}: RecoveryScreenProps) {
  const colors = useColors();
  const [activeCategory, setActiveCategory] = React.useState<TipCategory | "ALL">("ALL");

  const styles = useThemedStyles((c) => ({
    sectionRow: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: 7,
      marginBottom: 12,
    },
    sectionTitle: {
      color: c.white,
      fontSize: 14,
      fontWeight: "700" as const,
      flex: 1,
    },
    sectionCount: {
      color: c.textSubtle,
      fontSize: 11,
      backgroundColor: c.cardBg,
      borderWidth: 1,
      borderColor: c.cardBorder,
      borderRadius: 20,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    // Filtres horizontaux scrollables
    filtersWrap: {
      marginBottom: 14,
    },
    filtersRow: {
      flexDirection: "row" as const,
      gap: 6,
      flexWrap: "wrap" as const,
    },
    chip: {
      paddingVertical: 5,
      paddingHorizontal: 11,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.cardBorder,
      backgroundColor: c.cardBg,
    },
    chipActive: {
      backgroundColor: PURPLE.bg,
      borderColor: PURPLE.borderStrong,
    },
    chipText: { color: c.textMuted, fontSize: 11, fontWeight: "600" as const },
    chipTextActive: { color: PURPLE.accentLight },
  }));

  const allTips = useMemo(() => getShuffledTips(daysLeft), [daysLeft]);
  const displayedTips = useMemo(
    () =>
      activeCategory === "ALL"
        ? allTips
        : allTips.filter((t) => t.category === activeCategory),
    [allTips, activeCategory],
  );

  return (
    <>
      {/* ── Hero ── */}
      <HeroCard
        daysLeft={daysLeft}
        firstName={firstName}
        onGoToEligibility={onGoToEligibility}
      />

      {/* ── En-tête section ── */}
      <View style={styles.sectionRow}>
        <Ionicons name="sparkles-outline" size={15} color={colors.amber} />
        <Text style={styles.sectionTitle}>Conseils de récupération</Text>
        <Text style={styles.sectionCount}>{displayedTips.length}</Text>
      </View>

      {/* ── Filtres ── */}
      <View style={styles.filtersWrap}>
        <View style={styles.filtersRow}>
          {CATEGORY_FILTERS.map((f) => {
            const isActive = activeCategory === f.key;
            return (
              <TouchableOpacity
                key={f.key}
                onPress={() => setActiveCategory(f.key)}
                activeOpacity={0.75}
                style={[styles.chip, isActive && styles.chipActive]}
              >
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ── Liste des tips ── */}
      {displayedTips.map((tip) => (
        <HealthTipCard key={tip.id} tip={tip} />
      ))}
    </>
  );
}