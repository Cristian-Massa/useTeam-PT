export interface BaseResponse<T extends object> {
  data: T;
  status: number;
  message?: string;
  total?: number;
  count?: number;
  page?: number;
}

export interface AuthResponse extends BaseResponse<{ accessToken?: string }> {
  refreshToken?: string;
}
