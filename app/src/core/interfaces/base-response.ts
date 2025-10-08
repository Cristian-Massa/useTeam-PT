export interface BaseResponse<T extends object> {
  data: T;
  status: number;
  message?: string;
  total?: number;
  count?: number;
  page?: number;
}

export interface WSBaseResponse<T extends object | null> {
  data: T;
  message?: string;
  roomName?: string;
}
