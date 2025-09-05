import { ColumnType } from "@/types/column";

export const columns: ColumnType[] = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "AGE", uid: "age", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "TEAM", uid: "team" },
  { name: "EMAIL", uid: "email" },
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

export const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];
