import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchHousekeepingParams,
  HousekeepingPagination,
  HousekeepingTask,
} from "@/types/housekeeping";
import { addToast } from "@heroui/react";

const apiUrl = "/api/housekeeping";

export const fetchHousekeepingTasks = createAsyncThunk<
  { data: HousekeepingTask[]; pagination: HousekeepingPagination },
  FetchHousekeepingParams | undefined
>(
  "housekeeping/fetchHousekeepingTasks",
  async (params, { rejectWithValue }) => {
    try {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append("page", String(params.page));
      if (params?.query) searchParams.append("q", params.query);
      if (params?.status) searchParams.append("status", params.status);

      const res = await fetch(`${apiUrl}?${searchParams.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        addToast(data.message);
        return rejectWithValue(
          data.message?.description ?? "Failed to fetch housekeeping tasks"
        );
      }
      return data as {
        data: HousekeepingTask[];
        pagination: HousekeepingPagination;
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchHousekeepingTask = createAsyncThunk<HousekeepingTask, string>(
  "housekeeping/fetchHousekeepingTask",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${apiUrl}/${id}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        addToast(data.message);
        return rejectWithValue(
          data.message?.description ?? "Failed to fetch housekeeping task"
        );
      }
      return data.data;
    } catch (error: any) {
      addToast({
        title: "Error",
        description: error.message,
        color: "danger",
      });
      return rejectWithValue(error.message);
    }
  }
);

export const addHousekeepingTask = createAsyncThunk<
  HousekeepingTask,
  HousekeepingTask
>(
  "housekeeping/addHousekeepingTask",
  async (housekeeping, { rejectWithValue }) => {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(housekeeping),
      });
      const data = await res.json();
      addToast(data.message);
      if (!res.ok || !data.success) {
        return rejectWithValue(
          data.message?.description ?? "Failed to add housekeeping task"
        );
      }
      return data.data;
    } catch (err: any) {
      console.log(err.message);
      addToast({
        title: "Error",
        description: err.message,
        color: "danger",
      });
      return rejectWithValue(err.message);
    }
  }
);

// UPDATE
export const updateHousekeepingTask = createAsyncThunk<
  HousekeepingTask,
  HousekeepingTask,
  { rejectValue: string }
>(
  "housekeeping/updateHousekeepingTask",
  async (housekeeping, { rejectWithValue }) => {
    try {
      const res = await fetch(`${apiUrl}/${housekeeping.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(housekeeping),
      });

      const data = await res.json();
      addToast(data.message);

      if (!res.ok || !data.success) {
        return rejectWithValue(
          data.message?.description ?? "Failed to update housekeeping task"
        );
      }

      return data.data;
    } catch (err: any) {
      addToast({
        title: "Error",
        description: err.message,
        color: "danger",
      });
      return rejectWithValue(err.message);
    }
  }
);

// DELETE
export const deleteHousekeepingTask = createAsyncThunk<string, string>(
  "housekeeping/deleteHousekeepingTask",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      const data = await res.json();

      addToast(data.message);
      if (!res.ok || !data.success) {
        return rejectWithValue(
          data.message?.description ?? "Failed to delete housekeeping task"
        );
      }

      return data.data;
    } catch (error: any) {
      addToast({
        title: "Error",
        description: error.message,
        color: "danger",
      });
      return rejectWithValue(error.message);
    }
  }
);

//  delete selected rooms or all
export const deleteSelectedHousekeepingTask = createAsyncThunk<
  HousekeepingTask[],
  { selectedValues: Set<number> | "all" },
  { rejectValue: string }
>(
  "housekeeping/deleteSelectedHousekeepingTask",
  async ({ selectedValues }, thunkAPI) => {
    try {
      const body =
        selectedValues === "all"
          ? { selectedValues: "all" }
          : { selectedValues: Array.from(selectedValues) };

      const res = await fetch(apiUrl, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      addToast(data.message);
      if (!res.ok) return thunkAPI.rejectWithValue(data.error);

      return data.data;
    } catch (err: any) {
      addToast({
        title: "Error",
        description: err.message,
        color: "danger",
      });
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
