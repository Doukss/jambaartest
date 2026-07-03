import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/theme/useTheme";
import { NetworkErrorScreen } from "@/components/ui/NetworkErrorScreen";
import { DonorDaySkeleton } from "@/components/donations-days/DonorDaySkeleton";
import { DonorDayCard } from "@/components/donations-days/DonorDayCard";
import { useDonorDonationDays } from "@/hooks/useDonorDonationDays";
import { useDonorDaysStyles } from "@/styles/useDonorDaysStyles";

export default function DonorDonationDaysScreen() {
  const colors = useColors();
  const { styles } = useDonorDaysStyles();
  const {
    days,
    isLoading,
    isRefetching,
    refetch,
    isError,
    hasNetworkError,
    handlePressCard,
  } = useDonorDonationDays();

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerEyebrow}>Collectes planifiées</Text>
      <Text style={styles.headerTitle}>
        Journées <Text style={{ color: colors.red }}>de don</Text>
      </Text>
    </View>
  );

  // ── 1. Loading skeleton ───────────────────────────────────────
  if (isLoading && !days.length) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        {renderHeader()}
        <View style={{ paddingHorizontal: 20 }}>
          {[1, 2, 3].map((i) => (
            <DonorDaySkeleton key={i} />
          ))}
        </View>
      </SafeAreaView>
    );
  }

  // ── 2. Erreur réseau sans cache ───────────────────────────────
  if (hasNetworkError) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        {renderHeader()}
        <NetworkErrorScreen onRetry={refetch} />
      </SafeAreaView>
    );
  }

  // ── 3. Rendu normal ───────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {renderHeader()}
      <FlatList
        data={days}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={isRefetching}
        renderItem={({ item }) => (
          <DonorDayCard item={item} onPress={() => handlePressCard(item.id)} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <View style={styles.emptyIconBg}>
              <Ionicons
                name={isError ? "cloud-offline-outline" : "calendar-outline"}
                size={36}
                color={colors.red + "60"}
              />
            </View>
            <Text style={styles.emptyTitle}>
              {isError ? "Erreur de chargement" : "Aucune collecte prévue"}
            </Text>
            <Text style={styles.emptySub}>
              {isError
                ? "Tirez vers le bas pour réessayer."
                : "Les nouvelles journées de don compatibles avec votre groupe sanguin apparaîtront ici."}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
