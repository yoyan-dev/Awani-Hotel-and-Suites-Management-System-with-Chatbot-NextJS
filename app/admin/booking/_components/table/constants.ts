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

export const bookingStatusOptions = [
  { name: "Confirmed", uid: "confirmed" },
  { name: "Cancelled", uid: "cancelled" },
  { name: "Pending", uid: "pending" },
  { name: "Processing", uid: "processing" },
  { name: "Reserved", uid: "reserved" },
  { name: "Deposit", uid: "deposit" },
  { name: "Paid", uid: "paid" },
  { name: "Checked In", uid: "checked_in" },
  { name: "Checked Out", uid: "checked_out" },
];

export const bookingStatusColorMap: Record<
  (typeof bookingStatusOptions)[number]["uid"],
  "default" | "primary" | "secondary" | "success" | "warning" | "danger"
> = {
  confirmed: "success",
  cancelled: "danger",
  pending: "warning",
  processing: "primary",
  reserved: "secondary",
  deposit: "danger",
  paid: "success",
  checked_in: "primary",
  checked_out: "default",
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
