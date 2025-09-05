export interface ApiResponse<T = any> {
  success: boolean;
  message: {
    title: string;
    description: any;
    color: "success" | "error" | "warning" | "danger";
  };
  data?: T;
  error?: string;
}
