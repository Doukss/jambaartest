// ─── Types ────────────────────────────────────────────────────
export type TipCategory =
  | "HYDRATION"
  | "NUTRITION"
  | "SLEEP"
  | "ACTIVITY"
  | "WELLBEING";

export interface HealthTip {
  id: string;
  category: TipCategory;
  icon: string; // Ionicons name
  title: string;
  body: string;
}

// ─── Palette par catégorie ─────────────────────────────────────
// accent   = couleur principale (icône, bordure gauche, texte badge)
// bg       = fond icône et fond badge (accent + opacité)
// border   = bordure badge (accent + opacité réduite)
// accentDark = ton plus sombre pour le texte du badge (lisibilité)
export const CATEGORY_META: Record<
  TipCategory,
  {
    label: string;
    icon: string;
    accent: string;
    accentDark: string;
    bg: string;
    border: string;
  }
> = {
  HYDRATION: {
    label: "Hydratation",
    icon: "water-outline",
    accent: "#378ADD",
    accentDark: "#185FA5",
    bg: "rgba(55,138,221,0.10)",
    border: "rgba(55,138,221,0.20)",
  },
  NUTRITION: {
    label: "Alimentation",
    icon: "nutrition-outline",
    accent: "#639922",
    accentDark: "#3B6D11",
    bg: "rgba(99,153,34,0.10)",
    border: "rgba(99,153,34,0.20)",
  },
  SLEEP: {
    label: "Sommeil",
    icon: "moon-outline",
    accent: "#534AB7",
    accentDark: "#3C3489",
    bg: "rgba(83,74,183,0.10)",
    border: "rgba(83,74,183,0.20)",
  },
  ACTIVITY: {
    label: "Activité",
    icon: "walk-outline",
    accent: "#BA7517",
    accentDark: "#854F0B",
    bg: "rgba(186,117,23,0.10)",
    border: "rgba(186,117,23,0.20)",
  },
  WELLBEING: {
    label: "Bien-être",
    icon: "heart-outline",
    accent: "#A32D2D",
    accentDark: "#791F1F",
    bg: "rgba(163,45,45,0.08)",
    border: "rgba(163,45,45,0.18)",
  },
};

// ─── Tips ──────────────────────────────────────────────────────
export const HEALTH_TIPS: HealthTip[] = [
  // ── Hydratation ──
  {
    id: "hyd-1",
    category: "HYDRATION",
    icon: "water-outline",
    title: "Buvez 2 à 3 litres par jour",
    body: "Après un don, votre corps reconstitue le volume sanguin. Privilégiez l'eau plate, les bouillons et les jus de fruits naturels.",
  },
  {
    id: "hyd-2",
    category: "HYDRATION",
    icon: "cafe-outline",
    title: "Limitez la caféine",
    body: "Le café et le thé sont diurétiques. Réduisez votre consommation à 1 tasse par jour maximum pendant votre récupération.",
  },

  // ── Nutrition ──
  {
    id: "nut-1",
    category: "NUTRITION",
    icon: "nutrition-outline",
    title: "Misez sur le fer",
    body: "Lentilles, épinards, foie de poulet, haricots rouges — essentiels pour reconstituer vos globules rouges cette semaine.",
  },
  {
    id: "nut-2",
    category: "NUTRITION",
    icon: "leaf-outline",
    title: "Vitamine C et absorption du fer",
    body: "La vitamine C multiplie par 3 l'absorption du fer végétal. Associez vos légumineuses à du citron, de la tomate ou du poivron.",
  },
  {
    id: "nut-3",
    category: "NUTRITION",
    icon: "egg-outline",
    title: "Protéines pour la régénération",
    body: "Votre corps reconstruit les protéines plasmatiques après un don. Œufs, poisson, poulet et légumineuses sont vos meilleurs alliés.",
  },

  // ── Sommeil ──
  {
    id: "slp-1",
    category: "SLEEP",
    icon: "moon-outline",
    title: "8 heures de sommeil minimum",
    body: "C'est pendant le sommeil profond que votre moelle osseuse produit de nouveaux globules rouges. Reposez-vous ces 10 premiers jours.",
  },
  {
    id: "slp-2",
    category: "SLEEP",
    icon: "phone-portrait-outline",
    title: "Éteignez les écrans avant de dormir",
    body: "La lumière bleue perturbe la mélatonine et réduit la qualité du sommeil réparateur. Éteignez les écrans 30 minutes avant de vous coucher.",
  },

  // ── Activité ──
  {
    id: "act-1",
    category: "ACTIVITY",
    icon: "walk-outline",
    title: "Marche légère uniquement",
    body: "Évitez tout effort intense pendant 48h après un don. Une marche de 20 à 30 minutes par jour favorise la circulation sans fatiguer.",
  },
  {
    id: "act-2",
    category: "ACTIVITY",
    icon: "barbell-outline",
    title: "Pas de sport intensif cette semaine",
    body: "Musculation, course, sports de contact — attendez 7 jours minimum. Votre corps consacre son énergie à régénérer votre sang.",
  },

  // ── Bien-être ──
  {
    id: "wel-1",
    category: "WELLBEING",
    icon: "sunny-outline",
    title: "Gérez votre stress",
    body: "Le stress élève le cortisol et ralentit la récupération. Quelques minutes de respiration profonde chaque matin font une vraie différence.",
  },
  {
    id: "wel-2",
    category: "WELLBEING",
    icon: "people-outline",
    title: "Votre don a déjà sauvé des vies",
    body: "Un don de sang peut sauver jusqu'à 3 personnes. Pendant que vous récupérez, votre geste est en train de changer le cours d'une vie.",
  },
  {
    id: "wel-3",
    category: "WELLBEING",
    icon: "shield-checkmark-outline",
    title: "Évitez l'alcool et le tabac",
    body: "L'alcool dilate les vaisseaux et peut provoquer des vertiges. Le tabac réduit l'oxygénation du sang en pleine reconstruction.",
  },
];

// ─── Helpers ───────────────────────────────────────────────────
/** Rotation stable basée sur les jours restants pour varier le contenu */
export function getShuffledTips(daysLeft: number): HealthTip[] {
  const offset = daysLeft % HEALTH_TIPS.length;
  return [...HEALTH_TIPS.slice(offset), ...HEALTH_TIPS.slice(0, offset)];
}
