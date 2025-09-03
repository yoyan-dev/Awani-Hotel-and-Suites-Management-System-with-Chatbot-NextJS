export type StaffRole =
  | "admin"
  | "frontdesk"
  | "housekeeping"
  | "maintenance"
  | "manager";
export type StaffStatus = "active" | "inactive" | "on_leave" | "terminated";

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: StaffRole;
  status: StaffStatus;
  hire_date: string;
  shift?: string;
  assigned_rooms?: string[];
  created_at: string;
}

export interface StaffState {
  staff: Staff[];
  isLoading: boolean;
  error: string | null;
}
