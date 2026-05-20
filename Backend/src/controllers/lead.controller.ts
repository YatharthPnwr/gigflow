import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, LeadQueryParams } from '../types';
import * as leadService from '../services/lead.service';

export const createLead = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const lead = await leadService.createLead(req.body, req.user.id);
    res.status(201).json({ success: true, message: 'Lead created', data: lead });
  } catch (err) {
    next(err);
  }
};

export const getLeads = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await leadService.getLeads(req.query as LeadQueryParams);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getLeadById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const lead = await leadService.getLeadById(req.params['id'] as string);
    res.status(200).json({ success: true, message: 'Lead fetched', data: lead });
  } catch (err) {
    next(err);
  }
};

export const updateLead = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const lead = await leadService.updateLead(req.params['id'] as string, req.body);
    res.status(200).json({ success: true, message: 'Lead updated', data: lead });
  } catch (err) {
    next(err);
  }
};

export const deleteLead = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await leadService.deleteLead(req.params['id'] as string);
    res.status(200).json({ success: true, message: 'Lead deleted' });
  } catch (err) {
    next(err);
  }
};

export const exportCSV = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const csv = await leadService.exportLeadsCSV(req.query as LeadQueryParams);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"');
    res.status(200).send(csv);
  } catch (err) {
    next(err);
  }
};
