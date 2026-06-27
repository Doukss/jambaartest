import { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/src/store/auth.store";
import { useLeaderboard } from "@/src/hooks/useJambaar";
import { useSmartBack } from "@/src/hooks/useSmartBack";
import { isNetworkError } from "@/src/utils/error.utils";
import { ScopeType } from "@/src/constants/jambaarConfig";

export function useLeaderboardScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [scope, setScope] = useState<ScopeType>("global");

  const goBack = useSmartBack({
    defaultRoute: "/(donor)/jambaar",
    routeMap: {
      jambaar: "/(donor)/jambaar",
      profile: "/(donor)/profile",
      home: "/(donor)",
    },
  });

  const queryParams = {
    city:
      scope === "city" ? (user?.jambaarsProfile?.city ?? undefined) : undefined,
    district:
      scope === "district"
        ? (user?.jambaarsProfile?.district ?? undefined)
        : undefined,
  };

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLeaderboard(queryParams);

  // Aplatissement des pages (infinite scroll)
  const leaderboard = data?.pages.flatMap((p) => p.leaderboard) ?? [];
  const myRank = data?.pages[0]?.myRank ?? null;
  const scopeLabel = data?.pages[0]?.scope ?? "Global";

  const hasNetworkError = isError && isNetworkError(error);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    user,
    scope,
    setScope,
    goBack,
    leaderboard,
    myRank,
    scopeLabel,
    data,
    isLoading,
    hasNetworkError,
    refetch,
    isFetchingNextPage,
    handleLoadMore,
  };
}
