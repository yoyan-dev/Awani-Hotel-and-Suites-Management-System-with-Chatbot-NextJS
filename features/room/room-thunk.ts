import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Room } from "@/types/room";
import { addToast } from "@heroui/react";

export const fetchRooms = createAsyncThunk<Room[]>(
  "room/fetchRooms",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/rooms");
      if (!res.ok) throw new Error("Failed to fetch rooms");
      return res.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRoom = createAsyncThunk<Room, string>(
  "room/fetchRoom",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/rooms/${id}`);
      if (!res.ok) throw new Error("Failed to fetch rooms");
      return res.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addRoom = createAsyncThunk<Room, FormData>(
  "room/addRoom",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/rooms", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Failed to add room");
      return res.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
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

      return data.room as Room;
    } catch (err: any) {
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
      if (!res.ok) throw new Error("Failed to delete room");
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
