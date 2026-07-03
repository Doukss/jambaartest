import { View } from "react-native";
import { useColors } from "@/theme/useTheme";

export function SkeletonCard() {
  const colors = useColors();

  return (
    <View
      style={{
        backgroundColor: colors.cardBg,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        padding: 14,
        marginBottom: 12,
        opacity: 0.6,
      }}
    >
      <View style={{ flexDirection: "row", gap: 14, marginBottom: 10 }}>
        <View
          style={{
            width: 58,
            height: 58,
            borderRadius: 14,
            backgroundColor: colors.cardBorder,
          }}
        />
        <View style={{ flex: 1, gap: 8, justifyContent: "center" }}>
          <View
            style={{
              height: 10,
              borderRadius: 5,
              backgroundColor: colors.cardBorder,
              width: "90%",
            }}
          />
          <View
            style={{
              height: 10,
              borderRadius: 5,
              backgroundColor: colors.cardBorder,
              width: "60%",
              opacity: 0.4,
            }}
          />
          <View
            style={{
              height: 10,
              borderRadius: 5,
              backgroundColor: colors.cardBorder,
              width: "80%",
              opacity: 0.3,
            }}
          />
        </View>
      </View>
      <View
        style={{
          height: 8,
          borderRadius: 4,
          backgroundColor: colors.cardBorder,
          marginTop: 4,
        }}
      />
    </View>
  );
}
