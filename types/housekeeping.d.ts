export type HousekeepingTaskType =
  | "room_preparation"
  | "amenity_setup"
  | "minibar_refill"
  | "safety_check"
  | "daily_cleaning"
  | "linen_change"
  | "turndown_service"
  | "checkout_cleaning"
  | "lost_and_found"
  | "inventory_restock"
  | "maintenance_report"
  | "custom";

export type TaskStatus = "pending" | "in_progress" | "done" | "cancelled";

export interface HousekeepingTask {
  id: string;
  room_id?: string;
  guest_name?: string;
  task_type: HousekeepingTaskType;
  description?: string;
  scheduled_time?: string;
  arrival_date?: string;
  status?: TaskStatus;
  room?: any;
  createdAt: string;
}

export interface HousekeepingPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface FetchHousekeepingParams {
  page?: number;
  query?: string;
  status?: string | undefined;
}

export interface HousekeepingState {
  tasks: HousekeepingTask[];
  task: HousekeepingTask;
  pagination: HousekeepingPagination | null;
  isLoading: boolean;
  error: string | undefined;
}
