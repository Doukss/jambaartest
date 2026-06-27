import { useThemedStyles } from "@/src/theme/useTheme";
import { useBottomTabBarHeight } from "@/src/hooks/useTabBarHeight";

export function useDonorDaysStyles() {
  const tabBarHeight = useBottomTabBarHeight();

  const styles = useThemedStyles((c) => ({
    container: { flex: 1, backgroundColor: c.bg },
    header: {
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 16,
      gap: 3,
    },
    headerEyebrow: {
      color: c.textMuted,
      fontSize: 10,
      fontWeight: "600",
      letterSpacing: 1.5,
      textTransform: "uppercase",
    },
    headerTitle: {
      color: c.white,
      fontSize: 26,
      fontWeight: "600",
      letterSpacing: -0.5,
    },
    listContent: {
      paddingHorizontal: 20,
      paddingTop: 4,
      paddingBottom: tabBarHeight + 20,
    }, // ← Intégré
    emptyWrap: {
      alignItems: "center",
      paddingTop: 60,
      paddingHorizontal: 32,
      gap: 16,
    },
    emptyIconBg: {
      width: 80,
      height: 80,
      borderRadius: 24,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: c.red + "12",
      borderWidth: 0.5,
      borderColor: c.red + "25",
    },
    emptyTitle: {
      color: c.white,
      fontSize: 17,
      fontWeight: "500",
      textAlign: "center",
    },
    emptySub: {
      color: c.textMuted,
      fontSize: 13,
      textAlign: "center",
      lineHeight: 20,
    },
  }));

  return { styles };
}
