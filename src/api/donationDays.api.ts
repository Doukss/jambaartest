import { api } from "./client";
import {
  DonationDay,
  ListDaysFilters,
  DayListResponse,
  MyRegistrationsResponse,
  DayRegistration,
} from "../types/donation-day.types";

export const donationDaysApi = {
  // ── GET /donation-days (Donneur) ─────────────────────────
  getPublishedDays: async (
    filters?: ListDaysFilters,
  ): Promise<DayListResponse> => {
    const { data } = await api.get<{
      success: boolean;
      data: DonationDay[];
      pagination: DayListResponse["pagination"];
    }>("/donation-days", { params: filters });

    return { data: data.data, pagination: data.pagination };
  },

  // ── GET /donation-days/:id ───────────────────────────────
  getDayDetail: async (id: string): Promise<DonationDay> => {
    const { data } = await api.get<{
      success: boolean;
      day: DonationDay;
    }>(`/donation-days/${id}`);

    return data.day;
  },

  // ── GET /donation-days/my-registrations (Donneur) ────────
  getMyRegistrations: async (
    filters?: ListDaysFilters,
  ): Promise<MyRegistrationsResponse> => {
    const { data } = await api.get<{
      success: boolean;
      data: DayRegistration[];
      pagination: MyRegistrationsResponse["pagination"];
    }>("/donation-days/my-registrations", { params: filters });

    return { data: data.data, pagination: data.pagination };
  },

  // ── POST /donation-days/:id/register (Donneur) ───────────
  registerDonor: async (dayId: string): Promise<any> => {
    const { data } = await api.post<{
      success: boolean;
      registration: any;
    }>(`/donation-days/${dayId}/register`);

    return data.registration;
  },

  // ── DELETE /donation-days/:id/register (Donneur) ─────────
  cancelDonorRegistration: async (dayId: string): Promise<any> => {
    const { data } = await api.delete<{
      success: boolean;
      message: string;
    }>(`/donation-days/${dayId}/register`);

    return data;
  },
};
