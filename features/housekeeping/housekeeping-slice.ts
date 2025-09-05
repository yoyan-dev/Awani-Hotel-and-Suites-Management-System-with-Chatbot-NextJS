import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Housekeeping, HousekeepingState } from "@/types/housekeeping";
import {
  fetchHousekeepingTask,
  fetchHousekeepingTasks,
  addHousekeepingTask,
  updateHousekeepingTask,
  deleteHousekeepingTask,
  deleteSelectedHousekeepingTask,
} from "./housekeeping-thunk";

const initialState: HousekeepingState = {
  tasks: [],
  task: {} as Housekeeping,
  isLoading: false,
  error: undefined,
};

const housekeepingTaskSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // get single room
      .addCase(fetchHousekeepingTask.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        fetchHousekeepingTask.fulfilled,
        (state, action: PayloadAction<Housekeeping>) => {
          state.isLoading = false;
          state.task = action.payload;
          state.error = undefined;
        }
      )
      .addCase(fetchHousekeepingTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // get all rooms
      .addCase(fetchHousekeepingTasks.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        fetchHousekeepingTasks.fulfilled,
        (state, action: PayloadAction<Housekeeping[]>) => {
          state.isLoading = false;
          state.tasks = action.payload;
          state.error = undefined;
        }
      )
      .addCase(fetchHousekeepingTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // add room
      .addCase(addHousekeepingTask.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        addHousekeepingTask.fulfilled,
        (state, action: PayloadAction<Housekeeping>) => {
          state.isLoading = false;
          state.error = undefined;
          state.tasks.push(action.payload);
        }
      )
      .addCase(addHousekeepingTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // update room
      .addCase(updateHousekeepingTask.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        updateHousekeepingTask.fulfilled,
        (state, action: PayloadAction<Housekeeping>) => {
          state.isLoading = false;
          state.error = undefined;
          const index = state.tasks.findIndex(
            (r) => r.id === action.payload.id
          );
          if (index !== -1) {
            state.tasks[index] = action.payload;
          }
        }
      )
      .addCase(updateHousekeepingTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // delete room
      .addCase(deleteHousekeepingTask.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(deleteHousekeepingTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.tasks = state.tasks.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteHousekeepingTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // delete rooms
      .addCase(deleteSelectedHousekeepingTask.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(deleteSelectedHousekeepingTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.tasks = state.tasks.filter(
          (r) => !action.payload.map((room) => room.id).includes(r.id)
        );
      })
      .addCase(deleteSelectedHousekeepingTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLoading } = housekeepingTaskSlice.actions;
export default housekeepingTaskSlice.reducer;
