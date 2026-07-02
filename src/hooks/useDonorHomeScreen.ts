import { useState, useCallback, useEffect } from "react";
import { Alert as RNAlert } from "react-native";
import { Href, useRouter } from "expo-router";
import { useActiveEngagement, useCancelConfirmation, useNearbyAlerts } from "./useAlerts";
import { useUpdateAvailability } from "./useAvailability";
import { FilterType } from "@/constants/donorHomeConfig";
import { getPendingQr, PendingQr } from "@/utils/qr.utils";
import { useAuthStore } from "@/store/auth.store";
import { useBloodTypeBanner } from "./usebloodtypebanner";
import { useIsEligible } from "./useAuthStore";
import { Alert } from "@/types/alert.types";


export function useDonorHomeScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const { showBanner } = useBloodTypeBanner();
  const { isEligible, daysLeft } = useIsEligible();

  const {
    data: alerts,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useNearbyAlerts(isEligible);
  const { mutate: toggleAvailability, isPending: isTogglingAvail } =
    useUpdateAvailability();
  const { data: activeEngagement } = useActiveEngagement();
  const { mutateAsync: cancelConfirmation } = useCancelConfirmation();

  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const [localQr, setLocalQr] = useState<PendingQr | null>(null);
  const [isLocalExpired, setIsLocalExpired] = useState(false);

  // Gestion du QR Local expiré
  useEffect(() => {
    const loadLocalQr = async () => {
      const qr = await getPendingQr();
      if (qr) {
        setLocalQr(qr);
        setIsLocalExpired(false);
      } else {
        setLocalQr(null);
        setIsLocalExpired(!!(activeEngagement?.alert?.id && user?.id));
      }
    };
    loadLocalQr();
  }, [activeEngagement, user?.id]);

  const displayedEngagement = activeEngagement
    ? { type: "active" as const, data: activeEngagement }
    : localQr
      ? { type: "expired" as const, data: localQr }
      : null;

  const filteredAlerts: Alert[] =
    alerts?.filter(
      (a: Alert) => activeFilter === "ALL" || a.urgencyLevel === activeFilter,
    ) ?? [];
  const vitalCount =
    alerts?.filter((a: Alert) => a.urgencyLevel === "VITAL").length ?? 0;

  // ── Actions ──
  const handleOpenQrCode = useCallback(
    (qrCode: string, alertId: string, isExpired: boolean, origin: string) =>
      router.push({
        pathname: "/(donor)/qrcode" as any,
        params: {
          qrCode,
          alertId,
          isExpired: isExpired ? "true" : "false",
          origin,
        },
      }),
    [router],
  );

  const handleAlertPress = useCallback(
    (alertId: string) => router.push(`/(donor)/alerts/${alertId}` as Href),
    [router],
  );

  const handleCancelDirect = async (alertId: string) => {
    RNAlert.alert(
      "Annuler cet engagement ?",
      "Votre pass a expiré. Si vous n'êtes pas à l'hôpital, annulez pour redevenir disponible.",
      [
        { text: "Non", style: "cancel" },
        {
          text: "Oui, annuler",
          style: "destructive",
          onPress: async () => {
            await cancelConfirmation(alertId);
            setIsLocalExpired(false);
          },
        },
      ],
    );
  };

  const handleQuickConfirm = useCallback(
    (alertId: string) => router.push(`/(donor)/alerts/${alertId}` as Href),
    [router],
  );

  const handleGoToEligibility = useCallback(
    () => router.push("/(donor)/profile/eligibility" as Href),
    [router],
  );

  return {
    user,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    isEligible,
    daysLeft,
    showBanner,
    isTogglingAvail,
    activeFilter,
    setActiveFilter,
    toggleAvailability,
    displayedEngagement,
    isLocalExpired,
    activeEngagement,
    hasAlertsData: alerts !== undefined,
    alerts: filteredAlerts,
    vitalCount,
    totalAlerts: alerts?.length ?? 0,
    handleOpenQrCode,
    handleAlertPress,
    handleCancelDirect,
    handleQuickConfirm,
    handleGoToEligibility,
  };
}
