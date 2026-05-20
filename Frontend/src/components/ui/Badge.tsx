import type { LeadStatus, LeadSource } from '../../types';

const statusColor: Record<LeadStatus, string> = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-yellow-100 text-yellow-700',
  Qualified: 'bg-green-100 text-green-700',
  Lost: 'bg-red-100 text-red-700',
};

const sourceColor: Record<LeadSource, string> = {
  Website: 'bg-purple-100 text-purple-700',
  Instagram: 'bg-pink-100 text-pink-700',
  Referral: 'bg-orange-100 text-orange-700',
};

export const StatusBadge = ({ status }: { status: LeadStatus }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[status]}`}>{status}</span>
);

export const SourceBadge = ({ source }: { source: LeadSource }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${sourceColor[source]}`}>{source}</span>
);
