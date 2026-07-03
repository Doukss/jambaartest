import { View, Text, TouchableOpacity, Switch } from "react-native";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/theme/useTheme";
import { isNetworkError } from "@/utils/error.utils";

import { AlertCard } from "@/components/alerts/AlertCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { NetworkErrorScreen } from "@/components/ui/NetworkErrorScreen";
import { SkeletonCard } from "@/components/donor/SkeletonCard";
import { AlertsStats } from "@/components/donor/AlertsStats";
import { EngagementBanner } from "@/components/donor/EngagementBanner";
import { RecoveryScreen } from "@/components/donor/RecoveryScreen";

import { useDonorHomeScreen } from "@/hooks/useDonorHomeScreen";
import { useDonorHomeStyles } from "@/styles/useDonorHomeStyles";
import { FILTERS } from "@/constants/donorHomeConfig";
import { BloodTypeBanner } from "@/components/donor/BloodTypeBanner";
import { useBottomTabBarHeight } from "@/hooks/useTabBarHeight";

export default function DonorHomeScreen() {
  const colors = useColors();
  const tabBarHeight = useBottomTabBarHeight();
  const { styles } = useDonorHomeStyles(tabBarHeight);

  const {
    user,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    isEligible,
    daysLeft,
    showBanner,
    isTogglingAvail,
    activeFilter,
    setActiveFilter,
    toggleAvailability,
    displayedEngagement,
    isLocalExpired,
    activeEngagement,
    hasAlertsData,
    alerts,
    vitalCount,
    totalAlerts,
    handleOpenQrCode,
    handleAlertPress,
    handleCancelDirect,
    handleQuickConfirm,
    handleGoToEligibility,
  } = useDonorHomeScreen();  

  // ── 1. Loading skeleton ───────────────────────────────────────
  if (isLoading && !hasAlertsData) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour {user?.firstName} 👋</Text>
            <Text style={styles.headerTitle}>
              Alertes <Text style={{ color: colors.red }}>proches</Text>
            </Text>
          </View>
        </View>
        <View style={styles.listContent}>
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </View>
      </SafeAreaView>
    );
  }

  // ── 2. Erreur réseau sans cache ───────────────────────────────
  if (isError && !hasAlertsData && isNetworkError(error)) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <View style={{ gap: 3 }}>
            <Text style={styles.greeting}>Bonjour {user?.firstName} 👋</Text>
            <Text style={styles.headerTitle}>
              Alertes <Text style={{ color: colors.red }}>proches</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
            <Ionicons
              name="notifications-outline"
              size={21}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
        <NetworkErrorScreen onRetry={refetch} />
      </SafeAreaView>
    );
  }

  // ── 3. Mode récupération — donneur inéligible 🆕 ─────────────
  if (!isEligible) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        {/* Header identique mais titre adapté */}
        <View style={styles.header}>
          <View style={{ gap: 3 }}>
            <Text style={styles.greeting}>Bonjour {user?.firstName} 👋</Text>
            <Text style={styles.headerTitle}>
              Votre <Text style={{ color: "#534AB7" }}>récupération</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
            <Ionicons
              name="notifications-outline"
              size={21}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>

        {/* FlatList pour avoir le pull-to-refresh sur le contenu statique aussi */}
        <FlatList
          data={[]}
          keyExtractor={() => ""}
          renderItem={null}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={isRefetching}
          ListHeaderComponent={
            <RecoveryScreen
              daysLeft={daysLeft ?? 0}
              firstName={user?.firstName}
              onGoToEligibility={handleGoToEligibility}
            />
          }
          ListEmptyComponent={null}
        />
      </SafeAreaView>
    );
  }

  // ── 4. Rendu normal (donneur éligible) ────────────────────────
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AlertCard
            alert={item}
            onPress={handleAlertPress}
            onConfirm={handleQuickConfirm}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={isRefetching}
        ListHeaderComponent={
          <View>
            {/* ── Header ── */}
            <View style={styles.header}>
              <View style={{ gap: 3 }}>
                <Text style={styles.greeting}>
                  Bonjour {user?.firstName} 👋
                </Text>
                <Text style={styles.headerTitle}>
                  Alertes <Text style={{ color: colors.red }}>proches</Text>
                </Text>
              </View>
              <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
                <Ionicons
                  name="notifications-outline"
                  size={21}
                  color={colors.white}
                />
                {vitalCount > 0 && (
                  <View style={styles.bellBadge}>
                    <Text style={styles.bellBadgeText}>{vitalCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* ── Disponibilité ── */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.availRow,
                user?.isAvailable ? styles.availRowOn : styles.availRowOff,
              ]}
              onPress={() => toggleAvailability(!user?.isAvailable)}
              disabled={isTogglingAvail}
            >
              <View style={styles.availLeft}>
                <View
                  style={[
                    styles.availDot,
                    user?.isAvailable ? styles.availDotOn : styles.availDotOff,
                  ]}
                />
                <View>
                  <Text style={styles.availTitle}>
                    {user?.isAvailable
                      ? "Disponible pour donner"
                      : "Non disponible"}
                  </Text>
                  <Text style={styles.availSub}>
                    {user?.isAvailable
                      ? "Vous recevez les alertes push"
                      : "Les alertes sont suspendues"}
                  </Text>
                </View>
              </View>
              <Switch
                trackColor={{ false: colors.cardBorder, true: colors.success }}
                thumbColor={colors.cardBg}
                value={user?.isAvailable ?? true}
                onValueChange={(val) => toggleAvailability(val)}
              />
            </TouchableOpacity>

            {/* ── Bannières conditionnelles ── */}
            {showBanner && <BloodTypeBanner onPress={() => {}} />}

            {displayedEngagement && !isLocalExpired && (
              <EngagementBanner
                engagement={displayedEngagement.data}
                isExpired={displayedEngagement.type === "expired"}
                onPress={() => {
                  if (displayedEngagement.type === "active") {
                    const activeData = displayedEngagement.data as any;
                    handleOpenQrCode(
                      activeData.qrCode,
                      activeData.alert.id,
                      false,
                      activeData.alert.origin,
                    );
                  } else {
                    const localData = displayedEngagement.data as any;
                    handleOpenQrCode(
                      localData.qrCode,
                      localData.alertId,
                      true,
                      "HOSPITAL_DIRECT",
                    );
                  }
                }}
              />
            )}

            {isLocalExpired && activeEngagement?.alert?.id && (
              <View style={styles.ghostBanner}>
                <View style={styles.ghostTextBlock}>
                  <Text style={styles.ghostTitle}>Engagement non validé</Text>
                  <Text style={styles.ghostSub}>
                    Votre pass a expiré. Annulez pour redevenir disponible.
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.ghostCancelBtn}
                  onPress={() => handleCancelDirect(activeEngagement.alert.id)}
                >
                  <Text style={styles.ghostCancelText}>Libérer</Text>
                </TouchableOpacity>
              </View>
            )}

            <AlertsStats total={totalAlerts} vital={vitalCount} />

            {/* ── Filtres ── */}
            <View style={styles.filtersRow}>
              {FILTERS.map((f) => {
                const isActive = activeFilter === f.key;
                const isVitalFilter = f.key === "VITAL";
                return (
                  <TouchableOpacity
                    key={f.key}
                    onPress={() => setActiveFilter(f.key)}
                    activeOpacity={0.75}
                    style={[
                      styles.filterPill,
                      isActive && styles.filterPillActive,
                      isActive && isVitalFilter && styles.filterPillVital,
                    ]}
                  >
                    {isVitalFilter && (
                      <View
                        style={[
                          styles.filterDot,
                          isActive && styles.filterDotActive,
                        ]}
                      />
                    )}
                    <Text
                      style={[
                        styles.filterText,
                        isActive && styles.filterTextActive,
                        isActive && isVitalFilter && styles.filterTextVital,
                      ]}
                    >
                      {f.label}
                      {f.key === "VITAL" && vitalCount > 0
                        ? ` (${vitalCount})`
                        : ""}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <View style={styles.filterCount}>
                <Text style={styles.filterCountText}>
                  {alerts.length} résultat{alerts.length > 1 ? "s" : ""}
                </Text>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          isError ? (
            <EmptyState
              icon="cloud-offline-outline"
              title="Erreur de chargement"
              subtitle="Tirez vers le bas pour réessayer."
            />
          ) : (
            <EmptyState
              icon="heart-outline"
              title="Aucune alerte dans votre zone"
              subtitle="Vous serez notifié dès qu'un hôpital proche a besoin de donneurs."
            />
          )
        }
      />
    </SafeAreaView>
  );
}
