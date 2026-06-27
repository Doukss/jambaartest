import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import dayjs from "dayjs";
import { useColors } from "@/src/theme/useTheme";
import { StatBadge } from "./StatBadge";

export function HeroCard({
  user,
  profile,
  isEligible,
  daysLeft,
  gradeConfig,
  bloodLabel,
  onEditAvatar,
  styles,
}: any) {
  const colors = useColors();

  const donationCount = profile?.donationCount ?? 0;
  const livesSaved = profile?.livesSavedEstimate ?? 0;
  const totalPoints = profile?.totalPoints ?? 0;

  return (
    <View style={styles.heroCard}>
      <LinearGradient
        colors={[...gradeConfig.gradient] as [string, string]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.heroTop}>
        <View style={styles.avatarWrap}>
          <LinearGradient
            colors={[gradeConfig.color + "35", gradeConfig.color + "08"]}
            style={styles.avatarRing}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {user?.avatarUrl ? (
              <Image
                source={{ uri: user.avatarUrl }}
                style={styles.avatarImage}
              />
            ) : (
              <Text style={styles.avatarEmoji}>🩸</Text>
            )}
          </LinearGradient>
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: -4,
              right: -4,
              width: 24,
              height: 24,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
              borderColor: colors.cardBg,
              backgroundColor: gradeConfig.color,
            }}
            onPress={onEditAvatar}
            activeOpacity={0.8}
          >
            <Ionicons name="camera" size={10} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.heroInfo}>
          <Text style={styles.userName}>
            {user?.firstName} {user?.lastName}
          </Text>
          {user?.phone && <Text style={styles.userPhone}>{user.phone}</Text>}
          <View style={styles.pillsRow}>
            <View
              style={[
                styles.pill,
                styles.pillBlood,
                !user?.bloodType && styles.pillEmpty,
              ]}
            >
              <Ionicons
                name="water"
                size={11}
                color={user?.bloodType ? colors.red : colors.textSubtle}
              />
              <Text
                style={[
                  styles.pillText,
                  styles.pillTextBlood,
                  !user?.bloodType && { color: colors.textMuted },
                ]}
              >
                {bloodLabel}
              </Text>
            </View>
            {profile && (
              <View
                style={[
                  styles.pill,
                  {
                    backgroundColor: gradeConfig.color + "14",
                    borderColor: gradeConfig.color + "30",
                  },
                ]}
              >
                <Text style={styles.pillEmoji}>{gradeConfig.icon}</Text>
                <Text style={[styles.pillText, { color: gradeConfig.color }]}>
                  {gradeConfig.label}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* <View style={styles.statsRow}>
        <StatBadge
          icon="water"
          label="Dons"
          value={donationCount}
          color={colors.red}
        />
        <View style={styles.statSep} />
        <StatBadge
          icon="heart"
          label="Vies"
          value={`~${livesSaved}`}
          color={colors.success}
        />
        <View style={styles.statSep} />
        <StatBadge
          icon="star"
          label="Points"
          value={totalPoints.toLocaleString()}
          color={colors.amber}
        />
      </View> */}

      <View
        style={[
          styles.eligRow,
          isEligible ? styles.eligRowGreen : styles.eligRowAmber,
        ]}
      >
        <View
          style={[
            styles.eligDot,
            { backgroundColor: isEligible ? colors.success : colors.amber },
          ]}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.eligTitle,
              { color: isEligible ? colors.success : colors.amber },
            ]}
          >
            {isEligible ? "Éligible au don" : `Repos en cours (${daysLeft}j)`}
          </Text>
          <Text style={styles.eligSub}>
            {isEligible
              ? "Vous pouvez répondre aux alertes"
              : `Prochain don le ${dayjs(profile?.nextEligibilityAt).format("DD MMM YYYY")}`}
          </Text>
        </View>
        <View
          style={[
            styles.eligIcon,
            {
              backgroundColor:
                (isEligible ? colors.success : colors.amber) + "18",
            },
          ]}
        >
          <Ionicons
            name={isEligible ? "checkmark" : "time"}
            size={13}
            color={isEligible ? colors.success : colors.amber}
          />
        </View>
      </View>
    </View>
  );
}
