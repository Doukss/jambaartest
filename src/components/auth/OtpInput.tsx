import React, { useRef } from "react";
import { TextInput, View, Animated, StyleSheet } from "react-native";
import { useThemedStyles } from "@/theme/useTheme";
import { AppColors } from "@/theme/colors";

const OTP_LENGTH = 6;

interface OtpInputProps {
  code: string[];
  onCodeChange: (code: string[]) => void;
  hasError: boolean;
  shakeAnim: Animated.Value;
  colors: AppColors;
}

export function OtpInput({
  code,
  onCodeChange,
  hasError,
  shakeAnim,
  colors,
}: OtpInputProps) {
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const styles = useThemedStyles((c) => ({
    otpRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 20,
    },
    otpCellWrapper: {
      alignItems: "center",
      gap: 6,
    },
    otpCell: {
      width: 46,
      height: 58,
      backgroundColor: c.inputBg,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: c.cardBorder,
      color: c.white,
      fontSize: 24,
      fontWeight: "800",
      textAlign: "center",
    },
    otpCellActive: {
      borderColor: "rgba(220,30,30,0.45)",
      borderWidth: 2,
    },
    otpCursor: {
      width: 18,
      height: 3,
      borderRadius: 2,
      backgroundColor: c.red,
    },
  }));

  const handleChange = (text: string, index: number) => {
    // Gestion du coller (coller plusieurs chiffres d'un coup)
    if (text.length > 1) {
      const digits = text.replace(/\D/g, "").slice(0, OTP_LENGTH).split("");
      const newCode = Array(OTP_LENGTH).fill("");
      digits.forEach((d, i) => (newCode[i] = d));
      onCodeChange(newCode);
      const nextIndex = Math.min(digits.length, OTP_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    // Saisie normale chiffre par chiffre
    const digit = text.replace(/\D/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    onCodeChange(newCode);

    // Auto-focus sur la case suivante
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace") {
      const newCode = [...code];
      // Si la case actuelle a un chiffre, on l'efface
      if (newCode[index]) {
        newCode[index] = "";
        onCodeChange(newCode);
      }
      // Sinon, on recule et on efface la case précédente
      else if (index > 0) {
        newCode[index - 1] = "";
        onCodeChange(newCode);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const activeBorderColor = hasError ? "#EF4444" : colors.red;

  return (
    <Animated.View
      style={[styles.otpRow, { transform: [{ translateX: shakeAnim }] }]}
    >
      {Array.from({ length: OTP_LENGTH }).map((_, i) => {
        const isFilled = !!code[i];
        const isActive = code.filter(Boolean).length === i;

        return (
          <View key={i} style={styles.otpCellWrapper}>
            <TextInput
              ref={(ref) => {
                inputRefs.current[i] = ref;
              }}
              style={[
                styles.otpCell,
                isFilled && {
                  borderColor: hasError ? "#EF4444" : activeBorderColor,
                  borderWidth: 2,
                  ...(hasError
                    ? {}
                    : {
                        shadowColor: colors.red,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 4,
                      }),
                },
                isActive && !isFilled && styles.otpCellActive,
              ]}
              value={code[i]}
              onChangeText={(t) => handleChange(t, i)}
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(nativeEvent.key, i)
              }
              keyboardType="numeric"
              maxLength={OTP_LENGTH}
              textAlign="center"
              selectTextOnFocus
              caretHidden
              selectionColor={colors.red}
            />
            {/* Curseur clignotant visuel pour la case active */}
            {isActive && !isFilled && <View style={styles.otpCursor} />}
          </View>
        );
      })}
    </Animated.View>
  );
}
