import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/features/counter/counter-slice'
import roomReducer from '@/features/room/room-slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    room: roomReducer
  }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;