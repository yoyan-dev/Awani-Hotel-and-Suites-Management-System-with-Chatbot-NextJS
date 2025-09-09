export interface User {
  id: string;
  full_name: string;
  email: string;
  password_hash: string;
  role: "admin" | "front_office" | "housekeeping" | "guest";
  phone: string;
  address?: string;
  nationality?: string;
  birth_date?: string;
  gender?: string;
  image?: any;
  valid_id_image?: any;
  created_at: string;
}

export interface UserState {
  users: User[];
  user: User;
  isLoading: boolean;
  error: string | undefined;
}
