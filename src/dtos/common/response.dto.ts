export interface APIResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}
