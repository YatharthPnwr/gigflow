import { Request } from 'express';
import { Types } from 'mongoose';
import { UserRole } from '../models/User.model';
import { LeadStatus, LeadSource } from '../models/Lead.model';

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface JwtPayload {
  id: string;
  role: UserRole;
}

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

// ─── Request Bodies ───────────────────────────────────────────────────────────

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface CreateLeadBody {
  name: string;
  email: string;
  status?: LeadStatus;
  source: LeadSource;
}

export interface UpdateLeadBody {
  name?: string;
  email?: string;
  status?: LeadStatus;
  source?: LeadSource;
}

// ─── Query Params ─────────────────────────────────────────────────────────────

export interface LeadQueryParams {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: 'latest' | 'oldest';
  page?: string;
  limit?: string;
}

// ─── API Responses ────────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ─── Lead ─────────────────────────────────────────────────────────────────────

export interface LeadWithCreator {
  _id: Types.ObjectId;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdBy: {
    _id: Types.ObjectId;
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// ─── Re-exports (so consumers import from one place) ─────────────────────────

export type { UserRole, LeadStatus, LeadSource };
