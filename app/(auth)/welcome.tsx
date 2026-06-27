import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useThemeStore } from "@/src/store/theme.store";
import { ThemeToggle } from "@/src/components/ui/ThemeToggle";
import { useColors } from "@/src/theme/useTheme";

import { useWelcomeScreen } from "@/src/hooks/useWelcomeScreen";
import { useWelcomeStyles } from "@/src/styles/useWelcomeStyles";
import { HeroOrb } from "@/src/components/welcome/HeroOrb";
import { PrimaryButton } from "@/src/components/welcome/PrimaryButton";

// Logo gardé en local car très petit et spécifique à cet écran
function JambaarLogo() {
  const colors = useColors();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <View
        style={{
          width: 30,
          height: 30,
          backgroundColor: colors.red,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="heart" size={14} color="#FFFFFF" />
      </View>
      <Text
        style={{
          color: colors.white,
          fontSize: 18,
          fontWeight: "700",
          letterSpacing: -0.3,
        }}
      >
        Jambaar
      </Text>
    </View>
  );
}

export default function WelcomeScreen() {
  const colors = useColors();
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";

  const {
    handleRegister,
    handleReconnect,
    fadeAnim,
    slideAnim,
    btnAnim,
    pulseAnim,
    ring2Anim,
  } = useWelcomeScreen();
  const { styles } = useWelcomeStyles();

  const fadeSlide = {
    opacity: fadeAnim,
    transform: [{ translateY: slideAnim }],
  };

  return (
    <View style={styles.container}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <View style={styles.haloTop} />
      <View style={styles.haloBottom} />

      <SafeAreaView style={styles.safeArea}>
        {/* ── Header ── */}
        <Animated.View style={[styles.header, fadeSlide]}>
          <JambaarLogo />
          <View style={styles.headerRight}>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Opérationnel</Text>
            </View>
            <ThemeToggle size={34} />
          </View>
        </Animated.View>

        {/* ── Hero ── */}
        <Animated.View style={[styles.heroBlock, fadeSlide]}>
          <HeroOrb pulseAnim={pulseAnim} ring2Anim={ring2Anim} />

          <Text style={styles.eyebrow}>Communauté de donneurs de sang</Text>

          <Text style={styles.heroTitle}>
            <Text style={styles.heroTitleWhite}>Chaque goutte{"\n"}</Text>
            <Text style={styles.heroTitleRed}>compte.</Text>
          </Text>

          <Text style={styles.heroSubtitle}>
            Rejoignez Jambaar. Sauvez des vies,{"\n"}
            <Text style={styles.heroSubtitleAccent}>gagnez des points</Text> et
            débloquez{"\n"}des récompenses exclusives.
          </Text>
        </Animated.View>

        {/* ── Actions ── */}
        <Animated.View style={[styles.actionsBlock, { opacity: btnAnim }]}>
          <PrimaryButton
            icon="person"
            label="Je suis donneur"
            sublabel="Inscription gratuite • 2 minutes"
            onPress={handleRegister}
          />
        </Animated.View>

        {/* ── Footer ── */}
        <Animated.View style={[styles.footer, { opacity: btnAnim }]}>
          <Text style={styles.footerText}>Déjà membre ?</Text>
          <TouchableOpacity
            onPress={handleReconnect}
            activeOpacity={0.7}
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
          >
            <Text style={styles.footerLink}>Se reconnecter</Text>
            <Ionicons
              name="arrow-forward-circle"
              size={16}
              color={colors.red}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* ── Slogan ── */}
        <Animated.View style={[styles.slogan, { opacity: btnAnim }]}>
          <Text style={styles.sloganText}>
            L'honneur qui engage, le lien qui sauve.
          </Text>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}
