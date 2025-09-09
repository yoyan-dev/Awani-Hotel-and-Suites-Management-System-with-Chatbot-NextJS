import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/types/users";
import { apiHandler } from "@/lib/api-handler";

const apiUrl = "/api/auth";

// GET ALL
export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await apiHandler<User[]>(fetch(apiUrl), "Failed to fetch users");
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// GET ONE
export const fetchUser = createAsyncThunk<User, string>(
  "users/fetchUser",
  async (id, { rejectWithValue }) => {
    try {
      return await apiHandler<User>(
        fetch(`${apiUrl}/${id}`),
        "Failed to fetch user"
      );
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// CREATE
export const createAuthUser = createAsyncThunk<User, FormData>(
  "auth/createAuthUser",
  async (formData, { rejectWithValue }) => {
    try {
      return await apiHandler<User>(
        fetch(apiUrl, { method: "POST", body: formData }),
        "Failed to register new user"
      );
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// UPDATE
export const updateUser = createAsyncThunk<User, User>(
  "users/updateUser",
  async (user, { rejectWithValue }) => {
    try {
      return await apiHandler<User>(
        fetch(`${apiUrl}/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }),
        "Failed to update user"
      );
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// DELETE ONE
export const deleteUser = createAsyncThunk<string, string>(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      return await apiHandler<string>(
        fetch(`${apiUrl}/${id}`, { method: "DELETE" }),
        "Failed to delete user"
      );
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// DELETE MANY
export const deleteSelectedUser = createAsyncThunk<
  User[],
  { selectedValues: Set<string> | "all" }
>(
  "users/deleteSelectedUser",
  async ({ selectedValues }, { rejectWithValue }) => {
    try {
      const body =
        selectedValues === "all"
          ? { selectedValues: "all" }
          : { selectedValues: Array.from(selectedValues) };

      return await apiHandler<User[]>(
        fetch(apiUrl, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }),
        "Failed to delete selected users"
      );
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
