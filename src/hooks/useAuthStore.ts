import { useAuthStore } from "@/src/store/auth.store";
import dayjs from "dayjs";
import logger from "../utils/logger.utils";
import { useEffect, useState } from "react";

const RECHECK_INTERVAL_MS = 60_000;

export const useIsEligible = () => {
  const profile = useAuthStore((state) => state.user?.jambaarsProfile);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), RECHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  if (!profile) {
    logger.warn(
      "useIsEligible: Aucun profil Jambaar trouvé. Considéré comme éligible par défaut.",
    );
    return { isEligible: true, daysLeft: 0, nextDate: null };
  }

  const nextDate = profile.nextEligibilityAt
    ? new Date(profile.nextEligibilityAt)
    : null;

  if (!nextDate) {
    logger.warn(
      "useIsEligible: nextEligibilityAt est vide/null. Considéré comme éligible par défaut.",
    );
  }

  const isEligible = !nextDate || nextDate <= now;

  const daysLeft =
    !isEligible && nextDate
      ? Math.max(0, dayjs(nextDate).diff(dayjs(now), "day"))
      : 0;

  return { isEligible, daysLeft, nextDate };
};

// ─── Sélecteurs basiques ──────────────────────────────────────
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useAuthIsLoading = () => useAuthStore((state) => state.isLoading);

// ─── Sélecteurs de Rôle ───────────────────────────────────────
export const useUserRole = () => useAuthStore((state) => state.user?.role);

export const useIsDonor = () =>
  useAuthStore((state) => state.user?.role === "DONOR");

// ─── Sélecteurs spécifiques Donneur ──────────────────────────
export const useUserBloodType = () =>
  useAuthStore((state) => state.user?.bloodType);

export const useUserJambaarProfile = () =>
  useAuthStore((state) => state.user?.jambaarsProfile);

// ─── Actions ──────────────────────────────────────────────────
export const useAuthActions = () =>
  useAuthStore((state) => ({
    setUser: state.setUser,
    updateUser: state.updateUser,
    logout: state.logout,
    initialize: state.initialize,
  }));
