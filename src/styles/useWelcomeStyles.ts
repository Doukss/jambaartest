import { useThemedStyles } from "@/theme/useTheme";
import { useThemeStore } from "@/store/theme.store";

export function useWelcomeStyles() {
  const isDark = useThemeStore((s) => s.theme === "dark");

  const styles = useThemedStyles((c) => ({
    container: { flex: 1, backgroundColor: isDark ? "#0a0808" : "#fff5f5" },
    haloTop: {
      position: "absolute",
      top: -100,
      left: -80,
      width: 320,
      height: 280,
      borderRadius: 160,
      backgroundColor: isDark ? "rgba(200,20,20,0.14)" : "rgba(200,20,20,0.06)",
    },
    haloBottom: {
      position: "absolute",
      bottom: 80,
      right: -70,
      width: 240,
      height: 200,
      borderRadius: 120,
      backgroundColor: isDark ? "rgba(180,10,10,0.08)" : "rgba(200,20,20,0.04)",
    },
    safeArea: { flex: 1, paddingHorizontal: 24 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 8,
      paddingBottom: 12,
    },
    headerRight: { flexDirection: "row", alignItems: "center", gap: 8 },
    statusBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: "rgba(34,197,94,0.10)",
      borderWidth: 0.5,
      borderColor: "rgba(34,197,94,0.28)",
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    statusDot: {
      width: 5,
      height: 5,
      borderRadius: 3,
      backgroundColor: "#22c55e",
    },
    statusText: {
      color: "#22c55e",
      fontSize: 10,
      fontWeight: "500",
      letterSpacing: 0.3,
    },
    heroBlock: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 8,
    },
    eyebrow: {
      color: isDark ? "#a06060" : "#9b5c5c",
      fontSize: 9,
      fontWeight: "600",
      letterSpacing: 3,
      textTransform: "uppercase",
      marginBottom: 10,
      textAlign: "center",
    },
    heroTitle: {
      fontSize: 38,
      fontWeight: "800",
      lineHeight: 42,
      textAlign: "center",
      letterSpacing: -1.5,
      marginBottom: 14,
    },
    heroTitleWhite: { color: isDark ? "#f0e4e4" : "#1a0a0a" },
    heroTitleRed: { color: c.red },
    heroSubtitle: {
      color: isDark ? "#c49090" : "#7a4444",
      fontSize: 13,
      textAlign: "center",
      lineHeight: 21,
      maxWidth: 240,
    },
    heroSubtitleAccent: { color: isDark ? "#e08080" : "#9b5050" },
    actionsBlock: { gap: 10, marginBottom: 12 },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      paddingVertical: 8,
    },
    footerText: { color: isDark ? "#a07070" : "#9b7070", fontSize: 13 },
    footerLink: { color: c.red, fontSize: 13, fontWeight: "500" },
    slogan: { alignItems: "center", paddingBottom: 16 },
    sloganText: {
      color: isDark ? "#7a5050" : "#c4a0a0",
      fontSize: 10,
      letterSpacing: 1,
      fontStyle: "italic",
    },
  }));

  return { styles, isDark };
}
