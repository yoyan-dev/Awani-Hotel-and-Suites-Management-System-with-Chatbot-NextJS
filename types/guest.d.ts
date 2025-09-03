export type GuestStatus = "active" | "inactive" | "vip" | "banned";

export interface Guest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  nationality?: string;
  id_number?: string;
  status: GuestStatus;
  created_at: string;
  updated_at?: string;
  bookings?: string[];
}

export interface GuestState {
  guests: Guest[];
  isLoading: boolean;
  error: string | null;
}
