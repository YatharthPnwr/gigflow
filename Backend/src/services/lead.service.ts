import Lead, { ILead } from '../models/Lead.model';
import { AppError } from '../middleware/error.middleware';
import {
  CreateLeadBody,
  UpdateLeadBody,
  LeadQueryParams,
  PaginatedResponse,
  LeadWithCreator,
} from '../types';

const PAGE_LIMIT = 10;

export const createLead = async (
  body: CreateLeadBody,
  userId: string
): Promise<ILead> => {
  return Lead.create({ ...body, createdBy: userId });
};

export const getLeads = async (
  params: LeadQueryParams
): Promise<PaginatedResponse<LeadWithCreator>> => {
  const { status, source, search, sort = 'latest', page = '1', limit } = params;

  const filter: Record<string, unknown> = {};

  if (status) filter['status'] = status;
  if (source) filter['source'] = source;
  if (search) {
    filter['$or'] = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const pageNum = Math.max(1, parseInt(page, 10));
  const pageLimit = limit ? parseInt(limit, 10) : PAGE_LIMIT;
  const skip = (pageNum - 1) * pageLimit;
  const sortOrder = sort === 'oldest' ? 1 : -1;

  const [data, total] = await Promise.all([
    Lead.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(pageLimit)
      .lean() as unknown as Promise<LeadWithCreator[]>,
    Lead.countDocuments(filter),
  ]);

  return {
    success: true,
    data,
    pagination: {
      total,
      page: pageNum,
      limit: pageLimit,
      totalPages: Math.ceil(total / pageLimit),
    },
  };
};

export const getLeadById = async (id: string): Promise<LeadWithCreator> => {
  const lead = await (Lead.findById(id)
    .populate('createdBy', 'name email')
    .lean() as unknown as Promise<LeadWithCreator | null>);

  if (!lead) throw new AppError('Lead not found', 404);
  return lead;
};

export const updateLead = async (
  id: string,
  body: UpdateLeadBody
): Promise<ILead> => {
  const lead = await Lead.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!lead) throw new AppError('Lead not found', 404);
  return lead;
};

export const deleteLead = async (id: string): Promise<void> => {
  const lead = await Lead.findByIdAndDelete(id);
  if (!lead) throw new AppError('Lead not found', 404);
};

export const exportLeadsCSV = async (params: LeadQueryParams): Promise<string> => {
  const { status, source, search } = params;

  const filter: Record<string, unknown> = {};
  if (status) filter['status'] = status;
  if (source) filter['source'] = source;
  if (search) {
    filter['$or'] = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const leads = await Lead.find(filter)
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 })
    .lean();

  const header = 'Name,Email,Status,Source,Created At\n';
  const rows = leads
    .map((l) => `"${l.name}","${l.email}","${l.status}","${l.source}","${l.createdAt.toISOString()}"`)
    .join('\n');

  return header + rows;
};
