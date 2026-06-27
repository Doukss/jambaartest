import { useState } from "react";
import { Alert } from "react-native";
import * as Haptics from "expo-haptics";
import { useAuthStore } from "@/src/store/auth.store";
import { useJambaarProfile } from "@/src/hooks/useJambaar";
import { useMyCoupons, useRedeemReward } from "@/src/hooks/useCoupons";
import { useRewards } from "@/src/hooks/useRewards";
import { useSmartBack } from "@/src/hooks/useSmartBack";
import { isNetworkError } from "@/src/utils/error.utils";

type TabType = "catalogue" | "coupons";
type CouponFilter = "ACTIVE" | "USED" | "EXPIRED";

export function useRewardsScreen() {
  const user = useAuthStore((s) => s.user);
  const { data: profileData } = useJambaarProfile();

  const {
    data: rewards,
    isLoading: rewardsLoading,
    isError: isRewardsError,
    error: rewardsError,
    refetch: refetchRewards,
  } = useRewards();
  const {
    data: couponsData,
    isLoading: couponsLoading,
    isError: isCouponsError,
    error: couponsError,
    refetch: refetchCoupons,
  } = useMyCoupons();
  const { mutateAsync: redeemReward, isPending: isRedeeming } =
    useRedeemReward();

  const hasRewardsNetworkError = isRewardsError && isNetworkError(rewardsError);
  const hasCouponsNetworkError = isCouponsError && isNetworkError(couponsError);

  const [activeTab, setActiveTab] = useState<TabType>("catalogue");
  const [couponFilter, setCouponFilter] = useState<CouponFilter>("ACTIVE");

  const totalPoints =
    profileData?.profile.totalPoints ?? user?.jambaarsProfile?.totalPoints ?? 0;
  const filteredCoupons =
    couponsData?.coupons.filter((c) => c.status === couponFilter) ?? [];

  const goBack = useSmartBack({
    defaultRoute: "/(donor)/jambaar",
    routeMap: {
      jambaar: "/(donor)/jambaar",
      profile: "/(donor)/profile",
      settings: "/(donor)/profile/settings",
    },
  });

  const handleRedeem = async (rewardId: string) => {
    Alert.alert(
      "Confirmer l'échange ?",
      "Les points seront débités de votre solde Jambaar et un coupon sera généré.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Échanger",
          style: "destructive",
          onPress: async () => {
            try {
              await Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success,
              );
              await redeemReward(rewardId);
              Alert.alert("Succès", "Votre coupon a été généré !");
            } catch (error: any) {
              const msg =
                error?.response?.data?.message ||
                "Impossible d'échanger vos points.";
              Alert.alert("Erreur", msg);
            }
          },
        },
      ],
    );
  };

  return {
    goBack,
    activeTab,
    setActiveTab,
    couponFilter,
    setCouponFilter,
    rewards,
    rewardsLoading,
    hasRewardsNetworkError,
    refetchRewards,
    couponsData,
    couponsLoading,
    hasCouponsNetworkError,
    refetchCoupons,
    filteredCoupons,
    totalPoints,
    isRedeeming,
    handleRedeem,
  };
}
