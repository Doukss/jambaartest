import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

export function useBottomTabBarHeight() {
  const insets = useSafeAreaInsets();

  const safeBottom = Platform.select({
    ios: insets.bottom,
    android: insets.bottom > 0 ? insets.bottom + 8 : 28,
    default: 8,
  }) ?? 8;

  return 64 + safeBottom;
}