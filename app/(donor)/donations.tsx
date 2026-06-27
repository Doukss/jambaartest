import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/src/theme/useTheme";
import { NetworkErrorScreen } from "@/src/components/ui/NetworkErrorScreen";
import { useDonationsScreen } from "@/src/hooks/useDonationsScreen";
import { useDonationsStyles } from "@/src/styles/useDonationsStyles";
import { DonationsSkeleton } from "@/src/components/donations/DonationsSkeleton";
import { DonationCard } from "@/src/components/donations/DonationCard";

export default function DonationsScreen() {
  const colors = useColors();
  const { styles } = useDonationsStyles();
  const {
    donations,
    isLoading,
    isError,
    hasNetworkError,
    error,
    refetch,
    isRefetching,
    handleLoadMore,
    isFetchingNextPage,
    goBack,
  } = useDonationsScreen();

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={goBack}
        style={styles.backBtn}
        activeOpacity={0.75}
      >
        <Ionicons name="arrow-back" size={19} color={colors.white} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>
        Mes <Text style={{ color: colors.red }}>Dons</Text>
      </Text>
      <View style={{ width: 40 }} />
    </View>
  );

  // ── 1. Chargement initial (Skeleton) ───────────────────────
  if (isLoading && !donations.length) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        {renderHeader()}
        <DonationsSkeleton />
      </SafeAreaView>
    );
  }

  // ── 2. Erreur réseau sans cache ────────────────────────────
  if (hasNetworkError && !donations.length) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        {renderHeader()}
        <NetworkErrorScreen onRetry={refetch} />
      </SafeAreaView>
    );
  }

  // ── 3. Rendu normal ─────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={donations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DonationCard item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={isRefetching}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={styles.loaderMore}>
              <ActivityIndicator color={colors.red} size="small" />
            </View>
          ) : null
        }
        ListEmptyComponent={
          isError ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="cloud-offline-outline"
                size={40}
                color={colors.textSubtle}
              />
              <Text style={styles.emptyTitle}>Erreur de chargement</Text>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons
                name="water-outline"
                size={40}
                color={colors.textSubtle}
              />
              <Text style={styles.emptyTitle}>Aucun don enregistré</Text>
              <Text style={styles.emptySub}>
                Répondez à une alerte pour sauver des vies et gagnez des points
                Jambaar !
              </Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
