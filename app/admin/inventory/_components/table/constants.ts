import { ColumnType } from "@/types/column";

export const columns: ColumnType[] = [
  { name: "ID", uid: "id" },
  { name: "NAME", uid: "name" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "QUANTITY", uid: "quantity" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "in stock", uid: "inStock" },
  { name: "out of stock", uid: "outOfStock" },
  { name: "discontinued", uid: "discontinued" },
];

export const statusColorMap: Record<
  (typeof statusOptions)[number]["uid"],
  "success" | "danger" | "warning"
> = {
  inStock: "success",
  outOfStock: "danger",
  discontinued: "warning",
};

export const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "name",
  "description",
  "quantity",
  "status",
  "actions",
];
