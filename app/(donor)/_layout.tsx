import { View } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { InAppAlert } from "@/src/components/ui/InAppAlert";
import { useDonorLayout } from "@/src/hooks/useDonorLayout";
import { useTabStyles } from "@/src/hooks/useTabStyles";
import { TABS, HIDDEN_TABS } from "@/src/constants/donorTabs.config";

export default function DonorLayout() {
  const { isAuthorized, inAppAlert, setInAppAlert, safeBottom, tabBarHeight } =
    useDonorLayout();

  const { styles, colors } = useTabStyles(tabBarHeight, safeBottom);

  if (!isAuthorized) return null;

  return (
    <View style={styles.container}>
      {/* ── Alerte in-app ─────────────────────────────────────────────────── */}
      {inAppAlert && (
        <View style={styles.alertOverlay} pointerEvents="box-none">
          <InAppAlert
            notification={inAppAlert}
            onDismiss={() => setInAppAlert(null)}
          />
        </View>
      )}

      {/* ── Tab navigator ─────────────────────────────────────────────────── */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: [
            styles.tabBar,
            { height: tabBarHeight, paddingBottom: safeBottom },
          ],
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarLabelStyle: styles.tabLabel,
          tabBarItemStyle: styles.tabItem,
          tabBarBackground: () => <View style={styles.tabBarBg} />,
        }}
      >
        {/* Onglets principaux */}
        {TABS.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.label,
              tabBarIcon: ({ focused, color }) => (
                <Ionicons
                  name={focused ? tab.icon : tab.iconOutline}
                  size={22}
                  color={color}
                />
              ),
            }}
          />
        ))}

        {/* Routes cachées */}
        {HIDDEN_TABS.map((name) => (
          <Tabs.Screen key={name} name={name} options={{ href: null }} />
        ))}
      </Tabs>
    </View>
  );
}
