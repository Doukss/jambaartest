import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemedStyles } from "@/theme/useTheme";
import { HealthTip, CATEGORY_META } from "@/constants/healthTips";

interface HealthTipCardProps {
  tip: HealthTip;
}

export function HealthTipCard({ tip }: HealthTipCardProps) {
  const cat = CATEGORY_META[tip.category];

  const styles = useThemedStyles((c) => ({
    card: {
      backgroundColor: c.cardBg,
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 2.5,
      borderTopColor: c.cardBorder,
      borderRightColor: c.cardBorder,
      borderBottomColor: c.cardBorder,
      padding: 14,
      marginBottom: 10,
      flexDirection: "row" as const,
      gap: 12,
      alignItems: "flex-start" as const,
    },
    iconWrapper: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      flexShrink: 0,
    },
    content: {
      flex: 1,
      gap: 4,
    },
    badge: {
      alignSelf: "flex-start" as const,
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: 4,
      paddingHorizontal: 7,
      paddingVertical: 2,
      borderRadius: 6,
      borderWidth: 1,
      marginBottom: 3,
    },
    badgeText: {
      fontSize: 9,
      fontWeight: "700" as const,
      letterSpacing: 0.8,
    },
    title: {
      color: c.white,
      fontSize: 12,
      fontWeight: "700" as const,
      lineHeight: 17,
    },
    body: {
      color: c.textMuted,
      fontSize: 11,
      lineHeight: 16,
    },
  }));

  return (
    <View style={[styles.card, { borderLeftColor: cat.accent }]}>
      {/* ── Icône ── */}
      <View style={[styles.iconWrapper, { backgroundColor: cat.bg }]}>
        <Ionicons name={tip.icon as any} size={18} color={cat.accent} />
      </View>

      {/* ── Contenu ── */}
      <View style={styles.content}>
        <View
          style={[
            styles.badge,
            { backgroundColor: cat.bg, borderColor: cat.border },
          ]}
        >
          <Ionicons
            name={CATEGORY_META[tip.category].icon as any}
            size={10}
            color={cat.accentDark}
          />
          <Text style={[styles.badgeText, { color: cat.accentDark }]}>
            {cat.label.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.title}>{tip.title}</Text>
        <Text style={styles.body}>{tip.body}</Text>
      </View>
    </View>
  );
}
