// ─── Enums partagés ───────────────────────────────────────────

export const RoleEnum = {
  DONOR: "DONOR",
} as const;
export type Role = "DONOR"; // Seul le rôle DONOR existe sur cette app

export const GenderEnum = {
  MALE: "MALE",
  FEMALE: "FEMALE",
} as const;
export type Gender = (typeof GenderEnum)[keyof typeof GenderEnum];

export const AlertOriginEnum = {
  CNTS_DIRECT: "CNTS_DIRECT",
  CNTS_ESCALATION: "CNTS_ESCALATION",
  HOSPITAL_DIRECT: "HOSPITAL_DIRECT",
} as const;
export type AlertOrigin =
  (typeof AlertOriginEnum)[keyof typeof AlertOriginEnum];

export const BloodTypeEnum = {
  A_POS: "A_POS",
  A_NEG: "A_NEG",
  B_POS: "B_POS",
  B_NEG: "B_NEG",
  AB_POS: "AB_POS",
  AB_NEG: "AB_NEG",
  O_POS: "O_POS",
  O_NEG: "O_NEG",
} as const;
export type BloodType = (typeof BloodTypeEnum)[keyof typeof BloodTypeEnum];

export const DonorGradeEnum = {
  ASPIRANT: "ASPIRANT",
  SENTINELLE: "SENTINELLE",
  AMBASSADEUR: "AMBASSADEUR",
} as const;
export type DonorGrade = (typeof DonorGradeEnum)[keyof typeof DonorGradeEnum];

export const UrgencyLevelEnum = {
  VITAL: "VITAL",
  STANDARD: "STANDARD",
} as const;
export type UrgencyLevel =
  (typeof UrgencyLevelEnum)[keyof typeof UrgencyLevelEnum];

export const AlertStatusEnum = {
  ACTIVE: "ACTIVE",
  QUOTA_REACHED: "QUOTA_REACHED",
  EXPIRED: "EXPIRED",
  CANCELLED: "CANCELLED",
} as const;
export type AlertStatus =
  (typeof AlertStatusEnum)[keyof typeof AlertStatusEnum];

export const AlertResponseStatusEnum = {
  CONFIRMED: "CONFIRMED",
  DECLINED: "DECLINED",
  ARRIVED: "ARRIVED",
  NO_SHOW: "NO_SHOW",
  CANCELLED: "CANCELLED",
} as const;
export type AlertResponseStatus =
  (typeof AlertResponseStatusEnum)[keyof typeof AlertResponseStatusEnum];

export const ServiceUnitEnum = {
  EMERGENCY_ROOM: "EMERGENCY_ROOM",
  OPERATING_ROOM: "OPERATING_ROOM",
  MATERNITY: "MATERNITY",
  GENERAL: "GENERAL",
  PEDIATRICS: "PEDIATRICS",
} as const;
export type ServiceUnit =
  (typeof ServiceUnitEnum)[keyof typeof ServiceUnitEnum];

export const CouponStatusEnum = {
  ACTIVE: "ACTIVE",
  USED: "USED",
  EXPIRED: "EXPIRED",
  CANCELLED: "CANCELLED",
} as const;
export type CouponStatus =
  (typeof CouponStatusEnum)[keyof typeof CouponStatusEnum];

// ─── Pagination ───────────────────────────────────────────────

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}
