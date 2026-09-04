import React from 'react';
import { useImpact } from '../hooks/useImpact';
import { Loading } from '../../../components/ui/Loading';

export function ImpactPage() {
  const { stats, isLoading, error } = useImpact();

  if (isLoading || !stats) {
    return <Loading message="Calculating live community impact metrics..." />;
  }

  const {
    totalListings,
    totalReservations,
    foodRescued,
    completedCollections,
    co2ReducedKg,
    reliabilityIndex,
    categoryBreakdown,
  } = stats;

  // Calculate percentage breakdown for category bars
  const totalCategoryUnits = Object.values(categoryBreakdown).reduce((a, b) => a + b, 0) || 1;

  const categoryStyles = {
    'Cooked Meals': { bg: 'bg-emerald-800', border: 'border-emerald-600', text: 'text-emerald-800', dot: 'bg-emerald-800' },
    'Bakery Items': { bg: 'bg-amber-500', border: 'border-amber-400', text: 'text-amber-700', dot: 'bg-amber-500' },
    'Fruits & Veg': { bg: 'bg-emerald-500', border: 'border-emerald-400', text: 'text-emerald-600', dot: 'bg-emerald-500' },
    'Rice & Curry': { bg: 'bg-blue-600', border: 'border-blue-500', text: 'text-blue-700', dot: 'bg-blue-600' },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      {/* Top Banner */}
      <div className="bg-emerald-900/10 border-b border-emerald-200/50 py-2.5 px-4 text-xs font-semibold text-emerald-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-wider">
              MODULE: IT24101365
            </span>
            <span className="font-bold">Collection & Impact Tracking | University Hackathon Demo</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-700 font-medium">
            <span>🟡</span>
            <span>SAMPLE APPLICATION DATA FOR HACKATHON EVALUATION</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-emerald-50 via-teal-50/40 to-white border border-emerald-100 rounded-3xl p-8 shadow-sm overflow-hidden">
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden md:block">
            <svg width="180" height="180" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-700">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <div className="space-y-2 max-w-2xl relative z-10">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest">
              <span>CIVIC LEDGER SRI LANKA</span>
              <span>•</span>
              <span>Live Impact Verification</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Our Community Impact
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Tracking surplus food preservation, portion distribution, and community participation across Sri Lanka.
            </p>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center text-base">
                🗑️
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">LISTING FEED</span>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">{totalListings}</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">Food Listings</div>
              <div className="text-[11px] text-slate-500">Active & historical posts</div>
            </div>
            <div className="pt-2 text-[11px] font-bold text-emerald-700 flex items-center gap-1 border-t border-slate-100">
              <span>📈</span> +4 new today
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center text-base">
                📑
              </span>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">SECURED</span>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">{totalReservations}</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">Reservations</div>
              <div className="text-[11px] text-slate-500">Claimed community portions</div>
            </div>
            <div className="pt-2 text-[11px] font-bold text-amber-700 flex items-center gap-1 border-t border-slate-100">
              <span>🏠</span> 14 Partner Shelters
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center text-base">
                🍃
              </span>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">PRESERVED</span>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">
                {foodRescued} <span className="text-base font-bold text-slate-700">Portions</span>
              </div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">Food Rescued</div>
              <div className="text-[11px] text-slate-500">Equiv. ~{Math.round(foodRescued * 0.5)} kg food saved</div>
            </div>
            <div className="pt-2 text-[11px] font-bold text-emerald-700 flex items-center gap-1 border-t border-slate-100">
              <span>🌱</span> ~{co2ReducedKg} kg CO2 avoided
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center text-base">
                🛡️
              </span>
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">DISPATCHED</span>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">{completedCollections}</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">Completed Collections</div>
              <div className="text-[11px] text-slate-500">Successful handovers verified</div>
            </div>
            <div className="pt-2 text-[11px] font-bold text-blue-700 flex items-center gap-1 border-t border-slate-100">
              <span>✓</span> Zero Quality Rejections
            </div>
          </div>
        </div>

        {/* Breakdown Visuals Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portions Rescued by Category */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Portions Rescued by Category</h2>
                <p className="text-xs text-slate-500">Breakdown across verified community meal portions</p>
              </div>
              <span className="bg-slate-100 text-slate-700 font-bold text-[11px] px-3 py-1 rounded-full">
                Total: {foodRescued} Units
              </span>
            </div>

            <div className="space-y-4">
              {Object.entries(categoryBreakdown).map(([catName, qty]) => {
                const pct = Math.round((qty / totalCategoryUnits) * 100);
                const style = categoryStyles[catName] || {
                  bg: 'bg-emerald-600',
                  dot: 'bg-emerald-600',
                };

                return (
                  <div key={catName} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-700">{catName}</span>
                      <span className="text-slate-900">
                        {qty} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-7 bg-slate-100 rounded-xl overflow-hidden p-0.5">
                      <div
                        className={`h-full ${style.bg} rounded-lg transition-all duration-700`}
                        style={{ width: `${Math.max(pct, 5)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs font-semibold">
              {Object.keys(categoryBreakdown).map((catName) => {
                const style = categoryStyles[catName] || { dot: 'bg-emerald-600' };
                return (
                  <div key={catName} className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`}></span>
                    <span className="text-slate-600">{catName}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reliability Index Ring Chart */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Reliability Index</h2>
              <p className="text-xs text-slate-500">Confirmed safe handovers</p>
            </div>

            {/* SVG Donut Ring */}
            <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.8"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-700 transition-all duration-1000"
                  strokeDasharray={`${reliabilityIndex}, 100`}
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-slate-900">{reliabilityIndex}%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">COMPLETED</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Active Reservations</span>
                <span className="font-bold text-slate-900">{totalReservations}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Completed Dispatches</span>
                <span className="font-bold text-emerald-700">{completedCollections}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-600 font-medium">Pending Collection</span>
                <span className="font-bold text-amber-700">
                  {Math.max(0, totalReservations - completedCollections)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission In Action Section */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest">MISSION IN ACTION</span>
              <h2 className="text-2xl font-black text-slate-900">How FoodRescue LK Helps</h2>
              <p className="text-xs text-slate-600">
                Solving the dual challenge of commercial surplus and acute urban food vulnerability through civic coordination.
              </p>
            </div>
            <span className="bg-slate-100 border border-slate-200 rounded-full px-3 py-1 text-[11px] font-semibold text-slate-600 self-start sm:self-auto">
              4 Core Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3">
              <span className="w-8 h-8 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center text-sm font-bold">
                🗑️
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Reduce Food Waste</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Redirects edible surplus from landfills and incinerators, curbing municipal greenhouse gas emissions.
              </p>
              <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 pt-1">
                <span>Ecological Relief</span> <span>→</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3">
              <span className="w-8 h-8 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center text-sm font-bold">
                👁️
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Make Surplus Visible</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provides real-time visibility to nearby charities, students, and low-income families before safe consumption window expires.
              </p>
              <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1 pt-1">
                <span>Real-time Dispatch</span> <span>→</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3">
              <span className="w-8 h-8 bg-blue-100 text-blue-800 rounded-lg flex items-center justify-center text-sm font-bold">
                💎
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Support Communities</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bridges the gap between surplus kitchen stock and verified local meal programs, student welfare funds, and orphanages.
              </p>
              <div className="text-[11px] font-bold text-blue-700 flex items-center gap-1 pt-1">
                <span>Dignified Access</span> <span>→</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3">
              <span className="w-8 h-8 bg-purple-100 text-purple-800 rounded-lg flex items-center justify-center text-sm font-bold">
                🤝
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Encourage Food Sharing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Promotes a culture of mutual aid and zero-waste stewardship across hospitality vendors, educational institutions, and citizens.
              </p>
              <div className="text-[11px] font-bold text-purple-700 flex items-center gap-1 pt-1">
                <span>Civic Solidarity</span> <span>→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Field Operations Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="bg-emerald-600/60 text-emerald-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              FIELD OPERATIONS
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">From Colombo Commercial Kitchens to Verified Plate</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Through verified temperature audits and strict handover safety protocols, our network ensures every portion shared retains nutritional integrity and dignity.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="bg-white/10 px-3 py-1 rounded-full text-emerald-300 font-semibold">
                ✓ 100% Free Distribution
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-slate-200 font-semibold">
                ⏱ Avg. Pickup: 34 Minutes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
