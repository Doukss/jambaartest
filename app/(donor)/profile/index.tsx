import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useProfileScreen } from "@/src/hooks/useProfileScreen";
import { useProfileStyles } from "@/src/styles/useProfileStyles";
import { ProfileRow } from "@/src/components/profile/ProfileRow";
import { HeroCard } from "@/src/components/profile/HeroCard";

export default function ProfileScreen() {
  const {
    router,
    user,
    profile,
    isEligible,
    daysLeft,
    isLoggingOut,
    fadeAnim,
    slideAnim,
    toggleAvailability,
    handleLogout,
    handleDelete,
    gradeConfig,
    bloodLabel,
  } = useProfileScreen();
  const { styles } = useProfileStyles();

  const editRoute = "/(donor)/profile/edit?from=profile" as Href;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Header ── */}
        <Animated.View
          style={[
            styles.header,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.headerTitle}>
            Mon <Text style={{ color: gradeConfig.color }}>Profil</Text>
          </Text>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => router.push(editRoute)}
            activeOpacity={0.7}
          >
            <Ionicons name="create-outline" size={17} color={"#888"} />
          </TouchableOpacity>
        </Animated.View>

        {/* ── Hero Card ── */}
        <Animated.View
          style={[
            styles.heroCard,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <HeroCard
            user={user}
            profile={profile}
            isEligible={isEligible}
            daysLeft={daysLeft}
            gradeConfig={gradeConfig}
            bloodLabel={bloodLabel}
            onEditAvatar={() => router.push(editRoute)}
            styles={styles}
          />
        </Animated.View>

        {/* ── Disponibilité ── */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>DISPONIBILITÉ</Text>
          <View style={[styles.card, !isEligible && { opacity: 0.55 }]}>
            <View style={styles.availRow}>
              <View
                style={[
                  styles.availIconWrap,
                  {
                    backgroundColor:
                      isEligible && user?.isAvailable ? "#1D9E7514" : "#2A2A2A",
                  },
                ]}
              >
                <Ionicons
                  name={
                    isEligible && user?.isAvailable ? "pulse" : "pulse-outline"
                  }
                  size={17}
                  color={isEligible && user?.isAvailable ? "#1D9E75" : "#888"}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{ color: "#FFF", fontSize: 14, fontWeight: "500" }}
                >
                  {!isEligible ? "Période de repos" : "Disponible pour donner"}
                </Text>
                <Text style={styles.rowHint}>
                  {!isEligible
                    ? `Éligible dans ${daysLeft} jour${daysLeft > 1 ? "s" : ""}`
                    : user?.isAvailable
                      ? "Alertes activées"
                      : "Alertes en pause"}
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#2A2A2A", true: "#1D9E75" }}
                thumbColor={"#FFF"}
                value={isEligible && (user?.isAvailable ?? true)}
                onValueChange={(val) => toggleAvailability(val)}
                disabled={!isEligible}
                ios_backgroundColor="#2A2A2A"
              />
            </View>
          </View>
        </Animated.View>

        {/* ── Mon Compte ── */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>MON COMPTE</Text>
          <View style={styles.card}>
            <ProfileRow
              icon="call-outline"
              label="Téléphone"
              value={user?.phone}
              onPress={() => router.push(editRoute)}
            />
            <View style={styles.sep} />
            <ProfileRow
              icon="mail-outline"
              label="Email"
              value={user?.email ?? "Non renseigné"}
              onPress={() => router.push(editRoute)}
            />
            <View style={styles.sep} />
            <ProfileRow
              icon="water-outline"
              label="Groupe sanguin"
              value={bloodLabel}
              valueColor="#DC1E1E"
              onPress={() => router.push(editRoute)}
            />
          </View>
        </Animated.View>

        {/* ── Plus ── */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>PLUS</Text>
          <View style={styles.card}>
            <ProfileRow
              icon="time-outline"
              label="Historique des dons"
              onPress={() =>
                router.push("/(donor)/donations?from=profile" as Href)
              }
            />
            <View style={styles.sep} />
            <ProfileRow
              icon="settings-outline"
              label="Paramètres"
              onPress={() =>
                router.push("/(donor)/profile/settings?from=profile" as Href)
              }
            />
            <View style={styles.sep} />
            <ProfileRow
              icon="help-circle-outline"
              label="Aide & Support"
              onPress={() => {}}
            />
          </View>
          <View style={styles.sep} />
          <ProfileRow
            icon="checkmark-circle-outline"
            label="Critères d'éligibilité"
            valueColor="#1D9E75"
            onPress={() => router.push("/(donor)/profile/eligibility" as Href)}
          />
        </Animated.View>

        {/* ── Actions ── */}
        <Animated.View style={[styles.actions, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={handleLogout}
            activeOpacity={0.7}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <ActivityIndicator color="#DC1E1E" />
            ) : (
              <>
                <Ionicons name="log-out-outline" size={17} color="#DC1E1E" />
                <Text style={styles.logoutText}>Déconnexion</Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            activeOpacity={0.7}
            style={{ paddingVertical: 10 }}
          >
            <Text style={styles.deleteText}>Supprimer mon compte</Text>
          </TouchableOpacity>
          <Text style={styles.versionText}>Vita-Link v1.0.0</Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
