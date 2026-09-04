import React from 'react';
import { Link } from 'react-router-dom';
import { useCollection } from '../hooks/useCollection';
import { Loading } from '../../../components/ui/Loading';

export function CollectionPage() {
  const {
    items,
    rawItems,
    isLoading,
    error,
    toastMessage,
    activeFilter,
    setActiveFilter,
    isSubmittingId,
    reservedCount,
    collectedCount,
    totalCount,
    markAsCollected,
    clearToast,
  } = useCollection();

  if (isLoading) {
    return <Loading message="Loading Collection Handover Registry..." />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      {/* Top Demo Module Banner */}
      <div className="bg-emerald-900/10 border-b border-emerald-200/50 py-2.5 px-4 text-xs font-semibold text-emerald-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-wider">
              MODULE: IT24101365
            </span>
            <span className="font-bold">COLLECTION & IMPACT TRACKING</span>
            <span className="text-slate-400 hidden md:inline">•</span>
            <span className="text-slate-600 hidden md:inline">University Hackathon Demo • Sri Lanka Mutual Aid Operational Core</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Registry Live Sync Active</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Success Toast Alert */}
        {toastMessage && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl shadow-sm flex items-center justify-between transition-all animate-fadeIn">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                ✓
              </span>
              <p className="text-sm font-medium">{toastMessage}</p>
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

        {/* Main Header & Summary Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-700 uppercase">
              <span className="w-4 h-4 rounded bg-emerald-100 flex items-center justify-center text-[10px]">📋</span>
              <span>IN-PERSON HANDOVER QUEUE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Collection Management
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl">
              Coordinate in-person handover and verify completion for reserved surplus food batches across partner hubs.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto">
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 text-center min-w-[90px]">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">RESERVED</div>
              <div className="text-2xl font-black text-amber-600">
                {reservedCount} <span className="text-xs font-normal text-slate-500">batch</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 text-center min-w-[90px]">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">COLLECTED</div>
              <div className="text-2xl font-black text-emerald-600">
                {collectedCount} <span className="text-xs font-normal text-slate-500">batch</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 text-center min-w-[90px]">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL</div>
              <div className="text-2xl font-black text-slate-800">
                {totalCount} <span className="text-xs font-normal text-slate-500">batch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Standard Protocol Workflow Section */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900">Standard Protocol Workflow</h2>
              <p className="text-xs text-slate-500">All surplus distributions follow our verified chain of custody</p>
            </div>
            <div className="bg-slate-100 border border-slate-200 rounded-full px-3 py-1 text-[11px] font-semibold text-slate-600 flex items-center gap-1.5 self-start sm:self-auto">
              <span>🔒</span> Zero Delivery Logistics • Physical Pickup Only
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500"></div>
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 bg-amber-100 text-amber-800 font-bold text-xs rounded-full flex items-center justify-center">1</span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase">INITIAL HOLD</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">1. Reserved</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Beneficiary or welfare representative claims the listing online. Food batch locked in kitchen storage pantry.
              </p>
            </div>

            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div>
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full flex items-center justify-center">2</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase">HANDOVER COMPLETE</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">2. Collected</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Claimant presents digital verification ID at counter. Batch handed over and marked closed in civic ledger.
              </p>
            </div>
          </div>
        </div>

        {/* Guidelines and Network Hubs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-br from-indigo-50/40 via-white to-emerald-50/30 border border-emerald-100 rounded-2xl p-6 shadow-sm space-y-3">
            <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              IN-PERSON VERIFICATION SAFETY CODE
            </div>
            <h3 className="text-lg font-bold text-slate-900">Zero-Waste Mutual Handover Guidelines</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Providers must verify Claimant IDs prior to status transition. Food items remaining past collection windows are re-allocated to priority emergency shelters.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-100/80 text-emerald-800 px-3 py-1 rounded-full">
                ✓ Safe Seal Checked
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-100/80 text-blue-800 px-3 py-1 rounded-full">
                ⏱ 1-Hr Buffer Policy
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">MUTUAL AID NETWORK HUBS</span>
              <span className="text-slate-400 text-xs">🏢</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-700 font-medium">Jaffna Town (Main St Hub)</span>
                <span className="text-emerald-600 font-bold text-[11px]">Active</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-700 font-medium">Colombo (Kollupitiya Centre)</span>
                <span className="text-amber-600 font-bold text-[11px]">Ready</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-700 font-medium">Galle Community Kitchen</span>
                <span className="text-emerald-600 font-bold text-[11px]">Completed</span>
              </li>
            </ul>
            <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1">
              <span>🔄</span> 3 Distribution Nodes Synced
            </div>
          </div>
        </div>

        {/* Active Collection Handover Registry Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Active Collection Handover Registry</h2>
              <p className="text-xs text-slate-500">Real-time batches awaiting physical receipt handover.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeFilter === 'ALL'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All ({totalCount})
              </button>
              <button
                onClick={() => setActiveFilter('RESERVED')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeFilter === 'RESERVED'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                Reserved ({reservedCount})
              </button>
              <button
                onClick={() => setActiveFilter('COLLECTED')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeFilter === 'COLLECTED'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                Collected ({collectedCount})
              </button>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
              <p className="text-slate-500 font-medium">No collection records found for selected filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">FOOD ITEM & PORTIONS</th>
                    <th className="py-3 px-4">CLAIMANT / BENEFICIARY</th>
                    <th className="py-3 px-4">HANDOVER LOCATION</th>
                    <th className="py-3 px-4">SCHEDULED TIME</th>
                    <th className="py-3 px-4">CURRENT STATUS</th>
                    <th className="py-3 px-4 text-right">VERIFICATION ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => {
                    const isCollected = item.status === 'Collected' || item.status === 'Completed';
                    const isReserved = item.status === 'Reserved';

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                          <div className="text-slate-500 flex items-center gap-1 mt-0.5">
                            <span>📦</span> {item.quantity} {item.unit}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900">{item.claimant}</div>
                          <div className="text-[10px] text-slate-400 font-mono">ID: #{item.claimantId}</div>
                        </td>

                        <td className="py-4 px-4 text-slate-700">
                          <div className="flex items-center gap-1 font-medium">
                            <span className="text-slate-400">📍</span> {item.location}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-medium text-slate-800">{item.scheduledTime}</div>
                          {item.timeHint && (
                            <div className="text-[10px] text-amber-700 font-semibold">{item.timeHint}</div>
                          )}
                        </td>

                        <td className="py-4 px-4">
                          {isCollected ? (
                            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-bold text-[11px] px-2.5 py-1 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                              COLLECTED
                            </span>
                          ) : isReserved ? (
                            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 font-bold text-[11px] px-2.5 py-1 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                              RESERVED
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 font-bold text-[11px] px-2.5 py-1 rounded-full">
                              {item.status}
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4 text-right">
                          {isCollected ? (
                            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 font-semibold text-xs px-3 py-1.5 rounded-lg border border-slate-200">
                              ✓ Collected
                            </span>
                          ) : (
                            <button
                              onClick={() => markAsCollected(item.id)}
                              disabled={isSubmittingId === item.id}
                              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 ml-auto disabled:opacity-50"
                            >
                              <span>✓</span>
                              {isSubmittingId === item.id ? 'Updating...' : 'Mark as Collected'}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Log Action Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">🛡️</span>
              Physical Audit & Mutual Aid Log
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl">
              Every physical status change directly updates our food sovereignty metrics, ensuring donors and beneficiaries remain synchronized.
            </p>
          </div>

          <div className="flex items-center gap-3 self-stretch md:self-auto">
            <Link to="/impact" className="w-full md:w-auto">
              <button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs px-4 py-2.5 rounded-xl transition-all">
                View Impact Ledger
              </button>
            </Link>
            <Link to="/post-food" className="w-full md:w-auto">
              <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all">
                Post New Surplus
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
