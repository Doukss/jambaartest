import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/theme/useTheme";
import { NetworkErrorScreen } from "@/components/ui/NetworkErrorScreen";
import { RewardsSkeleton } from "@/components/rewards/RewardsSkeleton";
import { CouponsSkeleton } from "@/components/rewards/CouponsSkeleton";
import { RewardCard } from "@/components/rewards/RewardCard";
import { CouponCard } from "@/components/rewards/CouponCard";
import { useRewardsScreen } from "@/hooks/useRewardsScreen";
import { useRewardsStyles } from "@/styles/useRewardsStyles";

export default function RewardsScreen() {
  const colors = useColors();
  const { styles } = useRewardsStyles();
  const {
    goBack,
    activeTab,
    setActiveTab,
    couponFilter,
    setCouponFilter,
    rewards,
    rewardsLoading,
    hasRewardsNetworkError,
    refetchRewards,
    couponsData,
    couponsLoading,
    hasCouponsNetworkError,
    refetchCoupons,
    filteredCoupons,
    totalPoints,
    isRedeeming,
    handleRedeem,
  } = useRewardsScreen();

  const renderCatalogueContent = () => {
    if (rewardsLoading && !rewards) return <RewardsSkeleton />;
    if (hasRewardsNetworkError && !rewards)
      return <NetworkErrorScreen onRetry={refetchRewards} />;

    return (
      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RewardCard
            reward={item}
            userPoints={totalPoints}
            onRedeem={handleRedeem}
            isRedeeming={isRedeeming}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshing={rewardsLoading && !!rewards}
        onRefresh={refetchRewards}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="gift-outline" size={40} color={colors.textSubtle} />
            <Text style={styles.emptyTitle}>Aucune récompense disponible</Text>
          </View>
        }
      />
    );
  };

  const renderCouponsContent = () => {
    if (couponsLoading && !couponsData) return <CouponsSkeleton />;
    if (hasCouponsNetworkError && !couponsData)
      return <NetworkErrorScreen onRetry={refetchCoupons} />;

    return (
      <View style={styles.couponsContainer}>
        <View style={styles.filterRow}>
          {(["ACTIVE", "USED", "EXPIRED"] as const).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterPill,
                couponFilter === filter && styles.filterActive,
              ]}
              onPress={() => setCouponFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  couponFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter === "ACTIVE"
                  ? "Actifs"
                  : filter === "USED"
                    ? "Utilisés"
                    : "Expirés"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredCoupons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CouponCard coupon={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          refreshing={couponsLoading && !!couponsData}
          onRefresh={refetchCoupons}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons
                name="ticket-outline"
                size={40}
                color={colors.textSubtle}
              />
              <Text style={styles.emptyTitle}>
                Aucun coupon dans cette catégorie
              </Text>
            </View>
          }
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.topHalo} />

      {/* Header Nav */}
      <View style={styles.navHeader}>
        <TouchableOpacity
          onPress={goBack}
          style={styles.backBtn}
          activeOpacity={0.75}
        >
          <Ionicons name="arrow-back" size={19} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>
          Boutique <Text style={{ color: colors.amber }}>Jambaar</Text>
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Carte Solde Points */}
      <View style={styles.balanceCard}>
        <View style={styles.balanceHalo} />
        <View style={styles.balanceTop}>
          <Ionicons name="wallet-outline" size={18} color={colors.amber} />
          <Text style={styles.balanceLabel}>Votre solde</Text>
        </View>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceValue}>
            {totalPoints.toLocaleString()}
          </Text>
          <Text style={styles.balanceUnit}>pts</Text>
        </View>
      </View>

      {/* Tabs Switcher */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "catalogue" && styles.tabActive]}
          onPress={() => setActiveTab("catalogue")}
          activeOpacity={0.7}
        >
          <Ionicons
            name="gift-outline"
            size={16}
            color={activeTab === "catalogue" ? colors.white : colors.textMuted}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "catalogue" && styles.tabTextActive,
            ]}
          >
            Catalogue
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "coupons" && styles.tabActive]}
          onPress={() => setActiveTab("coupons")}
          activeOpacity={0.7}
        >
          <Ionicons
            name="ticket-outline"
            size={16}
            color={activeTab === "coupons" ? colors.white : colors.textMuted}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "coupons" && styles.tabTextActive,
            ]}
          >
            Mes Coupons
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === "catalogue"
        ? renderCatalogueContent()
        : renderCouponsContent()}
    </SafeAreaView>
  );
}
