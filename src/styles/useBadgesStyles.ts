import { useThemedStyles } from "@/theme/useTheme";
import { useBottomTabBarHeight } from "../hooks/useTabBarHeight";

export function useBadgesStyles() {
  const tabBarHeight = useBottomTabBarHeight();

  const styles = useThemedStyles((c) => ({
    container: { flex: 1, backgroundColor: c.bg },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 16 + tabBarHeight,
    },
    topHalo: {
      position: "absolute",
      top: -60,
      left: "50%",
      marginLeft: -100,
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: c.redGlow,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 8,
      paddingBottom: 20,
    },
    backBtn: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: c.cardBg,
      borderWidth: 1,
      borderColor: c.cardBorder,
      alignItems: "center",
      justifyContent: "center",
    },
    headerCenter: { flex: 1, alignItems: "center" },
    headerTitle: {
      color: c.white,
      fontSize: 20,
      fontWeight: "800",
      letterSpacing: -0.5,
    },
    headerBadge: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
      backgroundColor: c.amber + "12",
      borderWidth: 1,
      borderColor: c.amber + "28",
    },
    headerBadgeText: { color: c.amber, fontSize: 13, fontWeight: "800" },
    progressCard: {
      backgroundColor: c.cardBg,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.cardBorder,
      padding: 18,
      marginBottom: 28,
      gap: 12,
    },
    progressTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    progressLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
    progressLabel: { color: c.white, fontSize: 13, fontWeight: "700" },
    progressPercent: { color: c.amber, fontSize: 14, fontWeight: "800" },
    progressBarBg: {
      height: 7,
      borderRadius: 4,
      backgroundColor: c.cardBorder,
      overflow: "hidden",
    },
    progressBarFill: { height: "100%", borderRadius: 4 },
    progressHint: { color: c.textMuted, fontSize: 12 },
    section: { marginBottom: 28 },
    grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  }));

  return { styles };
}
