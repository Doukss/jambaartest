import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useColors } from "@/src/theme/useTheme";
import { useThemeStore } from "@/src/store/theme.store";
import { isNetworkError } from "@/src/utils/error.utils";
import { NetworkErrorScreen } from "@/src/components/ui/NetworkErrorScreen";
import { InfoRow } from "@/src/components/alerts/InfoRow";
import { EtaModal } from "@/src/components/alerts/EtaModal";
import {
  formatBloodType,
  formatServiceUnit,
  formatDistance,
  getTimeRemaining,
  formatRelative,
} from "@/src/utils/format.utils";
import { useAlertDetailScreen } from "@/src/hooks/useAlertDetailScreen";
import { useAlertDetailStyles } from "@/src/styles/useAlertDetailStyles";

export default function AlertDetailScreen() {
  const colors = useColors();
  const theme = useThemeStore((s) => s.theme);
  const { styles } = useAlertDetailStyles();

  const {
    alert,
    isLoading,
    isError,
    error,
    refetch,
    goBack,
    isEligible,
    daysLeft,
    isVital,
    isRare,
    destinationText,
    quotaPct,
    hasConfirmedThisAlert,
    hasActiveConfirmation,
    activeEngagement,
    showEtaModal,
    setShowEtaModal,
    confirmAnim,
    isConfirming,
    isDeclining,
    isCancelling,
    handleConfirm,
    handleRelay,
    handleDecline,
    handleCancel,
    openQrViewer,
  } = useAlertDetailScreen();

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator color={colors.red} size="large" />
      </View>
    );
  }

  if (isError || !alert) {
    if (isNetworkError(error)) {
      return (
        <View style={styles.container}>
          <NetworkErrorScreen onRetry={refetch} />
        </View>
      );
    }
    return (
      <View style={[styles.container, styles.centered]}>
        <Ionicons name="alert-circle-outline" size={40} color={colors.red} />
        <Text style={styles.errorText}>Alerte introuvable</Text>
        <TouchableOpacity onPress={goBack} style={styles.errorBack}>
          <Text style={styles.errorBackText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const bloodLabel = formatBloodType(alert.bloodType);
  const serviceLabel = formatServiceUnit(alert.serviceUnit);
  const distanceText = formatDistance(alert.distance_km);
  const timeRemaining = getTimeRemaining(alert.expiresAt);

  return (
    <View style={styles.container}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      {isVital && <View style={styles.vitalHalo} />}

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={goBack}
            style={styles.backBtn}
            activeOpacity={0.75}
          >
            <Ionicons name="arrow-back" size={19} color={colors.white} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            {isVital && (
              <View style={styles.vitalBadge}>
                <View style={styles.vitalDot} />
                <Text style={styles.vitalBadgeText}>URGENCE VITALE</Text>
              </View>
            )}
          </View>
          <View style={[styles.timerBadge, isVital && styles.timerBadgeVital]}>
            <Ionicons
              name="time-outline"
              size={12}
              color={isVital ? colors.red : colors.textMuted}
            />
            <Text style={[styles.timerText, isVital && styles.timerTextVital]}>
              {timeRemaining}
            </Text>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Bannière inéligibilité ── */}
          {!isEligible && (
            <View style={styles.ineligibleBanner}>
              <Ionicons name="time-outline" size={22} color={colors.amber} />
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={styles.ineligibleTitle}>
                  Période de repos en cours
                </Text>
                <Text style={styles.ineligibleSub}>
                  Vous pourrez donner à nouveau dans {daysLeft} jour
                  {daysLeft > 1 ? "s" : ""}. En attendant, relayez l&apos;alerte
                  pour sauver des vies !
                </Text>
              </View>
            </View>
          )}

          {/* ── Hero ── */}
          <View style={styles.heroBlock}>
            <View style={[styles.bloodHero, isVital && styles.bloodHeroVital]}>
              <Text
                style={[
                  styles.bloodHeroText,
                  isVital && styles.bloodHeroTextVital,
                ]}
              >
                {bloodLabel}
              </Text>
              {isRare && (
                <View style={styles.rareBadge}>
                  <Text style={styles.rareText}>Groupe Rare</Text>
                </View>
              )}
            </View>
            <View style={styles.heroInfo}>
              <Text style={styles.hospitalName} numberOfLines={2}>
                {alert.healthStructure.name}
              </Text>
              <View style={styles.heroMeta}>
                <Ionicons
                  name="location-outline"
                  size={13}
                  color={colors.textMuted}
                />
                <Text style={styles.heroMetaText}>{distanceText}</Text>
                <View style={styles.metaDot} />
                <Ionicons
                  name="medkit-outline"
                  size={13}
                  color={colors.textMuted}
                />
                <Text style={styles.heroMetaText}>{serviceLabel}</Text>
              </View>
            </View>
          </View>

          {/* ── Infos ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Détails de l&apos;alerte</Text>
            <View style={styles.infoCard}>
              <InfoRow
                icon="water-outline"
                label="Groupe sanguin requis"
                value={bloodLabel}
                valueColor={colors.red}
              />
              <View style={styles.separator} />
              <InfoRow
                icon="analytics-outline"
                label="Niveau d'urgence"
                value={isVital ? "VITAL" : "Standard"}
                valueColor={isVital ? colors.red : colors.success}
              />
              <View style={styles.separator} />
              <InfoRow
                icon="medkit-outline"
                label="Service"
                value={serviceLabel}
              />
              <View style={styles.separator} />
              <InfoRow
                icon="time-outline"
                label="Émise"
                value={formatRelative(alert.createdAt)}
              />
            </View>
          </View>

          {/* ── Quota ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Poches nécessaires</Text>
            <View style={styles.quotaCard}>
              <View style={styles.quotaNumbers}>
                <Text style={styles.quotaConfirmed}>
                  {alert.quantityConfirmed}
                </Text>
                <Text style={styles.quotaSeparator}>/</Text>
                <Text style={styles.quotaNeeded}>{alert.quantityNeeded}</Text>
                <Text style={styles.quotaUnit}>poches</Text>
              </View>
              <View style={styles.quotaBarBg}>
                <View
                  style={[
                    styles.quotaBarFill,
                    {
                      width: `${quotaPct}%` as any,
                      backgroundColor: isVital ? colors.red : colors.success,
                    },
                  ]}
                />
              </View>
              <Text style={styles.quotaHint}>
                {alert.quantityNeeded - alert.quantityConfirmed > 0
                  ? `${alert.quantityNeeded - alert.quantityConfirmed} donneur(s) encore nécessaire(s)`
                  : "Quota atteint — merci !"}
              </Text>
            </View>
          </View>

          <View style={styles.spacer} />
        </ScrollView>

        {/* ── Actions fixes ── */}
        <View style={styles.actionsBlock}>
          {hasConfirmedThisAlert ? (
            <>
              <TouchableOpacity
                onPress={openQrViewer}
                style={[styles.confirmBtn, styles.confirmBtnVital, { flex: 1 }]}
                activeOpacity={0.85}
              >
                <View style={styles.confirmIcon}>
                  <Ionicons name="qr-code-outline" size={18} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={styles.confirmBtnText}>Mon QR Code</Text>
                  <Text style={styles.confirmBtnSub}>
                    Présentez {destinationText}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCancel}
                activeOpacity={0.75}
                disabled={isCancelling}
                style={[
                  styles.declineBtn,
                  isCancelling && styles.declineBtnDisabled,
                  {
                    borderColor: colors.amber + "40",
                    backgroundColor: colors.amber + "10",
                  },
                ]}
              >
                {isCancelling ? (
                  <ActivityIndicator color={colors.amber} size="small" />
                ) : (
                  <>
                    <Ionicons
                      name="close-circle-outline"
                      size={20}
                      color={colors.amber}
                    />
                    <Text
                      style={[styles.declineBtnText, { color: colors.amber }]}
                    >
                      Annuler
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </>
          ) : hasActiveConfirmation ? (
            <TouchableOpacity
              onPress={openQrViewer}
              activeOpacity={0.7}
              style={[
                styles.confirmBtn,
                styles.confirmBtnDisabled,
                { flex: 1 },
              ]}
            >
              <View style={styles.confirmIcon}>
                <Ionicons name="lock-closed" size={18} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.confirmBtnText}>Déjà engagé ailleurs</Text>
                <Text style={styles.confirmBtnSub}>
                  Voir mon QR Code en cours
                </Text>
              </View>
            </TouchableOpacity>
          ) : isEligible ? (
            <>
              <Animated.View
                style={[{ flex: 1 }, { transform: [{ scale: confirmAnim }] }]}
              >
                <TouchableOpacity
                  onPress={() => setShowEtaModal(true)}
                  activeOpacity={0.85}
                  style={[styles.confirmBtn, isVital && styles.confirmBtnVital]}
                >
                  <View style={styles.confirmIcon}>
                    <Ionicons name="heart" size={18} color="#FFFFFF" />
                  </View>
                  <View>
                    <Text style={styles.confirmBtnText}>J&apos;y vais !</Text>
                    <Text style={styles.confirmBtnSub}>Don de sang</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
              <TouchableOpacity
                onPress={handleDecline}
                activeOpacity={0.75}
                disabled={isDeclining}
                style={[
                  styles.declineBtn,
                  isDeclining && styles.declineBtnDisabled,
                ]}
              >
                {isDeclining ? (
                  <ActivityIndicator color={colors.textMuted} size="small" />
                ) : (
                  <Text style={styles.declineBtnText}>Indisponible</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={handleRelay}
              activeOpacity={0.8}
              style={[styles.confirmBtn, styles.relayBtn]}
            >
              <View
                style={[
                  styles.confirmIcon,
                  { backgroundColor: colors.amber + "30" },
                ]}
              >
                <Ionicons name="share-outline" size={18} color={colors.amber} />
              </View>
              <View>
                <Text style={[styles.confirmBtnText, { color: colors.amber }]}>
                  Relayer cette alerte
                </Text>
                <Text style={styles.confirmBtnSub}>
                  Aidez en partageant autour de vous
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>

      <EtaModal
        visible={showEtaModal}
        onClose={() => setShowEtaModal(false)}
        onConfirm={handleConfirm}
        isLoading={isConfirming}
        destinationText={destinationText}
      />
    </View>
  );
}
