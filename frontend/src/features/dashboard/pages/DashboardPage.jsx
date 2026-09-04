import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { DashboardStats } from '../components/DashboardStats';
import { FoodStatusList } from '../components/FoodStatusList';
import { Loading } from '../../../components/ui/Loading';

/**
 * Page component for Member 4 - Dashboard & Management.
 */
export function DashboardPage() {
  const { stats, listings, isLoading, handleStatusChange } = useDashboard();

  if (isLoading) {
    return <Loading message="Loading dashboard analytics..." />;
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Donor & NGO Dashboard</h1>
          <p className="text-slate-600 mt-1">Track community impact and manage active surplus food listings.</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/collection"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            📋 Collection Queue
          </a>
          <a
            href="/impact"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            📊 Impact Dashboard
          </a>
        </div>
      </div>

      <DashboardStats stats={stats} />
      <FoodStatusList listings={listings} onStatusChange={handleStatusChange} />
    </div>
  );
}
