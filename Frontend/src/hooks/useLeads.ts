import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLeadsApi, createLeadApi, updateLeadApi, deleteLeadApi } from '../api/leads.api';
import type { LeadFilters, CreateLeadDto, UpdateLeadDto } from '../types';

export const useLeads = (filters: LeadFilters) =>
  useQuery({
    queryKey: ['leads', filters],
    queryFn: () => getLeadsApi(filters),
  });

export const useCreateLead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateLeadDto) => createLeadApi(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['leads'] }),
  });
};

export const useUpdateLead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLeadDto }) => updateLeadApi(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['leads'] }),
  });
};

export const useDeleteLead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLeadApi(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['leads'] }),
  });
};
