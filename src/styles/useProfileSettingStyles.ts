import { Platform } from "react-native";
import { useThemedStyles } from "@/theme/useTheme";
import { useBottomTabBarHeight } from "../hooks/useTabBarHeight";

export function useSettingsStyles() {
  const tabBarHeight = useBottomTabBarHeight();

  const styles = useThemedStyles((c) => ({
    container: { flex: 1, backgroundColor: c.bg },
    haloTop: {
      position: "absolute",
      top: -80,
      right: -40,
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: c.redGlow,
      opacity: 0.5,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 24,
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
    headerTitle: {
      color: c.white,
      fontSize: 22,
      fontWeight: "900",
      letterSpacing: -0.5,
    },
    scroll: { flex: 1 },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 16 + tabBarHeight,
    },
    sectionTitle: {
      color: c.textSubtle,
      fontSize: 10,
      fontWeight: "700",
      letterSpacing: 1.5,
      marginBottom: 10,
      marginTop: 8,
    },
    card: {
      backgroundColor: c.cardBg,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: c.cardBorder,
      marginBottom: 8,
      overflow: "hidden",
    },
    pushRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 14,
      paddingRight: 6,
      minHeight: 50,
    },
    versionText: { color: c.textSubtle, fontSize: 13, fontWeight: "600" },
    deleteCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 14,
      minHeight: 50,
      backgroundColor: c.cardBg,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: c.red + "40",
    },
    deleteArrow: {
      width: 28,
      height: 28,
      borderRadius: 8,
      backgroundColor: c.red + "15",
      alignItems: "center",
      justifyContent: "center",
    },
    themeRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 14,
      minHeight: 50,
    },
    themeIconWrap: {
      width: 34,
      height: 34,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: c.amber + "15",
    },
    themeLabel: { color: c.white, fontSize: 14, fontWeight: "500" },
    themeHint: { color: c.textMuted, fontSize: 11 },
  }));

  return { styles };
}
