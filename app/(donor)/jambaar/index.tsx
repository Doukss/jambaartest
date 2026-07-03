import { View, Text, ScrollView, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useColors } from "@/theme/useTheme";
import { NetworkErrorScreen } from "@/components/ui/NetworkErrorScreen";
import { JambaarSkeleton } from "@/components/jambaar/JambaarSkeleton";
import { StatCard } from "@/components/jambaar/StatCard";
import { ActionBtn } from "@/components/jambaar/ActionBtn";
import { useJambaarProfileScreen } from "@/hooks/useJambaarProfileScreen";
import { useJambaarStyles } from "@/styles/useJambaarStyles";

export default function JambaarProfileScreen() {
  const colors = useColors();
  const { styles } = useJambaarStyles();
  const {
    data,
    isLoading,
    hasNetworkError,
    refetch,
    profile,
    progression,
    ranks,
    gradeConfig,
    nextGradeConfig,
    isEligible,
    daysUntilEligible,
    fadeAnim,
    progressWidth,
    goToBadges,
    goToLeaderboard,
    goToRewards,
  } = useJambaarProfileScreen();

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={{ gap: 2 }}>
        <Text style={styles.eyebrow}>PROGRAMME</Text>
        <Text style={styles.headerTitle}>
          Jambaar <Text style={{ color: colors.red }}>Life</Text>
        </Text>
      </View>
      {gradeConfig && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            borderWidth: 1,
            backgroundColor:
              colors[gradeConfig.colorKey] + gradeConfig.glowAlpha,
            borderColor: colors[gradeConfig.colorKey] + "40",
          }}
        >
          <Text style={{ fontSize: 14 }}>{gradeConfig.icon}</Text>
          <Text
            style={{
              color: colors[gradeConfig.colorKey],
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            {gradeConfig.label}
          </Text>
        </View>
      )}
    </View>
  );

  // ── 1. Chargement initial (Skeleton) ───────────────────────
  if (isLoading && !data) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        {renderHeader()}
        <JambaarSkeleton />
      </SafeAreaView>
    );
  }

  // ── 2. Erreur réseau sans cache ────────────────────────────
  if (hasNetworkError && !data) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        {renderHeader()}
        <NetworkErrorScreen onRetry={refetch} />
      </SafeAreaView>
    );
  }

  if (!data || !profile || !gradeConfig) return null;

  const gradeColor = colors[gradeConfig.colorKey] as string;
  const nextGradeColor = nextGradeConfig
    ? (colors[nextGradeConfig.colorKey] as string)
    : null;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Header ── */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <View style={{ gap: 2 }}>
            <Text style={styles.eyebrow}>PROGRAMME</Text>
            <Text style={styles.headerTitle}>
              Jambaar <Text style={{ color: colors.red }}>Life</Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              borderWidth: 1,
              backgroundColor: gradeColor + gradeConfig.glowAlpha,
              borderColor: gradeColor + "40",
            }}
          >
            <Text style={{ fontSize: 14 }}>{gradeConfig.icon}</Text>
            <Text
              style={{ color: gradeColor, fontSize: 12, fontWeight: "700" }}
            >
              {gradeConfig.label}
            </Text>
          </View>
        </Animated.View>

        {/* ── Carte grade ── */}
        <Animated.View style={[styles.gradeCard, { opacity: fadeAnim }]}>
          <View
            style={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 180,
              height: 180,
              borderRadius: 90,
              backgroundColor: gradeColor + gradeConfig.glowAlpha,
            }}
          />
          <View style={styles.gradeTop}>
            <View style={{ gap: 2 }}>
              <Text style={styles.eyebrowSmall}>TOTAL POINTS</Text>
              <Text style={styles.pointsValue}>
                {profile.totalPoints.toLocaleString()}
              </Text>
              <Text style={styles.pointsUnit}>points Jambaar</Text>
            </View>
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 22,
                borderWidth: 1.5,
                alignItems: "center",
                justifyContent: "center",
                borderColor: gradeColor + "40",
                backgroundColor: gradeColor + gradeConfig.glowAlpha,
              }}
            >
              <Text style={{ fontSize: 38 }}>{gradeConfig.icon}</Text>
            </View>
          </View>

          {progression?.nextGrade && nextGradeConfig && nextGradeColor ? (
            <View style={{ gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: gradeColor, fontSize: 11, fontWeight: "700" }}
                >
                  {gradeConfig.label}
                </Text>
                <Text
                  style={{
                    color: colors.textSubtle,
                    fontSize: 11,
                    fontWeight: "700",
                  }}
                >
                  {nextGradeConfig.label}
                </Text>
              </View>
              <View style={styles.progressBarBg}>
                <Animated.View
                  style={[
                    styles.progressBarFill,
                    {
                      backgroundColor: gradeColor,
                      width: progressWidth.interpolate({
                        inputRange: [0, 100],
                        outputRange: ["0%", "100%"],
                      }),
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressHint}>
                <Text style={{ color: gradeColor, fontWeight: "700" }}>
                  {progression.pointsToNext} pts
                </Text>{" "}
                pour devenir {nextGradeConfig.icon} {nextGradeConfig.label}
              </Text>
            </View>
          ) : (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Ionicons name="trophy" size={16} color={colors.amber} />
              <Text style={styles.maxGradeText}>Grade maximal atteint !</Text>
            </View>
          )}
        </Animated.View>

        {/* ── Stats ── */}
        <View style={styles.row}>
          <StatCard
            label="DONS EFFECTUÉS"
            value={profile.donationCount}
            sub="Total"
            subColor={colors.textSubtle}
          />
          {/* ← Plus de props colors */}
          <StatCard
            label="VIES SAUVÉES"
            value={`~${profile.livesSavedEstimate}`}
            sub="Estimées"
            subColor={colors.success}
          />
        </View>
        
        <View style={styles.row}>
          <StatCard
            label="RANG GLOBAL"
            value={ranks?.global ? `#${ranks.global}` : "—"}
            isRank
            sub="Classement mondial"
            subColor={colors.textSubtle}
          />
          <StatCard
            label={`RANG ${profile.city?.toUpperCase() ?? "LOCAL"}`}
            value={ranks?.city ? `#${ranks.city}` : "—"}
            isRank
            sub={profile.city ?? "Configurez votre ville"}
            subColor={colors.textSubtle}
          />
        </View>

        {/* ── Éligibilité ── */}
        <View
          style={[
            styles.eligibilityCard,
            isEligible ? styles.eligibleCard : styles.notEligibleCard,
          ]}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              flexShrink: 0,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isEligible
                ? colors.success + "26"
                : colors.amber + "26",
            }}
          >
            <Ionicons
              name={isEligible ? "checkmark-circle" : "time-outline"}
              size={22}
              color={isEligible ? colors.success : colors.amber}
            />
          </View>
          <View style={{ flex: 1, gap: 3 }}>
            <Text
              style={[
                styles.eligibilityTitle,
                { color: isEligible ? colors.success : colors.amber },
              ]}
            >
              {isEligible
                ? "Vous pouvez donner !"
                : `Éligible dans ${daysUntilEligible} jour${daysUntilEligible > 1 ? "s" : ""}`}
            </Text>
            <Text style={styles.eligibilitySub}>
              {isEligible
                ? "Votre prochain don est disponible maintenant"
                : `Période de repos — prochain don le ${dayjs(profile.nextEligibilityAt).format("DD MMM YYYY")}`}
            </Text>
            {isEligible && (
              <Text
                style={{
                  color: colors.textSubtle,
                  fontSize: 10,
                  marginTop: 2,
                  fontStyle: "italic",
                }}
              >
                ⚠️ Rappel : Seul le CNTS peut scanner votre QR Code pour valider
                le don.
              </Text>
            )}
          </View>
        </View>

        {/* ── Actions ── */}
        <Text style={styles.sectionTitle}>EXPLORER</Text>
        <View style={styles.actionsBlock}>
          <ActionBtn
            icon="ribbon-outline"
            label="Mes Badges"
            color={colors.amber}
            onPress={goToBadges}
          />
          {/* ← Plus de props colors */}
          <View style={styles.actionSeparator} />
          <ActionBtn
            icon="podium-outline"
            label="Classement"
            color={colors.success}
            onPress={goToLeaderboard}
          />
          <View style={styles.actionSeparator} />
          <ActionBtn
            icon="gift-outline"
            label="Récompenses"
            color={colors.red}
            onPress={goToRewards}
          />
        </View>

        <Text style={styles.slogan}>
          Le lien qui sauve, l&apos;honneur qui engage.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
