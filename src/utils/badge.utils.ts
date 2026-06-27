import dayjs from "dayjs";
import { Badge } from "@/src/types/domain.types";

export function getDefaultEmoji(badge: Badge): string {
  const name = badge.name.toLowerCase();
  if (
    name.includes("premier") ||
    name.includes("début") ||
    name.includes("bienvenue")
  )
    return "🌟";
  if (
    name.includes("sang") ||
    name.includes("rare") ||
    name.includes("universel")
  )
    return "💎";
  if (
    name.includes("vie") ||
    name.includes("sauve") ||
    name.includes("sauveur")
  )
    return "❤️";
  if (
    name.includes("fidèle") ||
    name.includes("régulier") ||
    name.includes("loyal")
  )
    return "⭐";
  if (
    name.includes("nuit") ||
    name.includes("urgence") ||
    name.includes("veilleur")
  )
    return "🌙";
  if (
    name.includes("ville") ||
    name.includes("local") ||
    name.includes("quartier")
  )
    return "🏙️";
  if (
    name.includes("rapide") ||
    name.includes("éclair") ||
    name.includes("flash")
  )
    return "⚡";
  if (
    name.includes("généreux") ||
    name.includes("don") ||
    name.includes("altruiste")
  )
    return "🎁";
  if (
    name.includes("marathon") ||
    name.includes("cent") ||
    name.includes("dizaine")
  )
    return "🎯";
  if (badge.isSeasonal) return "🎄";
  return "🏅";
}

export function parseCriteria(criteriaJson: string): string {
  try {
    const c = JSON.parse(criteriaJson);
    if (c.minDonations)
      return `${c.minDonations} don${c.minDonations > 1 ? "s" : ""} requis`;
    if (c.exactDonations)
      return `${c.exactDonations} don${c.exactDonations > 1 ? "s" : ""} exact${c.exactDonations > 1 ? "s" : ""}`;
    if (c.minPoints) return `${c.minPoints} pts requis`;
    if (c.bloodType) return `Groupe ${c.bloodType.replace("_", "")} uniquement`;
    return "Critère spécial";
  } catch {
    return "Critère inconnu";
  }
}

export function isNewBadge(badge: Badge): boolean {
  if (!badge.isUnlocked || !badge.earnedAt) return false;
  return dayjs().diff(dayjs(badge.earnedAt), "hour") < 24;
}
