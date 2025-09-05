import { ColumnType } from "@/types/column";

export const columns: ColumnType[] = [
  { name: "ID", uid: "id" },
  { name: "BOOKING ID", uid: "booking_id" },
  { name: "GUEST NAME", uid: "guest_name" },
  { name: "ROOM TYPE", uid: "room_type" },
  { name: "NIGHTS", uid: "nights" },
  { name: "CHECK IN AND CHECK OUT DATE", uid: "check_in" },
  { name: "TOTAL PRICE", uid: "total_price" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

export const statusColorMap: Record<string, "success" | "danger" | "warning"> =
  {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };

export const INITIAL_VISIBLE_COLUMNS = [
  "booking_id",
  "guest_name",
  "room_type",
  "nights",
  "check_in",
  "total_price",
  "status",
  "actions",
];
