import { useIsAuthenticated, useUserRole } from "@/hooks/useAuthStore";
import { Redirect } from "expo-router";

export default function Index() {
  const isAuthenticated = useIsAuthenticated();
  const role = useUserRole();

  // 1. Si non connecté → On va vers l'accueil auth
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/welcome" />;
  }

  // 2. Si l'utilisateur n'est PAS un Donneur (Admin, CNTS, Hôpital)
  if (role !== "DONOR") {
    return <Redirect href="/+not-found" />;
  }

  // 3. Si c'est un DONOR → Va vers le groupe donneur
  return <Redirect href="/(donor)" />;
}
