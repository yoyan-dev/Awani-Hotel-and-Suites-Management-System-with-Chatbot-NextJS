import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomType } from "@/types/room";
import { addToast } from "@heroui/react";

const apiUrl = "/api/room-types";

export const fetchRoomTypes = createAsyncThunk<RoomType[]>(
  "roomTypes/fetchRoomTypes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (!res.ok || !data.success) {
        addToast(data.message);
        return rejectWithValue(
          data.message?.description ?? "Failed to fetch room types"
        );
      }
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRoomType = createAsyncThunk<RoomType, string>(
  "roomTypes/fetchRoomType",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${apiUrl}/${id}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        addToast(data.message);
        return rejectWithValue(
          data.message?.description ?? "Failed to fetch room type"
        );
      }
      return data.data;
    } catch (error: any) {
      addToast({
        title: "Error",
        description: error.message,
        color: "danger",
      });
      return rejectWithValue(error.message);
    }
  }
);

export const addRoomType = createAsyncThunk<RoomType, FormData>(
  "roomTypes/addRoomType",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      addToast(data.message);
      if (!res.ok || !data.success) {
        return rejectWithValue(
          data.message?.description ?? "Failed to add item in room type"
        );
      }
      return data.data;
    } catch (err: any) {
      console.log(err.message);
      addToast({
        title: "Error",
        description: err.message,
        color: "danger",
      });
      return rejectWithValue(err.message);
    }
  }
);

// UPDATE
export const updateRoomType = createAsyncThunk<
  RoomType,
  RoomType,
  { rejectValue: string }
>("roomTypes/updateRoomType", async (inventory, { rejectWithValue }) => {
  try {
    const res = await fetch(`${apiUrl}/${inventory.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inventory),
    });

    const data = await res.json();
    addToast(data.message);

    if (!res.ok || !data.success) {
      return rejectWithValue(
        data.message?.description ?? "Failed to update room types"
      );
    }

    return data.data;
  } catch (err: any) {
    addToast({
      title: "Error",
      description: err.message,
      color: "danger",
    });
    return rejectWithValue(err.message);
  }
});

// DELETE
export const deleteRoomType = createAsyncThunk<string, string>(
  "roomTypes/deleteRoomType",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      const data = await res.json();

      addToast(data.message);
      if (!res.ok || !data.success) {
        return rejectWithValue(
          data.message?.description ?? "Failed to delete item"
        );
      }

      return data.data;
    } catch (error: any) {
      addToast({
        title: "Error",
        description: error.message,
        color: "danger",
      });
      return rejectWithValue(error.message);
    }
  }
);
