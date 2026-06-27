import { useState, useEffect, useCallback, useRef } from "react";
import { useVerifyOtp, useResendOtp } from "@/src/hooks/useAuth";
import { Animated } from "react-native";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 120;
const OTP_EXPIRY = 600;

export const useOtpVerify = (email: string) => {
  const { mutateAsync: verifyOtp, isPending } = useVerifyOtp();
  const { mutateAsync: resendOtp, isPending: isResending } = useResendOtp();

  const [code, setCode] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [hasError, setHasError] = useState(false);
  const [expiryTimer, setExpiryTimer] = useState(OTP_EXPIRY);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const shakeAnim = useRef(new Animated.Value(0)).current;

  // --- Logique de Timer réutilisable ---
  useEffect(() => {
    if (expiryTimer <= 0) return;
    const id = setInterval(() => setExpiryTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [expiryTimer]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [resendTimer]);

  // --- Animation Shake ---
  const triggerShake = useCallback(() => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 8,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -8,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, [shakeAnim]);

  // --- Vérification ---
  const handleVerify = useCallback(async () => {
    const otpCode = code.join("");
    if (otpCode.length < OTP_LENGTH) {
      setHasError(true);
      triggerShake();
      return;
    }

    setHasError(false);
    try {
      await verifyOtp({ email, code: otpCode });
    } catch {
      setHasError(true);
      triggerShake();
      setCode(Array(OTP_LENGTH).fill(""));
    }
  }, [code, email, triggerShake, verifyOtp]);

  // --- Renvoi ---
  const handleResend = useCallback(async () => {
    if (resendTimer > 0 || isResending) return;
    try {
      await resendOtp(email);
      setResendTimer(RESEND_COOLDOWN);
      setExpiryTimer(OTP_EXPIRY);
      setCode(Array(OTP_LENGTH).fill(""));
      setHasError(false);
    } catch {}
  }, [resendTimer, isResending, resendOtp, email]);

  const updateCode = useCallback(
    (newCode: string[]) => {
      setCode(newCode);
      if (hasError) setHasError(false);
    },
    [hasError],
  );

  return {
    code,
    updateCode,
    hasError,
    isExpired: expiryTimer <= 0,
    expiryTimer,
    resendTimer,
    isPending,
    isResending,
    shakeAnim,
    handleVerify,
    handleResend,
  };
};
