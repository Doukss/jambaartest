import { jambaarApi } from "@/api/jambaar.api";
import { QUERY_KEYS } from "@/constants/query_key";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";


export const useJambaarProfile = () => {
  return useQuery({
    queryKey: QUERY_KEYS.jambaarsProfile,
    queryFn: () => jambaarApi.getMyProfile(),
    staleTime: 30_000,
  });
};

export const useMyBadges = () => {
  return useQuery({
    queryKey: QUERY_KEYS.jambaarssBadges,
    queryFn: () => jambaarApi.getMyBadges(),
    staleTime: 0,
  });
};

export const useLeaderboard = (params?: {
  city?: string;
  district?: string;
}) => {
  return useInfiniteQuery({
    queryKey: [...QUERY_KEYS.leaderboard, params],
    queryFn: ({ pageParam = 1 }) =>
      jambaarApi.getLeaderboard({ ...params, page: pageParam, limit: 20 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.totalPages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    staleTime: 30_000,
  });
};
