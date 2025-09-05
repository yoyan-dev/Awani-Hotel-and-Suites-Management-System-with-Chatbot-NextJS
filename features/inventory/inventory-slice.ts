import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  Inventory,
  InventoryState,
  InventoryStatus,
} from "@/types/inventory";
import {
  fetchInventory,
  fetchInventoryItem,
  addItem,
  UpdateItem,
  deleteItem,
  deleteSelectedItems,
} from "./inventory-thunk";

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
          state.error = undefined;
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
          state.error = undefined;
        }
      )
      .addCase(fetchInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // add room
      .addCase(addItem.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(addItem.fulfilled, (state, action: PayloadAction<Inventory>) => {
        state.isLoading = false;
        state.error = undefined;
        state.inventory.push(action.payload);
      })
      .addCase(addItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // update room
      .addCase(UpdateItem.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        UpdateItem.fulfilled,
        (state, action: PayloadAction<Inventory>) => {
          state.isLoading = false;
          state.error = undefined;
          const index = state.inventory.findIndex(
            (r) => r.id === action.payload.id
          );
          if (index !== -1) {
            state.inventory[index] = action.payload;
          }
        }
      )
      .addCase(UpdateItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // delete room
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.inventory = state.inventory.filter(
          (r) => r.id !== action.payload
        );
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // delete rooms
      .addCase(deleteSelectedItems.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(deleteSelectedItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.inventory = state.inventory.filter(
          (r) => !action.payload.map((room) => room.id).includes(r.id)
        );
      })
      .addCase(deleteSelectedItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLoading } = inventorySlice.actions;
export default inventorySlice.reducer;
