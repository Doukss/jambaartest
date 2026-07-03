import { useColors } from "@/theme/useTheme";
import { Stack } from "expo-router";

export default function AuthLayout() {
  const colors = useColors();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="register-donor" />
      <Stack.Screen name="otp-verify" />
      <Stack.Screen name="reconnect-donor" />
      <Stack.Screen name="success" />
    </Stack>
  );
}
