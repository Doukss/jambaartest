import { Platform } from "react-native";
import { useThemedStyles } from "@/theme/useTheme";

export function useDonationsStyles() {
  const styles = useThemedStyles((c) => ({
    container: { flex: 1, backgroundColor: c.bg },
    centered: { alignItems: "center", justifyContent: "center" },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 16,
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
    listContent: {
      paddingHorizontal: 20,
      paddingBottom: Platform.OS === "ios" ? 100 : 80,
    },
    emptyState: {
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 80,
      gap: 12,
      paddingHorizontal: 40,
    },
    emptyTitle: {
      color: c.textMuted,
      fontSize: 16,
      fontWeight: "700",
      textAlign: "center",
    },
    emptySub: {
      color: c.textSubtle,
      fontSize: 13,
      textAlign: "center",
      lineHeight: 20,
    },
    loaderMore: { paddingVertical: 20, alignItems: "center" },
  }));

  return { styles };
}
