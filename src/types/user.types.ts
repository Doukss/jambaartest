import { BloodType, DonorGrade, Gender, Role } from "./shared.types";

// ─── Sous-interfaces ──────────────────────────────────────────

export interface JambaarsProfile {
  totalPoints: number;
  currentGrade: DonorGrade;
  donationCount: number;
  livesSavedEstimate: number;
  lastDonationAt: string | null;
  nextEligibilityAt: string | null;
  city: string | null;
  district: string | null;
}

// ─── User ─────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string | null;
  phone: string;
  firstName: string;
  lastName: string;
  role: Role;
  gender: Gender | null;
  dateOfBirth: string | null;
  avatarUrl: string | null;
  bloodType: BloodType | null;
  isAvailable: boolean;
  isActive: boolean;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  jambaarsProfile: JambaarsProfile | null;
}

// ─── Payloads ─────────────────────────────────────────────────

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  bloodType?: BloodType;
  dateOfBirth?: string;
}

export interface UpdateLocationPayload {
  latitude: number;
  longitude: number;
}
