export const TABS = [
  {
    name: "index",
    label: "Alertes",
    icon: "heart" as const,
    iconOutline: "heart-outline" as const,
  },
  {
    name: "donation-days/index",
    label: "Collectes",
    icon: "calendar" as const,
    iconOutline: "calendar-outline" as const,
  },
  {
    name: "jambaar/index",
    label: "Jambaar",
    icon: "trophy" as const,
    iconOutline: "trophy-outline" as const,
  },
  {
    name: "profile/index",
    label: "Profil",
    icon: "person" as const,
    iconOutline: "person-outline" as const,
  },
] as const;

export const HIDDEN_TABS = [
  "alerts/[id]",
  "qrcode",
  "donations",
  "jambaar/badges",
  "jambaar/leaderboard",
  "jambaar/rewards",
  "profile/edit",
  "profile/eligibility",
  "profile/settings",
  "donation-days/[id]",
];
