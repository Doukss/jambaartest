import { Ionicons } from "@expo/vector-icons";

export const HERO = {
  emoji: "🩸",
  title: "Puis-je donner\ndu sang ?",
  subtitle:
    "Découvrez les critères médicaux et conditions à remplir avant de vous rendre en centre de don.",
};

export const REQUIRED: {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  title: string;
  detail: string;
}[] = [
  {
    icon: "person-outline",
    color: "#1D9E75",
    title: "Âge entre 18 et 70 ans",
    detail:
      "Le don est ouvert aux majeurs jusqu'à 70 ans selon les structures.",
  },
  {
    icon: "scale-outline",
    color: "#1D9E75",
    title: "Poids minimum 50 kg",
    detail:
      "Un poids insuffisant peut causer des malaises lors du prélèvement.",
  },
  {
    icon: "pulse-outline",
    color: "#1D9E75",
    title: "Être en bonne santé",
    detail:
      "Pas de maladie aiguë, pas de fièvre, pas de traitement incompatible.",
  },
  {
    icon: "time-outline",
    color: "#1D9E75",
    title: "Respecter le délai de 56 jours",
    detail:
      "Au moins 8 semaines doivent s'écouler entre deux dons de sang total.",
  },
  {
    icon: "water-outline",
    color: "#1D9E75",
    title: "Être bien hydraté",
    detail: "Buvez au moins 1,5 litre d'eau dans les heures précédant le don.",
  },
  {
    icon: "restaurant-outline",
    color: "#1D9E75",
    title: "Avoir mangé légèrement",
    detail:
      "Évitez les repas gras. Un repas léger 2-3h avant le don est recommandé.",
  },
];

export const CONTRAINDICATIONS: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  detail: string;
  temporary: boolean;
}[] = [
  {
    icon: "medical-outline",
    title: "Prise d'antibiotiques",
    detail: "Attendre 14 jours après la fin du traitement.",
    temporary: true,
  },
  {
    icon: "bandage-outline",
    title: "Chirurgie ou endoscopie récente",
    detail: "Délai de 4 mois minimum après l'intervention.",
    temporary: true,
  },
  {
    icon: "airplane-outline",
    title: "Voyage en zone à risque",
    detail: "Certaines destinations imposent un délai de 6 à 12 mois.",
    temporary: true,
  },
  {
    icon: "sad-outline",
    title: "Tatouage ou piercing récent",
    detail: "Attendre 4 mois après la réalisation.",
    temporary: true,
  },
  {
    icon: "alert-circle-outline",
    title: "Certaines maladies chroniques",
    detail: "Diabète insulino-dépendant, épilepsie active, certains cancers.",
    temporary: false,
  },
  {
    icon: "heart-dislike-outline",
    title: "Maladies cardiovasculaires graves",
    detail: "Contre-indication permanente selon avis médical.",
    temporary: false,
  },
];

export const TIPS: { emoji: string; text: string }[] = [
  { emoji: "💧", text: "Hydratez-vous bien la veille et le jour du don." },
  { emoji: "🥗", text: "Mangez léger, évitez les graisses et l'alcool." },
  { emoji: "😴", text: "Dormez suffisamment la nuit précédente." },
  { emoji: "👕", text: "Portez un vêtement à manches larges." },
  { emoji: "🧘", text: "Restez calme et signalez tout malaise au personnel." },
];
