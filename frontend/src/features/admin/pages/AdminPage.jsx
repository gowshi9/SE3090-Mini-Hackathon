import React from 'react';
import { useAdmin } from '../hooks/useAdmin';
import { AdminStatsCards } from '../components/AdminStatsCards';
import { AdminListingsTable } from '../components/AdminListingsTable';
import { AdminReservationsTable } from '../components/AdminReservationsTable';
import { Loading } from '../../../components/ui/Loading';

export function AdminPage() {
  const {
    stats,
    listings,
    reservations,
    isLoading,
    error,
    successToast,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    activeTab,
    setActiveTab,
    isUpdatingId,
    handleStatusChange,
    clearToast,
  } = useAdmin();

  if (isLoading) {
    return <Loading message="Loading FoodRescue LK Admin Portal..." />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      {/* Top Admin Bar */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-3 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              FoodRescue LK
            </span>
            <span className="bg-emerald-700 text-white font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full tracking-wider">
              ADMIN PORTAL | GOVERNANCE
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              LIVE OPERATIONS LK
            </span>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full text-slate-300">
              <span>👤</span>
              <span className="font-semibold text-white">System Administrator</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Success Toast */}
        {successToast && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl shadow-sm flex items-center justify-between transition-all animate-fadeIn">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                ✓
              </span>
              <p className="text-sm font-medium">{successToast}</p>
            </div>
            <button
              onClick={clearToast}
              className="text-emerald-700 hover:text-emerald-900 font-bold text-lg px-2"
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl shadow-sm text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Header & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
              NATIONAL COMMAND PULSE • WESTERN & NORTHERN SECTORS
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Platform Overview & Health
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Real-time operational pulse, food inventory audit, and user governance across Sri Lankan mutual aid hubs.
            </p>
          </div>

          {/* Admin Navigation Tabs */}
          <div className="flex items-center gap-2 bg-slate-200/70 p-1 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-300/60'
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'listings'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-300/60'
              }`}
            >
              📦 Food Listings ({listings.length})
            </button>
            <button
              onClick={() => setActiveTab('reservations')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'reservations'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-300/60'
              }`}
            >
              📑 Reservations ({reservations.length})
            </button>
          </div>
        </div>

        {/* Platform Overview Stats */}
        <AdminStatsCards stats={stats} />

        {/* Tab 1: Overview Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            {/* Recent Activity & Audit Trail */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Recent Activity & Audit Trail</h2>
                  <p className="text-xs text-slate-500">Live operational events logged in mutual aid ledger.</p>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AUTO-REFRESHING</span>
              </div>

              <div className="space-y-3">
                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 flex items-start gap-3">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                    ➕
                  </span>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">New food listing posted</span>
                      <span className="text-slate-400 font-mono text-[10px]">4 mins ago</span>
                    </div>
                    <p className="text-slate-600">
                      <strong className="text-slate-800">20 portions</strong> of Fresh Bread Packets in Jaffna Town by <strong className="text-slate-800">Jaffna Bakers</strong>.
                    </p>
                    <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">Ready for Distribution</span>
                  </div>
                </div>

                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 flex items-start gap-3">
                  <span className="w-8 h-8 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                    📑
                  </span>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">New reservation created</span>
                      <span className="text-slate-400 font-mono text-[10px]">12 mins ago</span>
                    </div>
                    <p className="text-slate-600">
                      <strong className="text-slate-800">5 portions</strong> claimed by <strong className="text-slate-800">Kavindi P.</strong>
                    </p>
                    <span className="inline-block bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">Hold Expiry: 45m</span>
                  </div>
                </div>

                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 flex items-start gap-3">
                  <span className="w-8 h-8 bg-blue-100 text-blue-800 rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                    ✓
                  </span>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Food collection completed</span>
                      <span className="text-slate-400 font-mono text-[10px]">1 hr ago</span>
                    </div>
                    <p className="text-slate-600">
                      <strong className="text-slate-800">12 portions</strong> verified in <strong className="text-slate-800">Galle Fort Hub</strong>.
                    </p>
                    <span className="inline-block bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">Thermal Seal Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hub Dispatch Ratios & Emergency Actions */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-base">Hub Dispatch Ratios</h3>
                <div className="flex items-center justify-around py-4">
                  <div className="text-center">
                    <div className="text-2xl font-black text-emerald-700">55%</div>
                    <div className="text-[11px] text-slate-500 font-medium">Colombo</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-amber-600">25%</div>
                    <div className="text-[11px] text-slate-500 font-medium">Galle</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-blue-600">20%</div>
                    <div className="text-[11px] text-slate-500 font-medium">Jaffna</div>
                  </div>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 font-medium flex items-center gap-2">
                  <span>🛡️</span> Sri Lanka Standards (SLSI) Audit: 100% Pass Rate
                </div>
              </div>

              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-3">
                <h3 className="font-bold text-base">Emergency Response Triggers</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Trigger emergency distribution alerts to local community kitchens when surplus batches exceed 50+ meals nearing expiry.
                </p>
                <div className="flex gap-2 pt-1">
                  <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 rounded-xl transition-all">
                    Broadcast Alert
                  </button>
                  <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2 rounded-xl transition-all border border-slate-700">
                    Audit Export
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Food Listings Management */}
        {activeTab === 'listings' && (
          <AdminListingsTable
            listings={listings}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onStatusChange={handleStatusChange}
            isUpdatingId={isUpdatingId}
          />
        )}

        {/* Tab 3: Reservations Management */}
        {activeTab === 'reservations' && (
          <AdminReservationsTable reservations={reservations} />
        )}
      </div>
    </div>
  );
}
