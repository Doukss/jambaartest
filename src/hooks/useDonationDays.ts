import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query_key";
import { donationDaysApi } from "@/api/donationDays.api";
import { ListDaysFilters } from "@/types/donation-day.types";

// ─── Queries (Lecture) ──────────────────────────────────────────

export function useDayDetail(dayId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.donationDay(dayId),
    queryFn: () => donationDaysApi.getDayDetail(dayId),
    enabled: !!dayId,
  });
}

// ─── Queries & Mutations DONNEUR ────────────────────────────────

export function usePublishedDays(filters?: ListDaysFilters) {
  return useQuery({
    queryKey: QUERY_KEYS.publishedDays(filters),
    queryFn: () => donationDaysApi.getPublishedDays(filters),
  });
}

export function useMyRegistrations(filters?: ListDaysFilters) {
  return useQuery({
    queryKey: QUERY_KEYS.myRegistrations(filters),
    queryFn: () => donationDaysApi.getMyRegistrations(filters),
  });
}

export function useRegisterDonor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dayId: string) => donationDaysApi.registerDonor(dayId),
    onSuccess: (_, dayId) => {
      // Invalide toutes les listes de journées publiées (peu importe les filtres)
      queryClient.invalidateQueries({
        queryKey: ["donation-days", "published"],
      });
      // Invalide toutes les listes de mes inscriptions
      queryClient.invalidateQueries({
        queryKey: ["donation-days", "my-registrations"],
      });
      // Invalide le détail de cette journée spécifique
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.donationDay(dayId),
      });
    },
  });
}

export function useCancelDonorRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dayId: string) =>
      donationDaysApi.cancelDonorRegistration(dayId),
    onSuccess: (_, dayId) => {
      queryClient.invalidateQueries({
        queryKey: ["donation-days", "published"],
      });
      queryClient.invalidateQueries({
        queryKey: ["donation-days", "my-registrations"],
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.donationDay(dayId),
      });
    },
  });
}
