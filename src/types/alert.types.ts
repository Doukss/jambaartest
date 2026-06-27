import {
  AlertResponseStatus,
  AlertStatus,
  BloodType,
  ServiceUnit,
  UrgencyLevel,
} from "./shared.types";

// ─── Alert ────────────────────────────────────────────────────

export interface AlertStructure {
  id: string;
  name: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
}

export const AlertOriginEnum = {
  CNTS_DIRECT: "CNTS_DIRECT",
  CNTS_ESCALATION: "CNTS_ESCALATION",
  HOSPITAL_DIRECT: "HOSPITAL_DIRECT",
} as const;
export type AlertOrigin =
  (typeof AlertOriginEnum)[keyof typeof AlertOriginEnum];

export interface Alert {
  id: string;
  bloodType: BloodType;
  quantityNeeded: number;
  quantityConfirmed: number;
  urgencyLevel: UrgencyLevel;
  status: AlertStatus;
  serviceUnit: ServiceUnit;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  radiusKm: number;
  expiresAt: string | null;
  createdAt: string;

  origin: AlertOrigin;
  bloodRequestId: string | null;

  healthStructure: AlertStructure;
  distance_km?: number;
}

// ─── Alert Response ───────────────────────────────────────────

// On garde ce type car il est utilisé dans ActiveEngagement
export interface AlertResponse {
  id: string;
  status: AlertResponseStatus;
  etaMinutes: number | null;
  respondedAt: string;
  arrivedAt: string | null;
  qrCode: string | null;
}

// ─── Payloads ─────────────────────────────────────────────────

export interface ConfirmAlertPayload {
  etaMinutes?: number;
}

// ─── Réponses API ─────────────────────────────────────────────

export interface ConfirmAlertResponse {
  message: string;
  qrCode: string;
  isQuotaReached: boolean;
}

// ─── Engagement Actif ─────────────────────────────────────────

export interface ActiveEngagement {
  id: string;
  qrCode: string;
  etaMinutes: number | null;
  alert: {
    id: string;
    bloodType: BloodType;
    urgencyLevel: UrgencyLevel;
    origin: AlertOrigin;
    healthStructure: AlertStructure;
  };
}
