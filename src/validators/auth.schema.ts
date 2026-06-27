import { z } from "zod";

export const bloodTypeValues = [
  "A_POS",
  "A_NEG",
  "B_POS",
  "B_NEG",
  "AB_POS",
  "AB_NEG",
  "O_POS",
  "O_NEG",
] as const;

export const phoneRegex = /^\+?[1-9]\d{7,14}$/;

// ─── Register Donor ───────────────────────────────────────────

export const donorStep1Schema = z.object({
  firstName: z.string().trim().min(2, "Prénom trop court (min 2 caractères)"),
  lastName: z.string().trim().min(2, "Nom trop court (min 2 caractères)"),
  gender: z.enum(["MALE", "FEMALE"], { message: "Sélectionnez votre genre" }),
});

export const donorStep2Schema = z.object({
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Numéro invalide (ex: +221771234567)"),
  email: z.string().trim().email("Adresse email invalide"),
});

export const donorStep3Schema = z.object({
  bloodType: z
    .enum(bloodTypeValues as any, {
      message: "Sélectionnez votre groupe sanguin",
    })
    .optional(),
  dateOfBirth: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), "Date invalide"),
});

export type DonorStep1Values = z.infer<typeof donorStep1Schema>;
export type DonorStep2Values = z.infer<typeof donorStep2Schema>;
export type DonorStep3Values = z.infer<typeof donorStep3Schema>;
export type RegisterDonorFormValues = DonorStep1Values &
  DonorStep2Values &
  DonorStep3Values;

// ─── OTP ──────────────────────────────────────────────────────

export const otpSchema = z.object({
  code: z
    .string()
    .length(6, "Le code doit contenir 6 chiffres")
    .regex(/^\d{6}$/, "Le code ne doit contenir que des chiffres"),
});

export type OtpValues = z.infer<typeof otpSchema>;
