import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useColors } from "@/theme/useTheme";
import { useThemeStore } from "@/store/theme.store";
import { useOtpVerifyStyles } from "@/theme/screens/otpVerify.styles";
import { useOtpVerify } from "@/hooks/useOtpVerify";
import { OtpInput } from "@/components/auth/OtpInput";
import { formatTime, maskEmail } from "@/utils/format.utils";



// ─── Écran principal ───────────────────────────────────────────
export default function OtpVerifyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email: string }>();
  const colors = useColors();
  const theme = useThemeStore((s) => s.theme);
  const styles = useOtpVerifyStyles();

  // Récupération de toute la logique via le hook
  const {
    code,
    updateCode,
    hasError,
    isExpired,
    expiryTimer,
    resendTimer,
    isPending,
    isResending,
    shakeAnim,
    handleVerify,
    handleResend,
  } = useOtpVerify(params.email);

  // Animations d'entrée
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Déclenchement automatique de la vérification quand l'OTP est complet
  const codeComplete = code.every(Boolean);
  useEffect(() => {
    if (codeComplete && !isPending && !hasError) {
      handleVerify();
    }
  }, [codeComplete, isPending, hasError, handleVerify]);

  const timerColor =
    expiryTimer <= 60
      ? "#EF4444"
      : expiryTimer <= 180
        ? colors.amber
        : colors.red;

  return (
    <View style={styles.container}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      <View style={styles.haloCenter} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
            activeOpacity={0.75}
          >
            <Ionicons name="arrow-back" size={19} color={colors.white} />
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.body,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.iconWrap}>
              <View style={styles.iconOuter}>
                <View style={styles.iconInner}>
                  <Ionicons name="mail-outline" size={32} color={colors.red} />
                </View>
              </View>
              {codeComplete && !hasError && (
                <View style={styles.iconBadge}>
                  <Ionicons name="checkmark" size={12} color={colors.white} />
                </View>
              )}
            </View>

            <View style={styles.textBlock}>
              <Text style={styles.title}>Vérifiez votre email</Text>
              <Text style={styles.subtitle}>
                Code envoyé à{" "}
                <Text style={styles.emailHighlight}>
                  {maskEmail(params.email)}
                </Text>
              </Text>
            </View>

            <OtpInput
              code={code}
              onCodeChange={updateCode}
              hasError={hasError}
              shakeAnim={shakeAnim}
              colors={colors}
            />

            {hasError && (
              <View style={styles.errorCard}>
                <Ionicons
                  name="alert-circle-outline"
                  size={15}
                  color="#EF4444"
                />
                <Text style={styles.errorText}>
                  Code incorrect ou expiré. Vérifiez votre email.
                </Text>
              </View>
            )}

            <View style={styles.timerBlock}>
              {isExpired ? (
                <View style={styles.expiredCard}>
                  <Ionicons name="time-outline" size={16} color="#EF4444" />
                  <Text style={styles.expiredText}>
                    Code expiré — demandez-en un nouveau
                  </Text>
                </View>
              ) : (
                <>
                  <View
                    style={[styles.timerCircle, { borderColor: timerColor }]}
                  >
                    <Ionicons
                      name="time-outline"
                      size={14}
                      color={timerColor}
                    />
                  </View>
                  <Text style={[styles.timerText, { color: timerColor }]}>
                    {formatTime(expiryTimer)}
                  </Text>
                  <Text style={styles.timerLabel}>avant expiration</Text>
                </>
              )}
            </View>
          </Animated.View>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleVerify}
              activeOpacity={0.85}
              style={[
                styles.ctaBtn,
                (isPending || isExpired) && styles.ctaBtnDisabled,
              ]}
              disabled={isPending || isExpired}
            >
              {isPending ? (
                <ActivityIndicator color={colors.white} size="small" />
              ) : (
                <>
                  <Text style={styles.ctaBtnText}>Vérifier le code</Text>
                  <View style={styles.ctaBtnIcon}>
                    <Ionicons
                      name="checkmark-outline"
                      size={17}
                      color={colors.white}
                    />
                  </View>
                </>
              )}
            </TouchableOpacity>

            <View style={styles.resendRow}>
              <Text style={styles.resendText}>Pas reçu ? </Text>
              <TouchableOpacity
                onPress={handleResend}
                disabled={resendTimer > 0 || isResending}
                activeOpacity={0.7}
              >
                {isResending ? (
                  <ActivityIndicator size="small" color={colors.red} />
                ) : resendTimer > 0 ? (
                  <Text style={styles.resendCountdown}>
                    Renvoyer dans {formatTime(resendTimer)}
                  </Text>
                ) : (
                  <Text style={styles.resendLink}>Renvoyer le code</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.securityInfo}>
              <Ionicons
                name="shield-checkmark-outline"
                size={13}
                color={colors.textSubtle}
              />
              <Text style={styles.securityText}>
                Code valide 10 minutes · Ne le partagez jamais
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}
