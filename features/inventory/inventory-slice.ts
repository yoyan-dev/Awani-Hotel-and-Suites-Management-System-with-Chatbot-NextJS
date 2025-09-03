import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  Inventory,
  InventoryState,
  InventoryStatus,
} from "@/types/inventory";
import {
  fetchInventory,
  fetchInventoryItem,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "./inventory-thunk";
import { addToast } from "@heroui/react";

const initialState: InventoryState = {
  inventory: [],
  item: {} as Inventory,
  isLoading: false,
  error: undefined,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // get single room
      .addCase(fetchInventoryItem.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        fetchInventoryItem.fulfilled,
        (state, action: PayloadAction<Inventory>) => {
          state.isLoading = false;
          state.item = action.payload;
        }
      )
      .addCase(fetchInventoryItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // get all rooms
      .addCase(fetchInventory.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        fetchInventory.fulfilled,
        (state, action: PayloadAction<Inventory[]>) => {
          state.isLoading = false;
          state.inventory = action.payload;
        }
      )
      .addCase(fetchInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // add room
      .addCase(addInventoryItem.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        addInventoryItem.fulfilled,
        (state, action: PayloadAction<Inventory>) => {
          state.isLoading = false;
          state.inventory.push(action.payload);
        }
      )
      .addCase(addInventoryItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        addToast({
          title: "Error",
          description: action.error.message || "Failed to add room",
          color: "danger",
        });
      })

      // update room
      .addCase(updateInventoryItem.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        updateInventoryItem.fulfilled,
        (state, action: PayloadAction<Inventory>) => {
          state.isLoading = false;
          const index = state.inventory.findIndex(
            (r) => r.id === action.payload.id
          );
          if (index !== -1) {
            state.inventory[index] = action.payload;
          }
        }
      )
      .addCase(updateInventoryItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // delete room
      .addCase(deleteInventoryItem.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(deleteInventoryItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.inventory = state.inventory.filter(
          (r) => r.id !== action.payload
        );
        addToast({
          title: "Success",
          description: "Item deleted successfully",
          color: "success",
        });
      })
      .addCase(deleteInventoryItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        addToast({
          title: "Success",
          description:
            action.error.message || "Failed to delete item in inventory",
          color: "success",
        });
      });
  },
});

export const { setLoading } = inventorySlice.actions;
export default inventorySlice.reducer;
