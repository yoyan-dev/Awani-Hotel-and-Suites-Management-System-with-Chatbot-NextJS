import { ColumnType } from "@/types/column";

export const columns: ColumnType[] = [
  { name: "ID", uid: "id" },
  { name: "ROOM NUMBER", uid: "room_number" },
  { name: "MESSAGE", uid: "message" },
  { name: "SPECIAL REQUEST", uid: "requests" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "In Progress", uid: "in progress" },
  { name: "Pending", uid: "pending" },
  { name: "Completed", uid: "completed" },
];

export const statusColorMap: Record<string, "success" | "danger" | "warning"> =
  {
    "in progress": "warning",
    pending: "danger",
    completed: "success",
  };

export const levelColorMap: Record<string, "success" | "danger" | "warning"> = {
  low: "success",
  medium: "warning",
  high: "danger",
};

export const INITIAL_VISIBLE_COLUMNS = [
  "room_number",
  "message",
  "requests",
  "status",
  "actions",
];
