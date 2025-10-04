export interface Staff {
  id: string;
  image: string;
  full_name: string;
  role: "housekeeping" | "admin" | string;
  position?: string;
  email?: string;
  phone?: string;
  shift_type?: "AM" | "MID" | "PM" | "GY" | "N/A" | string;
  status: "active" | "inactive" | "onLeave";
  createdAt: Date;
}

export interface StaffState {
  lists: Staff[];
  list: Staff;
  isLoading: boolean;
  error?: string | undefined;
}
