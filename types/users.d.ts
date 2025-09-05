export interface User {
  user_id: number;
  full_name: string;
  email: string;
  password_hash: string;
  role: "admin" | "front_office" | "housekeeping" | "guest";
  phone: string;
  created_at: Date;
}
