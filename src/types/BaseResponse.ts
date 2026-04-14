export interface IBaseResponse<T = unknown> {
  code?: number;
  message?: string;
  data?: T;
}

