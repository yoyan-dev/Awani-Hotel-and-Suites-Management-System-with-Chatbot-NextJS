import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, UserState } from "@/types/users";
import {
  fetchUser,
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  deleteSelectedUser,
} from "./user-thunk";

const initialState: UserState = {
  users: [],
  user: {} as User,
  isLoading: false,
  error: undefined,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // get single room
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = undefined;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // get all rooms
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.users = action.payload;
        state.error = undefined;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // add room
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.error = undefined;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // update room
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.error = undefined;
        const index = state.users.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // delete room
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.users = state.users.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // delete rooms
      .addCase(deleteSelectedUser.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(deleteSelectedUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.users = state.users.filter(
          (r) => !action.payload.map((room) => room.id).includes(r.id)
        );
      })
      .addCase(deleteSelectedUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLoading } = userSlice.actions;
export default userSlice.reducer;
