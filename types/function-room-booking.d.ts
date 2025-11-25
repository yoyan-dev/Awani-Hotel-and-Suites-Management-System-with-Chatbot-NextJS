export interface FunctionRoomBooking {
  id: string;
  guest_id?: string;
  event_type?: string;
  event_duration?: string;
  banquet_package_id?: string;
  room_id?: string;
  purpose?: string;
  room_type?: "full" | "half";
  status?: string;
  guest?: any;
  banquet?: any;
  room?: any;
}
