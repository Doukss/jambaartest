import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/src/theme/useTheme";
import { useBottomTabBarHeight } from "@/src/hooks/useTabBarHeight";

import { useEligibilityScreen } from "@/src/hooks/useEligibilityScreen";
import { useEligibilityStyles } from "@/src/styles/useEligibilityStyles";
import { EligibilityCard } from "@/src/components/eligibility/EligibilityCard";
import {
  HERO,
  REQUIRED,
  CONTRAINDICATIONS,
  TIPS,
} from "@/src/constants/eligibilityData";
import { useIsEligible } from "@/src/hooks/useAuthStore";

export default function EligibilityScreen() {
  const colors = useColors();
  const tabBarHeight = useBottomTabBarHeight();
  const { handleBack, fadeAnim, slideAnim } = useEligibilityScreen();
  const { styles } = useEligibilityStyles();
  const { isEligible, daysLeft } = useIsEligible();

  const SectionTitle = ({ label }: { label: string }) => (
    <Text style={styles.sectionTitle}>{label}</Text>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* ── Header ── */}
      <Animated.View
        style={[
          styles.header,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={19} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Éligibilité au don</Text>
        <View style={{ width: 38 }} />
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight + 24, gap: 14 }}
      >
        {/* ── Hero ── */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          {/* 🆕 Bannière contextuelle si le donneur est en période de repos */}
          {!isEligible && (
            <View style={styles.countdownBanner}>
              <Ionicons name="time-outline" size={16} color={colors.amber} />
              <Text style={styles.countdownText}>
                Vous pourrez donner à nouveau dans {daysLeft} jour
                {daysLeft > 1 ? "s" : ""}
              </Text>
            </View>
          )}
          <View style={styles.heroCard}>
            <View style={styles.heroGlow} />
            <Text style={styles.heroEmoji}>{HERO.emoji}</Text>
            <Text style={styles.heroTitle}>
              Puis-je donner{"\n"}du{" "}
              <Text style={styles.heroAccent}>sang ?</Text>
            </Text>
            <Text style={styles.heroSubtitle}>{HERO.subtitle}</Text>

            <View style={styles.infoBanner}>
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color="#1D9E75"
              />
              <Text style={styles.infoBannerText}>
                Un médecin ou infirmier évalue votre éligibilité le jour du don.
                Ces critères sont indicatifs.
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* ── Conditions requises ── */}
        <View style={{ paddingHorizontal: 20 }}>
          <SectionTitle label="CONDITIONS REQUISES" />
          <View style={{ gap: 8 }}>
            {REQUIRED.map((item, i) => (
              <EligibilityCard
                key={item.title}
                item={item}
                delay={i * 55}
                accentColor={item.color}
              />
            ))}
          </View>
        </View>

        {/* ── Contre-indications ── */}
        <View style={{ paddingHorizontal: 20 }}>
          <SectionTitle label="CONTRE-INDICATIONS" />
          <View style={{ gap: 8 }}>
            {CONTRAINDICATIONS.map((item, i) => (
              <EligibilityCard
                key={item.title}
                item={item}
                delay={i * 55}
                accentColor={item.temporary ? colors.amber : colors.red}
                badge={item.temporary ? "TEMPORAIRE" : "PERMANENT"}
              />
            ))}
          </View>
        </View>

        {/* ── Conseils pratiques ── */}
        <View style={{ paddingHorizontal: 20 }}>
          <SectionTitle label="CONSEILS PRATIQUES" />
          <View style={styles.tipsCard}>
            {TIPS.map((tip, i) => (
              <View key={tip.emoji}>
                <View style={styles.tipRow}>
                  <Text style={styles.tipEmoji}>{tip.emoji}</Text>
                  <Text style={styles.tipText}>{tip.text}</Text>
                </View>
                {i < TIPS.length - 1 && <View style={styles.tipSep} />}
              </View>
            ))}
          </View>
        </View>

        {/* ── Disclaimer ── */}
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.disclaimer}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color={colors.textMuted}
              style={{ flexShrink: 0, marginTop: 1 }}
            />
            <Text style={styles.disclaimerText}>
              Ces informations sont données à titre indicatif et ne remplacent
              pas l'entretien médical obligatoire réalisé avant chaque don. Seul
              un professionnel de santé peut valider votre éligibilité.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
