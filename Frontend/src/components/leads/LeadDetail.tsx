import type { Lead } from '../../types';
import { StatusBadge, SourceBadge } from '../ui/Badge';
import { Modal } from '../ui/Modal';

interface LeadDetailProps {
  lead: Lead | null;
  onClose: () => void;
}

export const LeadDetail = ({ lead, onClose }: LeadDetailProps) => (
  <Modal open={!!lead} onClose={onClose} title="Lead Details">
    {lead && (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Name</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{lead.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Email</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{lead.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Status</p>
            <StatusBadge status={lead.status} />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Source</p>
            <SourceBadge source={lead.source} />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Created By</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{lead.createdBy?.name ?? '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Created At</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{new Date(lead.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    )}
  </Modal>
);
