export type GuestStatus = "active" | "inactive" | "vip" | "banned";

export interface Guest {
  id: string;
  full_name: string;
  email?: string;
  contact_number?: string;
  address?: string;
  nationality?: string;
  created_at: string;
  bookings?: string[];
}

export interface GuestState {
  guests: Guest[];
  guest: Guest;
  isLoading: boolean;
  error: string | undefined;
}
