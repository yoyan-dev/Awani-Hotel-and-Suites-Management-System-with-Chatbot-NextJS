export type BookingStatus =
  | "pending"
  | "procedding"
  | "reserved"
  | "confirmed"
  | "cancelled"
  | "seposit"
  | "paid"
  | "check-in"
  | "check-out";

export interface Booking {
  id: string;
  booking_id: string;
  room_id: string;
  guest_id: string;
  guest_name: string;
  room_type: string;
  guest_email: string;
  guest_phone?: string;
  nights: number;
  check_in: string;
  check_out: string;
  total_price: number;
  status: BookingStatus;
  amenities: string[];
  payment_method?: "cash" | "card" | "gcash";
  created_at: string;
}

interface BookingState {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
}
