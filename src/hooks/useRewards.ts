import { rewardsApi } from "@/api/rewards.api";
import { QUERY_KEYS } from "@/constants/query_key";
import { useQuery } from "@tanstack/react-query";


export const useRewards = () => {
  return useQuery({
    queryKey: QUERY_KEYS.rewards,
    queryFn: () => rewardsApi.getRewards(),
    staleTime: 60_000,
  });
};
