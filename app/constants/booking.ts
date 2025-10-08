import { ColumnType } from "@/types/column";

export const columns: ColumnType[] = [
  { name: "ID", uid: "id" },
  { name: "ROOM", uid: "room" },
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

export const bookingStatusColorMap: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  "Check-in": "bg-green-100 text-green-800",
  "Check-out": "bg-slate-100 text-slate-800",
  cancelled: "bg-red-100 text-red-800",
};

export const bookingStatusHexColorMap: Record<string, string> = {
  pending: "#facc15", // yellow
  reserved: "#a78bfa", // purple
  confirmed: "#60a5fa", // blue
  "check-in": "#34d399", // green
  cancelled: "#f87171", // red
  default: "#9ca3af", // gray
};

export const INITIAL_VISIBLE_COLUMNS = [
  "booking_id",
  "room",
  "guest_name",
  "room_type",
  "nights",
  "check_in",
  "total_price",
  "status",
  "actions",
];
