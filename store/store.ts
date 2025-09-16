import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/features/counter/counter-slice";
import roomReducer from "@/features/room/room-slice";
import roomTypeReducer from "@/features/room-types/room-types.slice";
import inventoryReducer from "@/features/inventory/inventory-slice";
import bookingReducer from "@/features/booking/booking-slice";
import housekeepingReducer from "@/features/housekeeping/housekeeping-slice";
import userReducer from "@/features/users/user-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    room: roomReducer,
    room_type: roomTypeReducer,
    inventory: inventoryReducer,
    booking: bookingReducer,
    housekeeping: housekeepingReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
