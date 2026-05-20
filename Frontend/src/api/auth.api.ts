import api from './axios';
import type { ApiResponse, AuthResponse } from '../types';

export const registerApi = (data: { name: string; email: string; password: string; role?: string }) =>
  api.post<ApiResponse<AuthResponse>>('/auth/register', data).then((r) => r.data);

export const loginApi = (data: { email: string; password: string }) =>
  api.post<ApiResponse<AuthResponse>>('/auth/login', data).then((r) => r.data);
