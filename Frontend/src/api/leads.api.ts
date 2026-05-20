import api from './axios';
import type { ApiResponse, PaginatedResponse, Lead, LeadFilters, CreateLeadDto, UpdateLeadDto } from '../types';

export const getLeadsApi = (filters: LeadFilters) => {
  const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);
  if (filters.source) params.set('source', filters.source);
  if (filters.search) params.set('search', filters.search);
  if (filters.sort) params.set('sort', filters.sort);
  if (filters.page) params.set('page', String(filters.page));
  return api.get<PaginatedResponse<Lead>>(`/leads?${params}`).then((r) => r.data);
};

export const getLeadByIdApi = (id: string) =>
  api.get<ApiResponse<Lead>>(`/leads/${id}`).then((r) => r.data);

export const createLeadApi = (data: CreateLeadDto) =>
  api.post<ApiResponse<Lead>>('/leads', data).then((r) => r.data);

export const updateLeadApi = (id: string, data: UpdateLeadDto) =>
  api.patch<ApiResponse<Lead>>(`/leads/${id}`, data).then((r) => r.data);

export const deleteLeadApi = (id: string) =>
  api.delete<ApiResponse>(`/leads/${id}`).then((r) => r.data);

export const exportCSVApi = (filters: LeadFilters) => {
  const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);
  if (filters.source) params.set('source', filters.source);
  if (filters.search) params.set('search', filters.search);
  return api.get(`/leads/export/csv?${params}`, { responseType: 'blob' }).then((r) => r.data as Blob);
};
