import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Room, RoomState, RoomStatus } from "@/types/room";
import {
  fetchRoom,
  fetchRooms,
  addRoom,
  updateRoom,
  deleteRoom,
} from "./room-thunk";
import { addToast } from "@heroui/react";

const initialState: RoomState = {
  rooms: [],
  room: {} as Room,
  isLoading: false,
  error: undefined,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // get single room
      .addCase(fetchRoom.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.isLoading = false;
        state.room = action.payload;
      })
      .addCase(fetchRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // get all rooms
      .addCase(fetchRooms.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.isLoading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // add room
      .addCase(addRoom.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(addRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.isLoading = false;
        state.rooms.push(action.payload);
        addToast({
          title: "Success",
          description: "Room added successfully",
          color: "success",
        });
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        addToast({
          title: "Error",
          description: action.error.message || "Failed to add room",
          color: "danger",
        });
      })

      // update room
      .addCase(updateRoom.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(updateRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.isLoading = false;
        const index = state.rooms.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // delete room
      .addCase(deleteRoom.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rooms = state.rooms.filter((r) => r.id !== action.payload);
        addToast({
          title: "Success",
          description: "Room deleted successfully",
          color: "success",
        });
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        addToast({
          title: "Success",
          description: action.error.message || "Failed to delete room",
          color: "success",
        });
      });
  },
});

export const { setLoading } = roomSlice.actions;
export default roomSlice.reducer;
