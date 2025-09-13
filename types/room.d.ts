export type RoomStatus =
  | "available"
  | "cleaning"
  | "reserved"
  | "occupied"
  | "maintenance"
  | "out_of_service";

export interface Room {
  id?: string;
  room_id?: string;
  room_number?: number;
  room_type?: string;
  name?: string;
  area?: string;
  description?: string;
  max_guest?: number;
  base_price?: number;
  beds?: string[];
  facilities?: string[];
  status?: RoomStatus;
  images?: string[];
  remarks?: string;
}

export interface RoomState {
  rooms: Room[];
  room: Room;
  isLoading: boolean;
  error?: string;
}

export interface FetchRoomsParams {
  query?: string;
  roomType?: string;
  minPrice?: number;
  maxPrice?: number;
}
