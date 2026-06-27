import { useState, useEffect, useRef } from "react";
import { Animated, Alert, Platform } from "react-native";
import * as Haptics from "expo-haptics";
import * as Notifications from "expo-notifications";
import * as Linking from "expo-linking";
import { useAuthStore } from "@/src/store/auth.store";
import { useLocation } from "@/src/hooks/useLocation";
import { useSmartBack } from "@/src/hooks/useSmartBack";
import { usersApi } from "@/src/api/users.api";

export function useSettingsScreen() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { requestAndSync: syncLocation } = useLocation();

  const [pushEnabled, setPushEnabled] = useState(false);
  const [isCheckingPush, setIsCheckingPush] = useState(true);
  const [isSyncingLocation, setIsSyncingLocation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(16)).current;

  const goBack = useSmartBack({
    defaultRoute: "/(donor)/profile",
    routeMap: { profile: "/(donor)/profile" },
  });

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]);
    animation.start();
    return () => animation.stop();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Notifications.getPermissionsAsync();
        setPushEnabled(status === "granted");
      } catch {
      } finally {
        setIsCheckingPush(false);
      }
    })();
  }, []);

  const handleTogglePush = async (value: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (value) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        setPushEnabled(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Alert.alert(
          "Notifications bloquées",
          "Pour recevoir les alertes de don urgentes, activez les notifications dans les paramètres de votre téléphone.",
          [
            { text: "Annuler", style: "cancel" },
            {
              text: "Ouvrir les paramètres",
              onPress: () => Linking.openSettings(),
            },
          ],
        );
      }
    } else {
      Alert.alert(
        "Désactiver les notifications",
        "Vous ne recevrez plus d'alertes urgentes. Vous pouvez les réactiver à tout moment.",
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Désactiver",
            style: "destructive",
            onPress: () => Linking.openSettings(),
          },
        ],
      );
    }
  };

  const handleSyncLocation = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsSyncingLocation(true);
    try {
      await syncLocation();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert(
        "Position mise à jour",
        "Votre localisation a été actualisée avec succès.",
      );
    } catch {
      Alert.alert("Erreur", "Impossible de récupérer votre position actuelle.");
    } finally {
      setIsSyncingLocation(false);
    }
  };

  const confirmDeletion = () => {
    Alert.alert(
      "Confirmation finale",
      "Êtes-vous absolument sûr de vouloir supprimer votre compte Vita-Link ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer définitivement",
          style: "destructive",
          onPress: async () => {
            setIsDeleting(true);
            try {
              await usersApi.deleteAccount();
              await logout("Compte supprimé");
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning,
              );
            } catch (error: any) {
              Alert.alert(
                "Erreur",
                error?.response?.data?.message ||
                  "Impossible de supprimer le compte.",
              );
              setIsDeleting(false);
            }
          },
        },
      ],
    );
  };

  const handleDeleteAccount = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Alert.alert(
      "Supprimer mon compte",
      "Cette action est irréversible. Toutes vos données seront anonymisées et vos points Jambaar perdus.",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Continuer", style: "destructive", onPress: confirmDeletion },
      ],
    );
  };

  return {
    user,
    goBack,
    pushEnabled,
    isCheckingPush,
    isSyncingLocation,
    isDeleting,
    fadeAnim,
    slideAnim,
    handleTogglePush,
    handleSyncLocation,
    handleDeleteAccount,
  };
}
