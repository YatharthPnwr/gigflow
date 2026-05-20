import type { LeadFilters, LeadStatus, LeadSource, SortOrder } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface LeadFiltersProps {
  filters: LeadFilters;
  searchValue: string;
  onSearchChange: (val: string) => void;
  onChange: (filters: LeadFilters) => void;
}

const STATUS_OPTIONS = [
  { value: 'New', label: 'New' },
  { value: 'Contacted', label: 'Contacted' },
  { value: 'Qualified', label: 'Qualified' },
  { value: 'Lost', label: 'Lost' },
];

const SOURCE_OPTIONS = [
  { value: 'Website', label: 'Website' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Referral', label: 'Referral' },
];

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
];

export const LeadFiltersBar = ({ filters, searchValue, onSearchChange, onChange }: LeadFiltersProps) => {
  const update = (key: keyof LeadFilters, value: string) =>
    onChange({ ...filters, [key]: value || undefined, page: 1 });

  return (
    <div className="flex flex-wrap gap-3 items-end">
      <div className="flex-1 min-w-48">
        <Input
          placeholder="Search by name or email..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select
        options={STATUS_OPTIONS}
        placeholder="All Statuses"
        value={filters.status ?? ''}
        onChange={(e) => update('status', e.target.value as LeadStatus)}
        className="w-40"
      />
      <Select
        options={SOURCE_OPTIONS}
        placeholder="All Sources"
        value={filters.source ?? ''}
        onChange={(e) => update('source', e.target.value as LeadSource)}
        className="w-40"
      />
      <Select
        options={SORT_OPTIONS}
        value={filters.sort ?? 'latest'}
        onChange={(e) => update('sort', e.target.value as SortOrder)}
        className="w-36"
      />
    </div>
  );
};
