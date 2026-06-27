import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { useColors } from "@/src/theme/useTheme";
import { NetworkErrorScreen } from "@/src/components/ui/NetworkErrorScreen";
import { DonorDayDetailSkeleton } from "@/src/components/donations-days/DonorDayDetailSkeleton"; // 🆕
import { useDonorDayDetailScreen } from "@/src/hooks/useDonorDayDetailScreen";
import { useDonorDayDetailStyles } from "@/src/styles/useDonorDayDetailStyles";

dayjs.locale("fr");

export default function DonorDayDetailScreen() {
  const colors = useColors();
  const { styles } = useDonorDayDetailStyles();
  const {
    day,
    isLoading,
    hasNetworkError,
    goBack,
    refetch,
    isEligible,
    daysLeft,
    hasActiveRegistration,
    isRegistered,
    hasCancelledThisDay,
    isRegistering,
    isCancelling,
    isFull,
    registrationsCount,
    remainingSpots,
    handleRegister,
    handleCancel,
  } = useDonorDayDetailScreen();  

  // ── Header partagé ─────────────────────────────────────────────
  const renderHeader = (title = "Détail de la collecte") => (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={goBack}
        style={styles.backBtn}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={18} color={colors.white} />
      </TouchableOpacity>
      <Text style={styles.headerTitle} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );

  // ── 1. Loading skeleton 🆕 ─────────────────────────────────────
  if (isLoading && !day) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        {renderHeader()}
        <DonorDayDetailSkeleton />
      </SafeAreaView>
    );
  }

  // ── 2. Erreur réseau sans cache ────────────────────────────────
  if (hasNetworkError) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        {renderHeader()}
        <NetworkErrorScreen onRetry={refetch} />
      </SafeAreaView>
    );
  }

  // ── 3. Sécurité si données manquantes ──────────────────────────
  if (!day) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        {renderHeader("Introuvable")}
        <View style={styles.errorContainer}>
          <Ionicons
            name="calendar-outline"
            size={48}
            color={colors.textMuted}
          />
          <Text style={styles.errorTitle}>
            Cette collecte n&apos;existe pas ou a été supprimée.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ── 4. Rendu normal ────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderHeader()}

        {/* Cover */}
        <View style={styles.cover}>
          {day.photoUrl ? (
            <Image
              source={{ uri: day.photoUrl }}
              style={styles.coverImage}
              contentFit="cover"
              transition={300}
            />
          ) : (
            <View style={styles.coverPlaceholder}>
              <Ionicons
                name="calendar-outline"
                size={60}
                color={colors.red + "15"}
              />
            </View>
          )}
        </View>

        <View style={styles.body}>
          {/* Structure */}
          <View style={styles.structureRow}>
            <View style={styles.structureIcon}>
              <Ionicons name="business-outline" size={20} color={colors.red} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.structureName}>
                {day.healthStructure?.name}
              </Text>
              <Text style={styles.structureAddress} numberOfLines={1}>
                {day.address}
              </Text>
            </View>
          </View>

          {/* Titre & Desc */}
          <Text style={styles.title}>{day.title}</Text>
          {day.description ? (
            <Text style={styles.description}>{day.description}</Text>
          ) : null}

          {/* Meta */}
          <View style={styles.metaGrid}>
            <View style={styles.metaCard}>
              <Ionicons name="calendar-outline" size={16} color={colors.red} />
              <Text style={styles.metaText}>
                {dayjs(day.scheduledDate).format("DD MMMM YYYY")}
              </Text>
            </View>
            <View style={styles.metaCard}>
              <Ionicons name="time-outline" size={16} color={colors.red} />
              <Text style={styles.metaText}>
                {day.startTime} – {day.endTime}
              </Text>
            </View>
          </View>

          {/* Blood Types */}
          <View style={styles.bloodRow}>
            {day.bloodTypesNeeded.length === 0 ? (
              <View style={styles.emptyPill}>
                <Text style={styles.emptyPillText}>
                  Ouvert à tous les groupes
                </Text>
              </View>
            ) : (
              day.bloodTypesNeeded.map((bt) => (
                <View key={bt} style={styles.pill}>
                  <Text style={styles.pillText}>
                    {bt.replace("_POS", "+").replace("_NEG", "−")}
                  </Text>
                </View>
              ))
            )}
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: colors.red }]}>
                {remainingSpots}
              </Text>
              <Text style={styles.statLabel}>Places restantes</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: colors.success }]}>
                {registrationsCount}
              </Text>
              <Text style={styles.statLabel}>Inscrits</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: colors.amber }]}>
                {day.targetDonors}
              </Text>
              <Text style={styles.statLabel}>Objectif</Text>
            </View>
          </View>

          {/* Bannières */}
          {!isEligible && (
            <View style={styles.eligibilityBanner}>
              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color={colors.amber}
              />
              <Text style={styles.eligibilityText}>
                Période de repos en cours. Vous pourrez donner dans {daysLeft}{" "}
                jour{daysLeft > 1 ? "s" : ""}.
              </Text>
            </View>
          )}

          {hasActiveRegistration && (
            <View style={styles.eligibilityBanner}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={colors.amber}
              />
              <Text style={styles.eligibilityText}>
                Vous avez déjà une inscription active sur une autre collecte.
                Annulez-la d&apos;abord pour pouvoir vous inscrire ici.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        {isRegistered ? (
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={handleCancel}
            disabled={isCancelling}
            activeOpacity={0.7}
          >
            {isCancelling ? (
              <ActivityIndicator color={colors.red} size="small" />
            ) : (
              <>
                <Ionicons
                  name="close-circle-outline"
                  size={20}
                  color={colors.red}
                />
                <Text style={styles.cancelBtnText}>
                  Annuler mon inscription
                </Text>
              </>
            )}
          </TouchableOpacity>
        ) : hasCancelledThisDay ? (
          <View style={[styles.ctaBtn, styles.ctaBtnDisabled]}>
            <Ionicons
              name="lock-closed-outline"
              size={18}
              color={colors.textMuted}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.ctaBtnText}>
              Vous avez deja annulé votre venue
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[
              styles.ctaBtn,
              (isFull ||
                !isEligible ||
                isRegistering ||
                hasActiveRegistration) &&
                styles.ctaBtnDisabled,
            ]}
            onPress={handleRegister}
            disabled={
              isFull || !isEligible || isRegistering || hasActiveRegistration
            }
            activeOpacity={0.85}
          >
            {isRegistering ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.ctaBtnText}>
                {isFull
                  ? "Liste d'attente complète"
                  : !isEligible
                    ? "Non éligible pour le moment"
                    : hasActiveRegistration
                      ? "Déjà inscrit à une autre collecte"
                      : "S'inscrire à cette collecte"}
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
