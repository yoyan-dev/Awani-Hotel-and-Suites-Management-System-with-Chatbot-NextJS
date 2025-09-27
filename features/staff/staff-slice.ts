import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchStaff,
  fetchAllStaff,
  addStaff,
  updateStaff,
  deleteStaff,
  deleteSelectedStaff,
} from "./staff-thunk";
import { Staff, StaffState } from "@/types/staff";

const initialState: StaffState = {
  lists: [],
  list: {} as Staff,
  isLoading: false,
  error: undefined,
};

const staffSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // get single
      .addCase(fetchStaff.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchStaff.fulfilled, (state, action: PayloadAction<Staff>) => {
        state.isLoading = false;
        state.list = action.payload;
        state.error = undefined;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // get all s
      .addCase(fetchAllStaff.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        fetchAllStaff.fulfilled,
        (state, action: PayloadAction<Staff[]>) => {
          state.isLoading = false;
          state.lists = action.payload;
          state.error = undefined;
        }
      )
      .addCase(fetchAllStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // add
      .addCase(addStaff.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(addStaff.fulfilled, (state, action: PayloadAction<Staff>) => {
        state.isLoading = false;
        state.error = undefined;
        state.list = action.payload;
        state.lists.push(action.payload);
      })
      .addCase(addStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // update
      .addCase(updateStaff.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(updateStaff.fulfilled, (state, action: PayloadAction<Staff>) => {
        state.isLoading = false;
        state.error = undefined;
        const index = state.lists.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.lists[index] = action.payload;
        }
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // delete
      .addCase(deleteStaff.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.lists = state.lists.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // delete many
      .addCase(deleteSelectedStaff.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(deleteSelectedStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.lists = state.lists.filter(
          (r) => !action.payload.map((row) => row.id).includes(r.id)
        );
      })
      .addCase(deleteSelectedStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLoading } = staffSlice.actions;
export default staffSlice.reducer;
