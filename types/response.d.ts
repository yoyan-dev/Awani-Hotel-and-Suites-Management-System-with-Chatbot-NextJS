export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface ApiResponse<T = any> {
  success: boolean;
  message: {
    title: string;
    description: any;
    color: "success" | "error" | "warning" | "danger";
  };
  data?: T;
  pagination?: Pagination;
  error?: string;
}
