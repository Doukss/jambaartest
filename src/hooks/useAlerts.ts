import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { alertsApi } from "@/api/alerts.api";
import { useAuthStore } from "@/store/auth.store";
import { QUERY_KEYS } from "@/constants/query_key";
import { usersApi } from "../api/users.api";
import { useUserRole } from "./useAuthStore";
import { useAlertStore } from "../store/alerts.store";

// ── GET alertes autour du donneur ─────────────────────────────
export const useNearbyAlerts = (enabled: boolean = true) => {
  const user = useAuthStore((s) => s.user);
  const setAlerts = useAlertStore((s) => s.setAlerts);

  const hasCoordinates = !!user?.latitude && !!user?.longitude;

  return useQuery({
    queryKey: QUERY_KEYS.nearbyAlerts,
    queryFn: async () => {
      const data = await alertsApi.getNearby({
        lat: user?.latitude!,
        lng: user?.longitude!,
      });
      setAlerts(data);
      return data;
    },
    refetchInterval: 30_000,
    staleTime: 15_000,
    enabled: hasCoordinates && enabled,
    meta: { silent: true },
  });
};
// ── GET détail d'une alerte ───────────────────────────────────
export const useAlert = (alertId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.alert(alertId),
    queryFn: () => alertsApi.getById(alertId),
    enabled: !!alertId,
    staleTime: 10_000,
  });
};

export const useActiveEngagement = () => {
  return useQuery({
    queryKey: QUERY_KEYS.activeEngagement,
    queryFn: () => usersApi.getActiveEngagement(),
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
};

// ── Confirmer venue (Donneur) ─────────────────────────────────
export const useConfirmAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      alertId,
      etaMinutes,
    }: {
      alertId: string;
      etaMinutes?: number;
    }) => alertsApi.confirm(alertId, { etaMinutes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.nearbyAlerts });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activeEngagement });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.hasActiveConfirmation,
      });
    },
  });
};

// ── Décliner (Donneur) ────────────────────────────────────────
export const useDeclineAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (alertId: string) => alertsApi.decline(alertId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.nearbyAlerts });
    },
  });
};

// ── GET Vérification engagement actif ──────────────────────────
export const useHasActiveConfirmation = () => {
  const role = useUserRole();

  return useQuery({
    queryKey: QUERY_KEYS.hasActiveConfirmation,
    queryFn: () => alertsApi.checkActiveConfirmation(),
    select: (data) => data.hasActiveConfirmation,
    enabled: role === "DONOR",
    staleTime: 15_000,
  });
};

export const useCancelConfirmation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (alertId: string) => alertsApi.cancel(alertId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.nearbyAlerts });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activeEngagement });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.hasActiveConfirmation,
      });
    },
  });
};
