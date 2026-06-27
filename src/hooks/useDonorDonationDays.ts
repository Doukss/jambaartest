import { useRouter } from "expo-router";
import { usePublishedDays } from "./useDonationDays";
import { isNetworkError } from "@/utils/error.utils";


export function useDonorDonationDays() {
  const router = useRouter();
  const { data, isLoading, isRefetching, refetch, isError, error } =
    usePublishedDays();

  const days = data?.data ?? [];
  const hasNetworkError = isError && !days.length && isNetworkError(error);

  const handlePressCard = (id: string) => {
    router.push(`/(donor)/donation-days/${id}?from=donationDays` as any);
  };

  return {
    days,
    isLoading,
    isRefetching,
    refetch,
    isError,
    error,
    hasNetworkError,
    handlePressCard,
  };
}
