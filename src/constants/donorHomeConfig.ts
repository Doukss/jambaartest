export type FilterType = "ALL" | "VITAL" | "STANDARD";

export const FILTERS: { key: FilterType; label: string }[] = [
  { key: "ALL", label: "Toutes" },
  { key: "VITAL", label: "Vital" },
  { key: "STANDARD", label: "Standard" },
];
