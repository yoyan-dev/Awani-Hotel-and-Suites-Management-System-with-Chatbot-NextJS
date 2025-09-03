import { ColumnType, UserType } from "./types";

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

export const priorityLevel = [
  { name: "high", uid: "high" },
  { name: "medium", uid: "medium" },
  { name: "low", uid: "low" },
];

export const category = [
  { name: "repair", uid: "repair" },
  { name: "service", uid: "service" },
  { name: "inspection", uid: "inspection" },
  { name: "safety", uid: "safety" },
];

export const statusColorMap: Record<string, "success" | "danger" | "warning"> =
  {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };

export const levelColorMap: Record<string, "success" | "danger" | "warning"> = {
  low: "success",
  medium: "danger",
  high: "warning",
};

export const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

export const users: UserType[] = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  // ... other users
];
