import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/theme/useTheme";
import { NetworkErrorScreen } from "@/components/ui/NetworkErrorScreen";
import { BadgesSkeleton } from "@/components/jambaar/BadgesSkeleton";
import { BadgeCard } from "@/components/jambaar/BadgeCard";
import { SectionHeader } from "@/components/jambaar/SectionHeader";
import { useBadgesScreen } from "@/hooks/useBadgesScreen";
import { useBadgesStyles } from "@/styles/useBadgesStyles";

export default function BadgesScreen() {
  const colors = useColors();
  const { styles } = useBadgesStyles();
  const {
    data,
    isLoading,
    hasNetworkError,
    refetch,
    goBack,
    fadeAnim,
    progressAnim,
    unlockedBadges,
    lockedBadges,
    hasNewBadges,
    progressPct,
    isComplete,
  } = useBadgesScreen();

  const renderHeader = () => (
    <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
      <TouchableOpacity
        onPress={goBack}
        style={styles.backBtn}
        activeOpacity={0.75}
      >
        <Ionicons name="arrow-back" size={19} color={colors.white} />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>
          Mes <Text style={{ color: colors.amber }}>Badges</Text>
        </Text>
      </View>
      {data ? (
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>
            {data.earned}/{data.total}
          </Text>
        </View>
      ) : (
        <View style={{ width: 40 }} />
      )}
    </Animated.View>
  );

  if (isLoading && !data) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.topHalo} />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {renderHeader()}
          <BadgesSkeleton />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (hasNetworkError && !data) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.topHalo} />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {renderHeader()}
        </ScrollView>
        <NetworkErrorScreen onRetry={refetch} />
      </SafeAreaView>
    );
  }

  if (!data) return null;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.topHalo} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderHeader()}

        {/* ── Carte progression ── */}
        <Animated.View style={[styles.progressCard, { opacity: fadeAnim }]}>
          <View style={styles.progressTop}>
            <View style={styles.progressLeft}>
              <Ionicons name="trophy" size={16} color={colors.amber} />
              <Text style={styles.progressLabel}>Collection complète</Text>
            </View>
            <Text style={styles.progressPercent}>
              {Math.round(progressPct)}%
            </Text>
          </View>
          <View style={styles.progressBarBg}>
            <Animated.View
              style={[
                styles.progressBarFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                  backgroundColor: isComplete ? colors.success : colors.amber,
                },
              ]}
            />
          </View>
          <Text style={styles.progressHint}>
            {isComplete
              ? "🏆 Tous les badges débloqués !"
              : `${data.total - data.earned} badge${data.total - data.earned > 1 ? "s" : ""} encore à obtenir`}
          </Text>
        </Animated.View>

        {/* ── Badges débloqués ── */}
        {unlockedBadges.length > 0 && (
          <View style={styles.section}>
            <SectionHeader
              title="Débloqués"
              count={unlockedBadges.length}
              color={colors.amber}
              hasNew={hasNewBadges}
            />
            {/* ← Plus de props colors/styles */}
            <View style={styles.grid}>
              {unlockedBadges.map((badge, i) => (
                <BadgeCard key={badge.id} badge={badge} index={i} />
              ))}
            </View>
          </View>
        )}

        {/* ── Badges verrouillés ── */}
        {lockedBadges.length > 0 && (
          <View style={styles.section}>
            <SectionHeader
              title="À débloquer"
              count={lockedBadges.length}
              color={colors.textMuted}
            />
            <View style={styles.grid}>
              {lockedBadges.map((badge, i) => (
                <BadgeCard
                  key={badge.id}
                  badge={badge}
                  index={unlockedBadges.length + i}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
