import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Inventory } from "@/types/inventory";
import { addToast } from "@heroui/react";

export const fetchInventory = createAsyncThunk<Inventory[]>(
  "inventory/fetchInventory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/inventory");
      if (!res.ok) throw new Error("Failed to fetch inventory");
      return await res.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchInventoryItem = createAsyncThunk<Inventory, string>(
  "inventory/fetchInventoryItem",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/inventory/${id}`);
      if (!res.ok) throw new Error("Failed to fetch item");
      return res.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addInventoryItem = createAsyncThunk<Inventory, FormData>(
  "inventory/addInventoryItem",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      addToast(data.message);

      if (!res.ok) throw new Error("Failed to add item");
      return data.inventory;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// UPDATE
export const updateInventoryItem = createAsyncThunk<
  Inventory,
  Inventory,
  { rejectValue: string }
>("inventory/updateInventoryItem", async (item, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/inventory/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    const data = await res.json();
    addToast(data.message);

    if (!res.ok || !data.success) {
      return rejectWithValue(
        data.message?.description ?? "Failed to update item"
      );
    }

    return data.item;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// DELETE
export const deleteInventoryItem = createAsyncThunk<string, string>(
  "inventory/deleteInventoryItem",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/inventory/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete item");
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
