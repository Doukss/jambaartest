import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  Animated,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/src/store/theme.store";
import { ThemeToggle } from "@/src/components/ui/ThemeToggle";
import { useColors } from "@/src/theme/useTheme";

import { useSettingsScreen } from "@/src/hooks/useSettingsScreen";
import { useSettingsStyles } from "@/src/styles/useProfileSettingStyles";
import { SettingRow } from "@/src/components/settings/SettingRow";
import { InfoBanner } from "@/src/components/settings/InfoBanner";

export default function SettingsScreen() {
  const colors = useColors();
  const theme = useThemeStore((s) => s.theme);
  const { styles } = useSettingsStyles();

  const {
    user,
    goBack,
    pushEnabled,
    isCheckingPush,
    isSyncingLocation,
    isDeleting,
    fadeAnim,
    slideAnim,
    handleTogglePush,
    handleSyncLocation,
    handleDeleteAccount,
  } = useSettingsScreen();

  const pushColor = "#1D9E75";

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.haloTop} />

      {/* ── Header ── */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <TouchableOpacity
          onPress={goBack}
          style={styles.backBtn}
          activeOpacity={0.75}
        >
          <Ionicons name="arrow-back" size={19} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres</Text>
        <ThemeToggle size={40} />
      </Animated.View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          {/* ── Apparence ── */}
          <Text style={styles.sectionTitle}>APPARENCE</Text>
          <View style={styles.card}>
            <View style={styles.themeRow}>
              <View style={styles.themeIconWrap}>
                <Ionicons
                  name={theme === "dark" ? "moon-outline" : "sunny-outline"}
                  size={17}
                  color={colors.amber}
                />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={styles.themeLabel}>Thème de l'interface</Text>
                <Text style={styles.themeHint}>
                  {theme === "dark" ? "Mode sombre" : "Mode clair"}
                </Text>
              </View>
              <ThemeToggle size={36} />
            </View>
          </View>

          {/* ── Notifications ── */}
          <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
          <View style={styles.card}>
            <View style={styles.pushRow}>
              <View
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: pushEnabled
                    ? pushColor + "15"
                    : colors.cardBorder,
                }}
              >
                <Ionicons
                  name="notifications-outline"
                  size={17}
                  color={pushEnabled ? pushColor : colors.textMuted}
                />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  Notifications push
                </Text>
                <Text style={{ color: colors.textMuted, fontSize: 11 }}>
                  {pushEnabled ? "Activées" : "Désactivées"}
                </Text>
              </View>
              {isCheckingPush ? (
                <ActivityIndicator size="small" color={colors.textMuted} />
              ) : (
                <Switch
                  trackColor={{ false: colors.cardBorder, true: pushColor }}
                  thumbColor={colors.cardBg}
                  value={pushEnabled}
                  onValueChange={handleTogglePush}
                  ios_backgroundColor={colors.cardBorder}
                />
              )}
            </View>
            <InfoBanner
              icon="information-circle-outline"
              text="Les notifications vous alertent en temps réel lorsqu'un hôpital proche a besoin de votre groupe sanguin."
            />
          </View>

          {/* ── Localisation ── */}
          <Text style={styles.sectionTitle}>LOCALISATION</Text>
          <View style={styles.card}>
            <SettingRow
              icon="locate-outline"
              label="Mettre à jour ma position"
              hint={
                user?.latitude
                  ? "Position actuelle disponible"
                  : "Nécessaire pour les alertes"
              }
              color={colors.amber}
              onPress={handleSyncLocation}
              right={
                isSyncingLocation ? (
                  <ActivityIndicator size="small" color={colors.amber} />
                ) : undefined
              }
              last
            />
            <InfoBanner
              icon="shield-checkmark-outline"
              text="Votre position n'est utilisée que pour vous envoyer des alertes de don proches. Elle n'est jamais partagée."
              color={colors.success}
            />
          </View>

          {/* ── À propos ── */}
          <Text style={styles.sectionTitle}>À PROPOS</Text>
          <View style={styles.card}>
            <SettingRow
              icon="document-text-outline"
              label="Conditions d'utilisation"
            />
            <SettingRow
              icon="shield-outline"
              label="Politique de confidentialité"
            />
            <SettingRow
              icon="information-circle-outline"
              label="Version"
              right={<Text style={styles.versionText}>1.0.0</Text>}
              last
            />
          </View>

          {/* ── Zone dangereuse ── */}
          <Text style={[styles.sectionTitle, { color: colors.red }]}>
            ZONE DANGEREUSE
          </Text>
          <TouchableOpacity
            style={styles.deleteCard}
            onPress={handleDeleteAccount}
            activeOpacity={0.7}
            disabled={isDeleting}
          >
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.red + "15",
              }}
            >
              <Ionicons name="trash-outline" size={17} color={colors.red} />
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <Text
                style={{ color: colors.red, fontSize: 14, fontWeight: "500" }}
              >
                Supprimer mon compte
              </Text>
              <Text style={{ color: colors.textMuted, fontSize: 11 }}>
                Anonymisation définitive de vos données
              </Text>
            </View>
            {isDeleting ? (
              <ActivityIndicator size="small" color={colors.red} />
            ) : (
              <View style={styles.deleteArrow}>
                <Ionicons name="chevron-forward" size={14} color={colors.red} />
              </View>
            )}
          </TouchableOpacity>

          <View style={{ height: Platform.OS === "ios" ? 120 : 100 }} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
