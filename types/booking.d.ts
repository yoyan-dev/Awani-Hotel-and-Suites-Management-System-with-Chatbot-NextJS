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
  user_id: string;
  room_id: string;
  room_type_id: string;
  check_in: string;
  check_out: string;
  places_last_visited?: string;
  purpose?: string;
  number_of_guests?: number;
  recent_sickness?: string[];
  special_requests: string;
  status: BookingStatus;
  rooms?: any;
  users?: any;
  room_type?: any;
  created_at: any;
}

export interface BookingState {
  bookings: Booking[];
  booking: Booking;
  isLoading: boolean;
  error: string | undefined;
}
