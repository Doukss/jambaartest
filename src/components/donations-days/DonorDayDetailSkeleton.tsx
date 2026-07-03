import React from "react";
import { View, ScrollView } from "react-native";
import { useColors } from "@/theme/useTheme";

function SkeletonBlock({
  width,
  height,
  borderRadius = 6,
  colors,
}: {
  width: string | number;
  height: number;
  borderRadius?: number;
  colors: any;
}) {
  return (
    <View
      style={{
        width: width as any,
        height,
        borderRadius,
        backgroundColor: colors.cardBorder,
        opacity: 0.6,
      }}
    />
  );
}

export function DonorDayDetailSkeleton() {
  const colors = useColors();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      contentContainerStyle={{ opacity: 0.5 }}
    >
      {/* ── Cover ── */}
      <View
        style={{
          height: 200,
          backgroundColor: colors.cardBorder + "50",
        }}
      />

      <View style={{ padding: 20, gap: 20 }}>
        {/* ── Structure row ── */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: colors.cardBorder,
              opacity: 0.6,
            }}
          />
          <View style={{ flex: 1, gap: 7 }}>
            <SkeletonBlock width="60%" height={12} colors={colors} />
            <SkeletonBlock width="80%" height={10} colors={colors} />
          </View>
        </View>

        {/* ── Titre ── */}
        <View style={{ gap: 8 }}>
          <SkeletonBlock
            width="85%"
            height={18}
            borderRadius={8}
            colors={colors}
          />
          <SkeletonBlock
            width="65%"
            height={18}
            borderRadius={8}
            colors={colors}
          />
        </View>

        {/* ── Description ── */}
        <View style={{ gap: 6 }}>
          <SkeletonBlock width="100%" height={11} colors={colors} />
          <SkeletonBlock width="95%" height={11} colors={colors} />
          <SkeletonBlock width="75%" height={11} colors={colors} />
        </View>

        {/* ── Meta grid (date + heure) ── */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View
            style={{
              flex: 1,
              height: 52,
              borderRadius: 12,
              backgroundColor: colors.cardBorder,
              opacity: 0.5,
            }}
          />
          <View
            style={{
              flex: 1,
              height: 52,
              borderRadius: 12,
              backgroundColor: colors.cardBorder,
              opacity: 0.5,
            }}
          />
        </View>

        {/* ── Blood types pills ── */}
        <View style={{ flexDirection: "row", gap: 8 }}>
          {[40, 36, 44, 36].map((w, i) => (
            <View
              key={i}
              style={{
                width: w,
                height: 28,
                borderRadius: 20,
                backgroundColor: colors.cardBorder,
                opacity: 0.5,
              }}
            />
          ))}
        </View>

        {/* ── Stats row ── */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          {[1, 2, 3].map((i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: 64,
                borderRadius: 14,
                backgroundColor: colors.cardBorder,
                opacity: 0.45,
              }}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
