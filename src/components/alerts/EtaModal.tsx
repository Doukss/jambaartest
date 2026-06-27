import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors, useThemedStyles } from "@/src/theme/useTheme";

interface EtaModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (eta?: number) => void;
  isLoading: boolean;
  destinationText: string;
}

export function EtaModal({
  visible,
  onClose,
  onConfirm,
  isLoading,
  destinationText,
}: EtaModalProps) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [etaText, setEtaText] = useState("");

  const styles = useThemedStyles((c) => ({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.7)",
      justifyContent: "flex-end",
    },
    content: {
      backgroundColor: c.cardBg,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 24,
      paddingBottom: 24 + insets.bottom,
      paddingTop: 12,
      borderTopWidth: 1,
      borderColor: c.cardBorder,
      alignItems: "center",
    },
    handle: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: c.textSubtle,
      marginBottom: 24,
    },
    iconWrap: {
      width: 64,
      height: 64,
      borderRadius: 20,
      backgroundColor: c.red + "1F",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
      borderWidth: 1,
      borderColor: c.red + "40",
    },
    title: {
      color: c.white,
      fontSize: 20,
      fontWeight: "800",
      marginBottom: 8,
      textAlign: "center",
    },
    subtitle: {
      color: c.textMuted,
      fontSize: 13,
      textAlign: "center",
      lineHeight: 20,
      marginBottom: 24,
      maxWidth: 280,
    },
    inputLabel: {
      color: c.textMuted,
      fontSize: 12,
      fontWeight: "600",
      marginBottom: 8,
      alignSelf: "flex-start",
    },
    inputSub: { color: c.textSubtle, fontWeight: "400" },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      alignSelf: "stretch",
      marginBottom: 20,
    },
    input: {
      flex: 1,
      height: 48,
      backgroundColor: c.inputBg,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: c.cardBorder,
      color: c.white,
      fontSize: 18,
      fontWeight: "700",
      textAlign: "center",
    },
    minuteText: { color: c.textMuted, fontSize: 14 },
    ctaBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      backgroundColor: c.red,
      borderRadius: 16,
      paddingVertical: 17,
      alignSelf: "stretch",
      marginBottom: 12,
      shadowColor: c.red,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 8,
    },
    ctaText: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" },
    cancelBtn: { paddingVertical: 10 },
    cancelText: { color: c.textMuted, fontSize: 14, fontWeight: "500" },
  }));

  const handleConfirm = () => {
    const eta = etaText.trim() ? parseInt(etaText) : undefined;
    onConfirm(eta && !isNaN(eta) ? eta : undefined);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.handle} />
          <View style={styles.iconWrap}>
            <Ionicons name="heart" size={28} color={colors.red} />
          </View>
          <Text style={styles.title}>Confirmer votre venue</Text>
          <Text style={styles.subtitle}>
            Un QR Code sera généré. Présentez-le à l&apos;accueil{" "}
            {destinationText}.
          </Text>
          <View style={{ alignSelf: "stretch", marginBottom: 20 }}>
            <Text style={styles.inputLabel}>
              Temps d&apos;arrivée estimé{" "}
              <Text style={styles.inputSub}>(optionnel)</Text>
            </Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={etaText}
                onChangeText={setEtaText}
                placeholder="ex: 15"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                maxLength={3}
              />
              <Text style={styles.minuteText}>minutes</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleConfirm}
            activeOpacity={0.85}
            disabled={isLoading}
            style={[styles.ctaBtn, isLoading && { opacity: 0.55 }]}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="heart" size={18} color="#FFFFFF" />
                <Text style={styles.ctaText}>J&apos;y vais !</Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.7}
            style={styles.cancelBtn}
          >
            <Text style={styles.cancelText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
