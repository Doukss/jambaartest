import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { StatusBar } from "expo-status-bar";
import { useColors } from "@/src/theme/useTheme";
import { useThemeStore } from "@/src/store/theme.store";

import { useQrCodeScreen } from "@/src/hooks/useQrCodeScreen";
import { useQrCodeStyles } from "@/src/styles/useQrCodeStyles";

export default function QrCodeScreen() {
  const colors = useColors();
  const theme = useThemeStore((s) => s.theme);

  const {
    qrCode,
    isExpired,
    isCancelling,
    fadeAnim,
    scaleAnim,
    slideAnim,
    destinationText,
    instructionDetail,
    handleShare,
    handleCancel,
    goBack,
  } = useQrCodeScreen();

  const { styles } = useQrCodeStyles();

  // ── État d'erreur si pas de QR Code ──
  if (!qrCode) {
    return (
      <View style={[styles.container, styles.centered]}>
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
        <View style={styles.errorIconWrap}>
          <Ionicons name="alert-circle-outline" size={36} color={colors.red} />
        </View>
        <Text style={styles.errorTitle}>Code QR introuvable</Text>
        <Text style={styles.errorSub}>
          Retournez à la liste des alertes et réessayez.
        </Text>
        <TouchableOpacity onPress={goBack} style={styles.errorBtn}>
          <Text style={styles.errorBtnText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Rendu normal ──
  return (
    <View style={styles.container}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      <View style={styles.haloTop} />
      <View style={styles.haloBottom} />

      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Header ── */}
          <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
            <TouchableOpacity
              onPress={goBack}
              style={styles.headerBtn}
              activeOpacity={0.75}
            >
              <Ionicons name="close" size={20} color={colors.white} />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <View style={styles.successBadge}>
                <View style={styles.successDot} />
                <Text style={styles.successBadgeText}>Engagement pris</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleShare}
              style={styles.headerBtn}
              activeOpacity={0.75}
            >
              <Ionicons name="share-outline" size={20} color={colors.white} />
            </TouchableOpacity>
          </Animated.View>

          {/* ── Titre ── */}
          <Animated.View
            style={[
              styles.titleBlock,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.title}>Votre Pass Don 🩸</Text>
            <Text style={styles.subtitle}>
              Présentez ce QR Code {destinationText}
            </Text>
          </Animated.View>

          {/* ── Carte QR ── */}
          <Animated.View
            style={[
              styles.qrCardWrapper,
              { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
            ]}
          >
            <View style={styles.qrCard}>
              <View style={styles.qrCardHeader}>
                <View style={styles.qrLogoRow}>
                  <View style={styles.qrLogoIcon}>
                    <Ionicons name="heart" size={13} color="#FFFFFF" />
                  </View>
                  <Text style={styles.qrLogoText}>
                    Jam<Text style={{ color: colors.red }}>baar</Text>
                  </Text>
                </View>
                <Text style={styles.qrCardLabel}>Pass Don de Sang</Text>
              </View>

              <View style={styles.dottedLine} />

              <View style={styles.qrWrapper}>
                <QRCode
                  value={qrCode}
                  size={200}
                  color="#1A1A1A"
                  backgroundColor="#FFFFFF"
                />
              </View>

              <View style={styles.dottedLine} />

              <View style={styles.codeBlock}>
                <Text style={styles.codeLabel}>CODE DE PASSAGE</Text>
                <Text style={styles.codeValue}>{qrCode}</Text>
              </View>
            </View>
          </Animated.View>

          {/* ── Bas de page ── */}
          <Animated.View
            style={[
              styles.bottomBlock,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.instructionRow}>
              <View style={styles.instructionIcon}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={18}
                  color={colors.success}
                />
              </View>
              <Text style={styles.instructionText}>
                {instructionDetail}{" "}
                <Text style={{ color: colors.amber, fontWeight: "700" }}>
                  points Jambaar
                </Text>
                .
              </Text>
            </View>

            <TouchableOpacity
              style={styles.shareBtn}
              onPress={handleShare}
              activeOpacity={0.8}
            >
              <Ionicons
                name="share-social-outline"
                size={18}
                color={colors.white}
              />
              <Text style={styles.shareBtnText}>Partager le code</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cancelBtn, isExpired && styles.cancelBtnExpired]}
              onPress={handleCancel}
              activeOpacity={0.7}
              disabled={isCancelling}
            >
              {isCancelling ? (
                <ActivityIndicator color={colors.amber} size="small" />
              ) : (
                <>
                  <Ionicons
                    name="close-circle-outline"
                    size={18}
                    color={isExpired ? colors.textMuted : colors.amber}
                  />
                  <Text
                    style={[
                      styles.cancelBtnText,
                      isExpired && styles.cancelBtnTextExpired,
                    ]}
                  >
                    Annuler mon engagement
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <View style={styles.securityRow}>
              <Ionicons
                name="lock-closed-outline"
                size={12}
                color={colors.textSubtle}
              />
              <Text style={styles.securityText}>
                Code à usage unique · Ne le partagez qu&apos;avec le personnel
                médical
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
