export interface UserType {
  id: number;
  name: string;
  role: string;
  team: string;
  status: "active" | "paused" | "vacation";
  age: string;
  avatar: string;
  email: string;
}

export interface ColumnType {
  name: string;
  uid: string;
  sortable?: boolean;
}

