import { Pagination } from "@supabase/supabase-js";

export type RoomStatus =
  | "available"
  | "cleaning"
  | "reserved"
  | "occupied"
  | "maintenance"
  | "out_of_service";

export interface RoomType {
  id?: string;
  image?: string;
  name?: string;
  description?: string;
  add_ons?: any;
  room_size?: string;
  max_guest?: number;
  price?: number;
}

export interface RoomTypeState {
  room_types: RoomType[];
  room_type: RoomType;
  isLoading: boolean;
  error?: string;
}

export interface Room {
  id?: string;
  room_id?: string;
  room_number?: number;
  room_type_id?: string;
  room_type?: any;
  area?: string;
  description?: string;
  status?: RoomStatus;
  images?: string[];
  remarks?: string;
}

export interface RoomPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface FetchRoomsParams {
  page?: number;
  query?: string;
  roomTypeID?: string;
  status?: string | undefined;
  minPrice?: number;
  maxPrice?: number;
}
export interface RoomState {
  rooms: Room[];
  room: Room;
  pagination: RoomPagination | null;
  isLoading: boolean;
  error?: string;
}
