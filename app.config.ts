import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "jambaartest",
  slug: "jambaartest",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "jambaartest",
  userInterfaceStyle: "automatic",

  // --- NOUVEAU BLOC POUR LES UPDATES ---
  updates: {
    url: "https://u.expo.dev/c21ff117-ea07-4526-a40b-7c813a999389",
  },
  runtimeVersion: {
    policy: "appVersion", // Lie la runtime à la version de l'app (1.0.0)
  },
  // --------------------------------------

  ios: {
    icon: "./assets/expo.icon",
    supportsTablet: true,
    bundleIdentifier: "com.malick221.jambaartest", // <--- AJOUTEZ ICI
  },
  
  android: {
    predictiveBackGestureEnabled: false,
      googleServicesFile: "./google-services.json",

    package: "com.malick221.jambaartest", // <--- AJOUTEZ ICI
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
  },
  
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
    bundler: "metro",
  },
  
  plugins: [
    "expo-router",
    "expo-font",
    "expo-brightness",
    "react-native-edge-to-edge",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#208AEF",
        android: {
          image: "./assets/images/splash-icon.png",
          imageWidth: 76,
        },
      },
    ],
    "expo-secure-store",
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "Jambaar a besoin de votre position pour vous alerter des besoins en sang près de chez vous.",
        locationWhenInUsePermission:
          "Jambaar a besoin de votre position pour vous alerter des besoins en sang près de chez vous.",
      },
    ],
    [
      "expo-notifications",
      {
        color: "#DC1E1E",
        defaultChannel: "default",
        sounds: [],
      },
    ],
    [
      "expo-image-picker",
      {
        photosPermission:
          "Jambaar a besoin d'accéder à votre galerie pour mettre à jour votre photo de profil.",
      },
    ],
    [
      "expo-local-authentication",
      {
        faceIDPermission:
          "Jambaar utilise Face ID pour sécuriser votre connexion.",
      },
    ],
    "@react-native-community/datetimepicker",
  ],
  
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },

  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api",
    socketUrl: process.env.EXPO_PUBLIC_SOCKET_URL || "http://localhost:3000",
    eas: {
      projectId: "c21ff117-ea07-4526-a40b-7c813a999389",
    },
  },
});