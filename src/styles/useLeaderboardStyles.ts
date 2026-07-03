import { useThemedStyles } from "@/theme/useTheme";
import { useBottomTabBarHeight } from "../hooks/useTabBarHeight";

export function useLeaderboardStyles() {
  const tabBarHeight = useBottomTabBarHeight();

  const styles = useThemedStyles((c) => ({
    container: { flex: 1, backgroundColor: c.bg },
    centered: { alignItems: "center", justifyContent: "center" },
    listContent: {
      paddingHorizontal: 20,
      paddingBottom: 16 + tabBarHeight,
    },
    haloTop: {
      position: "absolute",
      top: -60,
      right: -40,
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: c.amber + "05",
    },
    navHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 8,
      paddingBottom: 16,
      gap: 12,
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
    navCenter: { flex: 1, gap: 1 },
    navEyebrow: {
      color: c.textSubtle,
      fontSize: 9,
      fontWeight: "700",
      letterSpacing: 1.5,
    },
    navTitle: {
      color: c.white,
      fontSize: 22,
      fontWeight: "900",
      letterSpacing: -0.5,
    },
    myRankCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: c.amber + "07",
      borderWidth: 1,
      borderColor: c.amber + "22",
      borderRadius: 14,
      padding: 12,
      marginBottom: 16,
    },
    myRankText: { color: c.white, fontSize: 13, fontWeight: "600", flex: 1 },
    scopesRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
    scopePill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingVertical: 7,
      paddingHorizontal: 12,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.cardBorder,
      backgroundColor: c.cardBg,
    },
    scopePillActive: {
      backgroundColor: c.amber + "12",
      borderColor: c.amber + "35",
    },
    scopeText: { color: c.textMuted, fontSize: 12, fontWeight: "600" },
    scopeTextActive: { color: c.white, fontWeight: "700" },
    restLabel: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 12,
    },
    restLine: { flex: 1, height: 1, backgroundColor: c.cardBorder },
    restText: {
      color: c.textSubtle,
      fontSize: 9,
      fontWeight: "700",
      letterSpacing: 1.5,
    },
    loadingMore: { paddingVertical: 20, alignItems: "center" },
  }));

  return { styles };
}
