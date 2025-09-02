import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Room } from "@/types/room";

export const getRoom = createAsyncThunk<
    Room,
    string,
    { rejectValue: string }
    >(
    "room/getRoom",
    async (id: string, { rejectWithValue }) => {
        try {
        const res = await fetch(`/api/room/${id}`);
        if (!res.ok) throw new Error("Failed to fetch task");
        return (await res.json());
        } catch (err: any) {
        return rejectWithValue(err.message);
        }
    }
);

export const getRooms = createAsyncThunk<Room[]>(
  "room/getRooms",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/room`);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      return (await res.json());
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
