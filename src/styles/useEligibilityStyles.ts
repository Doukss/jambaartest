import { useThemedStyles } from "@/theme/useTheme";

export function useEligibilityStyles() {
  const styles = useThemedStyles((c) => ({
    container: { flex: 1, backgroundColor: c.bg },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 4,
    },
    backBtn: {
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor: c.cardBg,
      borderWidth: 0.5,
      borderColor: c.cardBorder,
      alignItems: "center",
      justifyContent: "center",
    },
    headerTitle: { color: c.white, fontSize: 16, fontWeight: "700" },

    countdownBanner: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: c.amber + "14",
      borderWidth: 1,
      borderColor: c.amber + "30",
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 14,
      marginHorizontal: 20,
      marginBottom: 14,
    },
    countdownText: {
      color: c.amber,
      fontSize: 12,
      fontWeight: "600",
    },

    // Hero
    heroCard: {
      marginHorizontal: 20,
      marginTop: 16,
      marginBottom: 6,
      backgroundColor: c.cardBg,
      borderRadius: 22,
      borderWidth: 0.5,
      borderColor: c.cardBorder,
      padding: 20,
      overflow: "hidden",
    },
    heroGlow: {
      position: "absolute",
      top: -50,
      right: -50,
      width: 160,
      height: 160,
      borderRadius: 80,
      backgroundColor: "rgba(220,30,30,0.06)",
    },
    heroEmoji: { fontSize: 38, marginBottom: 12 },
    heroTitle: {
      color: c.white,
      fontSize: 26,
      fontWeight: "900",
      letterSpacing: -0.6,
      lineHeight: 32,
      marginBottom: 10,
    },
    heroSubtitle: { color: c.textMuted, fontSize: 13, lineHeight: 19 },
    heroAccent: { color: c.red },

    // Info Banner
    infoBanner: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginTop: 16,
      backgroundColor: "rgba(29,158,117,0.08)",
      borderRadius: 12,
      borderWidth: 0.5,
      borderColor: "rgba(29,158,117,0.22)",
      padding: 11,
    },
    infoBannerText: {
      flex: 1,
      color: "rgba(29,158,117,0.9)",
      fontSize: 12,
      lineHeight: 17,
      fontWeight: "500",
    },

    // Section Title
    sectionTitle: {
      color: c.textSubtle,
      fontSize: 10,
      fontWeight: "700",
      letterSpacing: 1.5,
      marginBottom: 10,
      marginTop: 4,
    },

    // Tips
    tipsCard: {
      backgroundColor: c.cardBg,
      borderRadius: 16,
      borderWidth: 0.5,
      borderColor: c.cardBorder,
      overflow: "hidden",
    },
    tipRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 13,
    },
    tipEmoji: { fontSize: 20, width: 28, textAlign: "center" },
    tipText: { flex: 1, color: c.textMuted, fontSize: 13, lineHeight: 18 },
    tipSep: { height: 0.5, backgroundColor: c.cardBorder, marginLeft: 53 },

    // Disclaimer
    disclaimer: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
      backgroundColor: c.cardBg,
      borderRadius: 14,
      borderWidth: 0.5,
      borderColor: c.cardBorder,
      padding: 14,
      marginBottom: 8,
    },
    disclaimerText: {
      flex: 1,
      color: c.textMuted,
      fontSize: 12,
      lineHeight: 18,
    },
  }));

  return { styles };
}
