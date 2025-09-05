export interface User {
  id: string;
  full_name: string;
  email: string;
  password_hash: string;
  role: "admin" | "front_office" | "housekeeping" | "guest";
  phone: string;
  created_at: string;
}

export interface UserState {
  users: User[];
  user: User;
  isLoading: boolean;
  error: string | undefined;
}
