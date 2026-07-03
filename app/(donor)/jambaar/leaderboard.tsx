import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/theme/useTheme";
import { NetworkErrorScreen } from "@/components/ui/NetworkErrorScreen";
import { LeaderboardSkeleton } from "@/components/jambaar/LeaderboardSkeleton";
import { PodiumTop3 } from "@/components/jambaar/PodiumTop3";
import { LeaderboardRow } from "@/components/jambaar/LeaderboardRow";
import { useLeaderboardScreen } from "@/hooks/useLeaderboardScreen";
import { useLeaderboardStyles } from "@/styles/useLeaderboardStyles";
import { SCOPES } from "@/constants/jambaarConfig";

export default function LeaderboardScreen() {
  const colors = useColors();
  const { styles } = useLeaderboardStyles();
  const {
    user,
    scope,
    setScope,
    goBack,
    leaderboard,
    myRank,
    scopeLabel,
    data,
    isLoading,
    hasNetworkError,
    refetch,
    isFetchingNextPage,
    handleLoadMore,
  } = useLeaderboardScreen();

  const renderHeader = () => (
    <View>
      <View style={styles.navHeader}>
        <TouchableOpacity
          onPress={goBack}
          style={styles.backBtn}
          activeOpacity={0.75}
        >
          <Ionicons name="arrow-back" size={19} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.navCenter}>
          <Text style={styles.navEyebrow}>PROGRAMME JAMBAAR</Text>
          <Text style={styles.navTitle}>
            Classement <Text style={{ color: colors.amber }}>⚡</Text>
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {myRank && (
        <View style={styles.myRankCard}>
          <Ionicons name="podium" size={16} color={colors.amber} />
          <Text style={styles.myRankText}>
            Vous êtes{" "}
            <Text style={{ color: colors.red, fontWeight: "900" }}>
              #{myRank}
            </Text>{" "}
            — {scopeLabel}
          </Text>
        </View>
      )}

      <View style={styles.scopesRow}>
        {SCOPES.map((s) => {
          const isActive = scope === s.key;
          return (
            <TouchableOpacity
              key={s.key}
              onPress={() => setScope(s.key)}
              style={[styles.scopePill, isActive && styles.scopePillActive]}
              activeOpacity={0.75}
            >
              <Ionicons
                name={s.icon}
                size={13}
                color={isActive ? colors.white : colors.textMuted}
              />
              <Text
                style={[styles.scopeText, isActive && styles.scopeTextActive]}
              >
                {s.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {leaderboard.length >= 3 && (
        <PodiumTop3 entries={leaderboard} myId={user?.id} />
      )}

      {leaderboard.length > 3 && (
        <View style={styles.restLabel}>
          <View style={styles.restLine} />
          <Text style={styles.restText}>SUITE DU CLASSEMENT</Text>
          <View style={styles.restLine} />
        </View>
      )}
    </View>
  );

  const renderFooter = () =>
    isFetchingNextPage ? (
      <View style={styles.loadingMore}>
        <ActivityIndicator color={colors.amber} size="small" />
      </View>
    ) : null;

  // ── 1. Chargement initial ─────────────────────────────────────
  if (isLoading && !data) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.navHeader}>
          <TouchableOpacity
            onPress={goBack}
            style={styles.backBtn}
            activeOpacity={0.75}
          >
            <Ionicons name="arrow-back" size={19} color={colors.white} />
          </TouchableOpacity>
          <View style={styles.navCenter}>
            <Text style={styles.navEyebrow}>PROGRAMME JAMBAAR</Text>
            <Text style={styles.navTitle}>
              Classement <Text style={{ color: colors.amber }}>⚡</Text>
            </Text>
          </View>
          <View style={{ width: 40 }} />
        </View>
        <LeaderboardSkeleton />
      </SafeAreaView>
    );
  }

  // ── 2. Erreur réseau sans cache ───────────────────────────────
  if (hasNetworkError && !data) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.navHeader}>
          <TouchableOpacity
            onPress={goBack}
            style={styles.backBtn}
            activeOpacity={0.75}
          >
            <Ionicons name="arrow-back" size={19} color={colors.white} />
          </TouchableOpacity>
          <View style={styles.navCenter}>
            <Text style={styles.navEyebrow}>PROGRAMME JAMBAAR</Text>
            <Text style={styles.navTitle}>
              Classement <Text style={{ color: colors.amber }}>⚡</Text>
            </Text>
          </View>
          <View style={{ width: 40 }} />
        </View>
        <NetworkErrorScreen onRetry={refetch} />
      </SafeAreaView>
    );
  }

  // ── 3. Rendu normal ───────────────────────────────────────────
  const listData = leaderboard.length > 3 ? leaderboard.slice(3) : leaderboard;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.haloTop} />
      <FlatList
        data={listData}
        keyExtractor={(item) => item.user.id}
        renderItem={({ item, index }) => (
          <LeaderboardRow
            item={item}
            isMe={item.user.id === user?.id}
            index={index}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}
