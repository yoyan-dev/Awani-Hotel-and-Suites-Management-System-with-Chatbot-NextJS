import type { ColumnType } from "@/types/column";

export const columns: ColumnType[] = [
  { name: "ID", uid: "id", sortable: true },
  { name: "ROOM ID", uid: "room_id" },
  { name: "ROOM NUMBER", uid: "room_number" },
  { name: "ROOM TYPE", uid: "room_type" },
  { name: "AREA", uid: "area" },
  { name: "DESCRIPTION", uid: "description" },
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
  "room_id",
  "room_number",
  "room_type",
  "name",
  "max_guest",
  "base_price",
  "status",
  "actions",
];
