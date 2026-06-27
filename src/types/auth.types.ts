import { BloodType, Gender, Role } from "./shared.types";
import { User } from "./user.types";

// ─── Tokens ───────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

// ─── Réponses API ─────────────────────────────────────────────

export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RegisterDonorResponse {
  message: string;
  email: string;
  requiresEmail?: boolean;
  phone?: string;
}

// ─── Payloads (ce qu'on envoie à l'API) ──────────────────────

export interface RegisterDonorPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  bloodType: BloodType;
  gender: Gender;
  dateOfBirth?: string;
}

export interface VerifyOtpPayload {
  email: string;
  code: string;
}

export interface SendOtpPayload {
  email: string;
}
