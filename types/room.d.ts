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
  floor?: number;
  description?: string;
  max_guest?: number;
  base_price?: number;
  status?: RoomStatus;
  image?: any;
}

export interface RoomState {
  rooms: Room[];
  room: Room;
  isLoading: boolean;
  error?: string;
}
