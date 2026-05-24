import { useState } from 'react';
import { useLeads, useCreateLead, useUpdateLead, useDeleteLead } from '../hooks/useLeads';
import { useDebounce } from '../hooks/useDebounce';
import { exportCSVApi } from '../api/leads.api';
import { downloadBlob } from '../utils/csv';
import { useAuthStore } from '../store/auth.store';
import type { Lead, LeadFilters } from '../types';
import { Navbar } from '../components/layout/Navbar';
import { LeadFiltersBar } from '../components/leads/LeadFilters';
import { LeadTable } from '../components/leads/LeadTable';
import { LeadDetail } from '../components/leads/LeadDetail';
import { LeadForm } from '../components/leads/LeadForm';
import { Modal } from '../components/ui/Modal';
import { Pagination } from '../components/ui/Pagination';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';

const Dashboard = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  const [filters, setFilters] = useState<LeadFilters>({ sort: 'latest', page: 1 });
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 500);

  const activeFilters = { ...filters, search: debouncedSearch || undefined };

  const { data, isLoading, isError, isFetching } = useLeads(activeFilters);

  const createLead = useCreateLead();
  const updateLead = useUpdateLead();
  const deleteLead = useDeleteLead();

  const [viewLead, setViewLead] = useState<Lead | null>(null);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [csvLoading, setCsvLoading] = useState(false);

  const handleDelete = (id: string) => {
    if (confirm('Delete this lead?')) deleteLead.mutate(id);
  };

  const handleExportCSV = async () => {
    setCsvLoading(true);
    try {
      const blob = await exportCSVApi(activeFilters);
      downloadBlob(blob, `leads-${Date.now()}.csv`);
    } finally {
      setCsvLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Leads</h1>
              {isFetching && !isLoading && <Spinner className="w-5 h-5" />}
            </div>
            {data && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{data.pagination.total} total leads</p>}
          </div>
          <div className="flex gap-3">
            {isAdmin && (
              <Button variant="secondary" onClick={handleExportCSV} loading={csvLoading}>
                Export CSV
              </Button>
            )}
            <Button onClick={() => setShowCreate(true)}>+ Add Lead</Button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <LeadFiltersBar
              filters={filters}
              searchValue={searchInput}
              onSearchChange={setSearchInput}
              onChange={setFilters}
            />
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <Spinner />
            </div>
          )}

          {isError && (
            <div className="text-center py-20">
              <p className="text-red-500 font-medium">Failed to load leads</p>
              <p className="text-sm text-gray-400 mt-1">Check your connection and try again</p>
            </div>
          )}

          {!isLoading && !isError && data?.data.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 font-medium">No leads found</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your filters or add a new lead</p>
            </div>
          )}

          {!isLoading && !isError && data && data.data.length > 0 && (
            <>
              <div className="relative">
                {isFetching && !isLoading && (
                  <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 z-10 flex items-center justify-center backdrop-blur-[1px]">
                    <Spinner />
                  </div>
                )}
                <LeadTable
                  leads={data.data}
                  onView={setViewLead}
                  onEdit={setEditLead}
                  onDelete={handleDelete}
                />
              </div>
              <Pagination
                pagination={data.pagination}
                onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
              />
            </>
          )}
        </div>
      </main>

      <LeadDetail lead={viewLead} onClose={() => setViewLead(null)} />

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Add Lead">
        <LeadForm
          loading={createLead.isPending}
          onSubmit={(data) => {
            createLead.mutate(data, { onSuccess: () => setShowCreate(false) });
          }}
        />
      </Modal>

      <Modal open={!!editLead} onClose={() => setEditLead(null)} title="Edit Lead">
        {editLead && (
          <LeadForm
            lead={editLead}
            loading={updateLead.isPending}
            onSubmit={(data) => {
              updateLead.mutate(
                { id: editLead._id, data },
                { onSuccess: () => setEditLead(null) }
              );
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
