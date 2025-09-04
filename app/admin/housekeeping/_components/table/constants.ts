import { ColumnType } from "@/types/column";

export const columns: ColumnType[] = [
  { name: "ID", uid: "id" },
  { name: "TITLE", uid: "title" },
  { name: "ATTACHMENT", uid: "attachment" },
  { name: "PRIORITY LEVEL", uid: "priority" },
  { name: "CATEGORY", uid: "category" },
  { name: "AREA", uid: "area" },
  { name: "DATE", uid: "scheduled_date" },
  { name: "ASSIGNED TASK", uid: "assigned_to" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "In Progress", uid: "in progress" },
  { name: "Pending", uid: "pending" },
  { name: "Completed", uid: "completed" },
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
  "title",
  "attachment",
  "priority",
  "category",
  "area",
  "date",
  "assigned_to",
  "status",
  "actions",
];

export const housekeepingTasks = [
  {
    id: "1",
    title: "clean deluxe suite 301",
    area: "room 301",
    attachment: "room_301_before.jpg",
    priority: "high",
    category: "room cleaning",
    scheduled_date: "sep 05, 2025",
    assigned_to: "maria santos",
    status: "in progress",
  },
  {
    id: "2",
    title: "replace bedsheets - standard room 202",
    area: "room 202",
    attachment: "bedsheets_202.pdf",
    priority: "medium",
    category: "linen",
    scheduled_date: "sep 06, 2025",
    assigned_to: "jose cruz",
    status: "pending",
  },
  {
    id: "3",
    title: "bathroom deep clean - family room 105",
    area: "room 105",
    attachment: "bathroom_checklist.docx",
    priority: "high",
    category: "sanitation",
    scheduled_date: "sep 07, 2025",
    assigned_to: "ana reyes",
    status: "completed",
  },
  {
    id: "4",
    title: "vacuum carpets - presidential suite",
    area: "presidential suite",
    attachment: "carpet_condition.png",
    priority: "low",
    category: "general cleaning",
    scheduled_date: "sep 08, 2025",
    assigned_to: "mark dela cruz",
    status: "pending",
  },
  {
    id: "5",
    title: "restock toiletries - deluxe suite 305",
    area: "room 305",
    attachment: "toiletries_list.xlsx",
    priority: "medium",
    category: "supplies",
    scheduled_date: "sep 09, 2025",
    assigned_to: "liza tan",
    status: "in progress",
  },
  {
    id: "6",
    title: "disinfect lobby area",
    area: "main lobby",
    attachment: "lobby_disinfection.pdf",
    priority: "high",
    category: "sanitation",
    scheduled_date: "sep 09, 2025",
    assigned_to: "carlo mendoza",
    status: "pending",
  },
];
