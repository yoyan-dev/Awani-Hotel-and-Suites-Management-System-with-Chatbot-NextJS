import { AnyARecord } from "dns";

export type InventoryStatus = "inStock" | "outOfStock" | "discontinued";

export interface Inventory {
  id?: string;
  name: string;
  quantity: number;
  description?: string;
  createdAt?: any;
  status?: InventoryStatus;
}

export interface InventoryState {
  inventory: Inventory[];
  item: Inventory;
  isLoading: boolean;
  error?: string;
}
