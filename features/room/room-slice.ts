import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Room, RoomState, RoomStatus } from "@/types/room";
import { getRoom, getRooms } from "./room-thunk";

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
    addRoom: (state, action: PayloadAction<Room>) => {
      state.rooms.push(action.payload);
    },
    updateRoom: (
      state,
      action: PayloadAction<{ id: string; status: RoomStatus }>
    ) => {
      const task = state.rooms.find((t) => t.id === action.payload.id);
      if (task) task.status = action.payload.status;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // get single room
      .addCase(getRoom.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.isLoading = false;
        state.room = action.payload;
      })
      .addCase(getRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // get all rooms
      .addCase(getRooms.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.isLoading = false;
        state.rooms = action.payload;
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { addRoom, updateRoom, setLoading } = roomSlice.actions;
export default roomSlice.reducer;
