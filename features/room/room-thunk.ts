import { createAsyncThunk } from "@reduxjs/toolkit";
import type { FetchRoomsParams, Room } from "@/types/room";
import { addToast } from "@heroui/react";

export const fetchRooms = createAsyncThunk<
  Room[],
  FetchRoomsParams | undefined
>("room/fetchRooms", async (params, { rejectWithValue }) => {
  try {
    const searchParams = new URLSearchParams();
    if (params?.query) searchParams.append("q", params.query);
    if (params?.roomType) searchParams.append("roomType", params.roomType);
    if (params?.minPrice !== undefined)
      searchParams.append("minPrice", String(params.minPrice));
    if (params?.maxPrice !== undefined)
      searchParams.append("maxPrice", String(params.maxPrice));

    const res = await fetch(`/api/rooms?${searchParams.toString()}`);
    const data = await res.json();

    if (!res.ok || !data.success) {
      addToast(data.message ?? "Failed to fetch rooms");
      return rejectWithValue(data.message ?? "Failed to fetch rooms");
    }

    return data.data as Room[];
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchRoom = createAsyncThunk<Room, string>(
  "room/fetchRoom",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/rooms/${id}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        addToast(data.message);
        return rejectWithValue(
          data.message?.description ?? "Failed to fetch room"
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

export const addRoom = createAsyncThunk<Room, FormData>(
  "room/addRoom",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/rooms", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      addToast(data.message);
      if (!res.ok || !data.success) {
        return rejectWithValue(
          data.message?.description ?? "Failed to add room"
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
export const updateRoom = createAsyncThunk<Room, Room, { rejectValue: string }>(
  "room/updateRoom",
  async (room, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/rooms/${room.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room),
      });

      const data = await res.json();
      addToast(data.message);

      if (!res.ok || !data.success) {
        return rejectWithValue(
          data.message?.description ?? "Failed to update room"
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
  }
);

// DELETE
export const deleteRoom = createAsyncThunk<string, string>(
  "room/deleteRoom",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/rooms/${id}`, { method: "DELETE" });
      const data = await res.json();

      addToast(data.message);
      if (!res.ok || !data.success) {
        return rejectWithValue(
          data.message?.description ?? "Failed to delete room"
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

//  delete selected rooms or all
export const deleteRooms = createAsyncThunk<
  Room[],
  { selectedValues: Set<number> | "all" },
  { rejectValue: string }
>("rooms/deleteRooms", async ({ selectedValues }, thunkAPI) => {
  try {
    const body =
      selectedValues === "all"
        ? { selectedValues: "all" }
        : { selectedValues: Array.from(selectedValues) };

    const res = await fetch("/api/rooms", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    addToast(data.message);
    if (!res.ok) return thunkAPI.rejectWithValue(data.error);

    return data.data;
  } catch (err: any) {
    addToast({
      title: "Error",
      description: err.message,
      color: "danger",
    });
    return thunkAPI.rejectWithValue(err.message);
  }
});
