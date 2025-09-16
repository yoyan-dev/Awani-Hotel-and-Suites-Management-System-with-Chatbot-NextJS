import { ColumnType } from "@/types/column";

export const columns: ColumnType[] = [
  { name: "ID", uid: "id" },
  { name: "IMAGE", uid: "image" },
  { name: "NAME", uid: "name" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "AMENITIES", uid: "amenities" },
  { name: "ROOM SIZE", uid: "room_size" },
  { name: "PRICE", uid: "price" },
  { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "image",
  "name",
  "description",
  "amenities",
  "room_size",
  "price",
  "actions",
];
