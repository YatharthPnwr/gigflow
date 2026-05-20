export type UserRole = 'admin' | 'sales';
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type LeadSource = 'Website' | 'Instagram' | 'Referral';
export type SortOrder = 'latest' | 'oldest';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type Lead = {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdBy: { _id: string; name: string; email: string };
  createdAt: string;
  updatedAt: string;
};

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  success: boolean;
  data: T[];
  pagination: Pagination;
};

export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type LeadFilters = {
  status?: LeadStatus | '';
  source?: LeadSource | '';
  search?: string;
  sort?: SortOrder;
  page?: number;
};

export type CreateLeadDto = {
  name: string;
  email: string;
  status?: LeadStatus;
  source: LeadSource;
};

export type UpdateLeadDto = {
  name?: string;
  email?: string;
  status?: LeadStatus;
  source?: LeadSource;
};
