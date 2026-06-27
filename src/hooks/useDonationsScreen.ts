import { useCallback } from "react";
import { useRouter } from "expo-router";
import { useSmartBack } from "./useSmartBack";
import { useMyDonations } from "./useDonations";
import { isNetworkError } from "@/utils/error.utils";
import { Donation } from "@/types/domain.types";


export function useDonationsScreen() {
  const router = useRouter(); // Utile si tu ajoutes des navigations futures
  const goBack = useSmartBack({
    defaultRoute: "/(donor)/profile",
    routeMap: { profile: "/(donor)/profile" },
  });

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useMyDonations();

  // Aplatissement des pages pour la FlatList
  const donations: Donation[] =
    data?.pages.flatMap((page) => page.donations) ?? [];

  // Erreur réseau
  const hasNetworkError = isError && isNetworkError(error);

  // Infinite scroll
  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    donations,
    isLoading,
    isError,
    hasNetworkError,
    error,
    refetch,
    isRefetching,
    handleLoadMore,
    isFetchingNextPage,
    goBack,
  };
}
