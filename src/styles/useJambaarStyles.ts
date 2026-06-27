import { Platform } from "react-native";
import { useThemedStyles } from "@/src/theme/useTheme";

export function useJambaarStyles() {
  const styles = useThemedStyles((c) => ({
    container: { flex: 1, backgroundColor: c.bg },
    centered: { alignItems: "center", justifyContent: "center" },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: Platform.OS === "ios" ? 100 : 80,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 8,
      paddingBottom: 20,
    },
    eyebrow: {
      color: c.textSubtle,
      fontSize: 10,
      fontWeight: "700",
      letterSpacing: 2,
    },
    headerTitle: {
      color: c.white,
      fontSize: 26,
      fontWeight: "900",
      letterSpacing: -0.5,
    },
    gradeCard: {
      backgroundColor: c.cardBg,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: c.cardBorder,
      padding: 20,
      marginBottom: 12,
      overflow: "hidden",
      position: "relative",
    },
    gradeTop: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    pointsValue: {
      color: c.white,
      fontSize: 42,
      fontWeight: "900",
      letterSpacing: -2,
      lineHeight: 46,
    },
    pointsUnit: { color: c.textMuted, fontSize: 13, fontWeight: "500" },
    eyebrowSmall: {
      color: c.textSubtle,
      fontSize: 9,
      fontWeight: "700",
      letterSpacing: 1.5,
      marginBottom: 2,
    },
    progressBarBg: {
      height: 6,
      borderRadius: 3,
      backgroundColor: c.cardBorder,
      overflow: "hidden",
    },
    progressBarFill: { height: "100%", borderRadius: 3 },
    progressHint: { color: c.textMuted, fontSize: 12 },
    maxGradeText: { color: c.amber, fontSize: 14, fontWeight: "700" },
    row: { flexDirection: "row", gap: 12, marginBottom: 12 },
    eligibilityCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      borderRadius: 18,
      borderWidth: 1,
      padding: 14,
      marginBottom: 24,
    },
    eligibleCard: {
      backgroundColor: c.success + "12",
      borderColor: c.success + "38",
    },
    notEligibleCard: {
      backgroundColor: c.amber + "10",
      borderColor: c.amber + "33",
    },
    eligibilityTitle: { fontSize: 14, fontWeight: "700" },
    eligibilitySub: { color: c.textMuted, fontSize: 12, lineHeight: 18 },
    sectionTitle: {
      color: c.textSubtle,
      fontSize: 10,
      fontWeight: "700",
      letterSpacing: 1.5,
      marginBottom: 10,
    },
    actionsBlock: {
      backgroundColor: c.cardBg,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: c.cardBorder,
      marginBottom: 28,
      overflow: "hidden",
    },
    actionSeparator: {
      height: 1,
      backgroundColor: c.cardBorder,
      marginLeft: 72,
    },
    slogan: {
      color: c.textSubtle,
      fontSize: 11,
      textAlign: "center",
      fontStyle: "italic",
      letterSpacing: 0.5,
      marginBottom: 8,
    },
  }));

  return { styles };
}
