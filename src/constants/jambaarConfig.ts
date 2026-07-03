import { DonorGrade } from "@/types/shared.types";
import { AppColors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";

export const GRADE_CONFIG: Record<
  DonorGrade,
  { icon: string; label: string; colorKey: keyof AppColors; glowAlpha: string }
> = {
  ASPIRANT: {
    icon: "🌱",
    label: "Aspirant",
    colorKey: "success",
    glowAlpha: "26",
  },
  SENTINELLE: {
    icon: "⚔️",
    label: "Sentinelle",
    colorKey: "amber",
    glowAlpha: "26",
  },
  AMBASSADEUR: {
    icon: "🦁",
    label: "Ambassadeur",
    colorKey: "red",
    glowAlpha: "26",
  },
};

export type ScopeType = "global" | "city" | "district";

export const SCOPES: {
  key: ScopeType;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { key: "global", label: "Global", icon: "globe-outline" },
  { key: "city", label: "Ma Ville", icon: "location-outline" },
  { key: "district", label: "Quartier", icon: "home-outline" },
];

export const GRADE_EMOJI: Record<DonorGrade, string> = {
  ASPIRANT: "🌱",
  SENTINELLE: "⚔️",
  AMBASSADEUR: "🦁",
};
