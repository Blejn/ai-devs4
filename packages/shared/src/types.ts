export interface TaskResult {
  taskId: string;
  answer: unknown;
  status: "pending" | "success" | "error";
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
