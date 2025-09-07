import type { ColumnType } from "@/types/column";

export const columns: ColumnType[] = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Image", uid: "images" },
  { name: "ROOM ID", uid: "room_id" },
  { name: "ROOM NUMBER", uid: "room_number" },
  { name: "ROOM TYPE", uid: "room_type" },
  { name: "NAME", uid: "name" },
  { name: "AREA", uid: "area" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "BEDS", uid: "beds" },
  { name: "FACILITIES", uid: "facilities" },
  { name: "MAX GUEST", uid: "max_guest" },
  { name: "BASE PRICE", uid: "base_price" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "Available", uid: "available" },
  { name: "Cleaning", uid: "cleaning" },
  { name: "Reserved", uid: "reserved" },
  { name: "Occupied", uid: "occupied" },
  { name: "Maintenance", uid: "maintenance" },
  { name: "Out of Service", uid: "out_of_service" },
];

export const statusColorMap: Record<
  string,
  "success" | "danger" | "warning" | "secondary" | "default"
> = {
  available: "success",
  cleaning: "secondary",
  reserved: "warning",
  occupied: "warning",
  maintenance: "danger",
  out_of_service: "default",
};

export const INITIAL_VISIBLE_COLUMNS = [
  "images",
  "room_id",
  "room_number",
  "room_type",
  "name",
  "max_guest",
  "base_price",
  "status",
  "actions",
];
