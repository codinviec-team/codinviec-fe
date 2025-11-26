export interface IBaseResponse<T = unknown> {
  code?: number; // HTTP status code từ BE
  message?: string;
  data?: T;
}

