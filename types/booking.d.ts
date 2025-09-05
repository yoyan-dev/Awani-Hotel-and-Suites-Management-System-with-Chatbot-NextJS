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
  check_in: string;
  check_out: string;
  special_requests: string;
  status: BookingStatus;
  created_at: any;
}

interface BookingState {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
}
