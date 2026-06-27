import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "@/src/store/auth.store";
import { useLocation } from "@/src/hooks/useLocation";
import { useNotifications } from "@/src/hooks/useNotifications";
import { useSocket } from "@/src/hooks/useSocket";
import { useAlertStore } from "@/src/store/alerts.store";
import logger from "@/src/utils/logger.utils";

export function useDonorLayout() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const insets = useSafeAreaInsets();

  // ── Auth Guard ──
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.replace("/(auth)/welcome");
      return;
    }
    if (user.role !== "DONOR") router.replace("/(auth)/welcome");
  }, [isAuthenticated, user]);

  // ── Permissions & Sockets Init ──
  const { requestAndSync: syncLocation } = useLocation();
  const { requestAndRegister, startForegroundListener } = useNotifications();
  useSocket();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!user || hasInitialized.current) return;
    hasInitialized.current = true;
    logger.info("Initialisation permissions donneur...");
    const init = async () => {
      syncLocation();
      await requestAndRegister();
      startForegroundListener();
      logger.info("Permissions initialisées");
    };
    init();
  }, [user?.id]);

  // ── Alert Store ──
  const inAppAlert = useAlertStore((s) => s.inAppAlert);
  const setInAppAlert = useAlertStore((s) => s.setInAppAlert);

  // ── Dimensions ──
  const safeBottom = Platform.select({
    ios: insets.bottom,
    android: insets.bottom > 0 ? insets.bottom + 8 : 28,
    default: 8,
  });
  const tabBarHeight = 64 + safeBottom;

  const isAuthorized = isAuthenticated && !!user && user.role === "DONOR";

  return {
    isAuthorized,
    inAppAlert,
    setInAppAlert,
    safeBottom,
    tabBarHeight,
  };
}
