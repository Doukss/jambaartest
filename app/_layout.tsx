import "./global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Toast from "react-native-toast-message";
import { useThemeStore } from "@/store/theme.store";
import { useColors } from "@/theme/useTheme";
import { useAuthStore } from "@/store/auth.store";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { queryClient } from "@/config/query-client.config";
import { toastConfig } from "@/config/toast.config";


export default function RootLayout() {
  const initialize = useAuthStore((s) => s.initialize);
  const isLoading = useAuthStore((s) => s.isLoading);

  // Tous les hooks au niveau racine — jamais dans le JSX
  const hydrateTheme = useThemeStore((s) => s.hydrateTheme);
  const theme = useThemeStore((s) => s.theme);
  const colors = useColors();

  useEffect(() => {
    const init = async () => {
      await hydrateTheme();
      await initialize();
    };
    init();
  }, []);

  if (isLoading) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <SplashScreen />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style={theme === "dark" ? "light" : "dark"} />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.bg },
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(donor)" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <Toast config={toastConfig} />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
