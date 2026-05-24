import type { Lead } from '../../types';
import { StatusBadge, SourceBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/auth.store';

interface LeadTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onView: (lead: Lead) => void;
}

export const LeadTable = ({ leads, onEdit, onDelete, onView }: LeadTableProps) => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <tr>
            {['Name', 'Email', 'Status', 'Source', 'Created', 'Actions'].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {leads.map((lead) => (
            <tr key={lead._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer" onClick={() => onView(lead)}>
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{lead.name}</td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{lead.email}</td>
              <td className="px-4 py-3"><StatusBadge status={lead.status} /></td>
              <td className="px-4 py-3"><SourceBadge source={lead.source} /></td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => onView(lead)} className="text-xs px-2 py-1">View</Button>
                  <Button variant="secondary" onClick={() => onEdit(lead)} className="text-xs px-2 py-1">Edit</Button>
                  {isAdmin && (
                    <Button variant="danger" onClick={() => onDelete(lead._id)} className="text-xs px-2 py-1">Delete</Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
