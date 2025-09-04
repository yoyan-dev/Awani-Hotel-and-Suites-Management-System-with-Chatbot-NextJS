import { Booking } from "@/types/booking";
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

export const bookings = [
  {
    id: "1",
    booking_id: "BKG-2025-001",
    guest_name: "Juan Dela Cruz",
    room_type: "Deluxe Suite",
    nights: 3,
    check_in: "Sep 10, 2025",
    check_out: "Sep 13, 2025",
    total_price: 7500,
    status: "reserved",
  },
  {
    id: "2",
    booking_id: "BKG-2025-002",
    guest_name: "Maria Santos",
    room_type: "Standard Room",
    nights: 2,
    check_in: "Sep 12, 2025",
    check_out: "Sep 14, 2025",
    total_price: 4000,
    status: "pending",
  },
  {
    id: "3",
    booking_id: "BKG-2025-003",
    guest_name: "Jose Rizal",
    room_type: "Presidential Suite",
    nights: 1,
    check_in: "Sep 15, 2025",
    check_out: "Sep 16, 2025",
    total_price: 10000,
    status: "check-in",
  },
  {
    id: "4",
    booking_id: "BKG-2025-004",
    guest_name: "Ana Cruz",
    room_type: "Family Room",
    nights: 4,
    check_in: "Sep 20, 2025",
    check_out: "Sep 24, 2025",
    total_price: 12000,
    status: "cancelled",
  },
  {
    id: "5",
    booking_id: "BKG-2025-005",
    guest_name: "Mark Reyes",
    room_type: "Twin Room",
    nights: 2,
    check_in: "Sep 25, 2025",
    check_out: "Sep 27, 2025",
    total_price: 5000,
    status: "confirmed",
  },
];
