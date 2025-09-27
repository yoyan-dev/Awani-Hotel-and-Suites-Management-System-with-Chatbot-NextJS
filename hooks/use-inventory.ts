import {
  addItem,
  deleteItem,
  deleteSelectedItems,
  fetchInventory,
  fetchInventoryItem,
  UpdateItem,
} from "@/features/inventory/inventory-thunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Inventory } from "@/types/inventory";

export function useInventory() {
  const dispatch = useAppDispatch();
  const { inventory, item, isLoading, error } = useAppSelector(
    (state) => state.inventory
  );
  return {
    inventory,
    item,
    isLoading,
    error,
    fetchInventory: () => dispatch(fetchInventory()),
    fetchInventoryItem: (id: string) => dispatch(fetchInventoryItem(id)),
    addItem: (payload: FormData) => dispatch(addItem(payload)),
    UpdateItem: (payload: Inventory) => dispatch(UpdateItem(payload)),
    deleteItem: (id: string) => dispatch(deleteItem(id)),
    deleteSelectedItems: (selectedKeys: Set<number> | "all") =>
      deleteSelectedItems({ selectedValues: selectedKeys }),
  };
}
