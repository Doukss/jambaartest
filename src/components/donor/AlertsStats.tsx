import { View, Text } from "react-native";
import { useColors } from "@/src/theme/useTheme";

interface AlertsStatsProps {
  total: number;
  vital: number;
}

export function AlertsStats({ total, vital }: AlertsStatsProps) {
  const colors = useColors();

  if (total === 0) return null;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 14,
        backgroundColor: colors.cardBg,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        paddingVertical: 10,
      }}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ color: colors.white, fontSize: 20, fontWeight: "800" }}>
          {total}
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 1 }}>
          alerte{total > 1 ? "s" : ""}
        </Text>
      </View>
      <View
        style={{ width: 1, height: 28, backgroundColor: colors.cardBorder }}
      />
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text
          style={{
            color: vital > 0 ? colors.red : colors.success,
            fontSize: 20,
            fontWeight: "800",
          }}
        >
          {vital}
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 1 }}>
          vitale{vital > 1 ? "s" : ""}
        </Text>
      </View>
    </View>
  );
}
