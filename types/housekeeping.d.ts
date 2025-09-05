export type HousekeepingStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "delayed"
  | "cancelled";

export interface Housekeeping {
  id: string;
  room_id: string;
  staff_id: string;
  title: string;
  attachment: any;
  priority: "N/A" | "high" | "medium" | "low";
  category: "repair" | "service" | "inspection" | "safety";
  area: string;
  scheduled_date: string;
  start_time?: string;
  end_time?: string;
  notes?: string;
  rooms: any;
  users: any;
  status: HousekeepingStatus;
  created_at: string;
}

export interface HousekeepingState {
  tasks: Housekeeping[];
  task: Housekeeping;
  isLoading: boolean;
  error: string | undefined;
}
