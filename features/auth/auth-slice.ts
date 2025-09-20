import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Booking, BookingState } from "@/types/booking";
import { getCurrentUser, createAccount, updateAccount } from "./auth-thunk";
import { User } from "@/types/users";

const initialState: {
  user: User;
  isLoading: boolean;
  error: string | undefined;
} = {
  user: {} as User,
  isLoading: false,
  error: undefined,
};

const authSlice = createSlice({
  name: "auth-user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        getCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.user = action.payload;
          state.error = undefined;
        }
      )
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // add
      .addCase(createAccount.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        createAccount.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.error = undefined;
          state.user = action.payload;
        }
      )
      .addCase(createAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // update
      .addCase(updateAccount.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        updateAccount.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.error = undefined;

          state.user = action.payload;
        }
      )
      .addCase(updateAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLoading } = authSlice.actions;
export default authSlice.reducer;
