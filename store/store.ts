import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/features/counter/counter-slice";
import roomReducer from "@/features/room/room-slice";
import inventoryReducer from "@/features/inventory/inventory-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    room: roomReducer,
    inventory: inventoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
