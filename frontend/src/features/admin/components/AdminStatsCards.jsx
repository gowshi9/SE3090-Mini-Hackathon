import React from 'react';

export function AdminStatsCards({ stats }) {
  if (!stats) return null;

  const {
    totalListings = 0,
    availableListings = 0,
    reservedListings = 0,
    collectedListings = 0,
    foodRescued = 0,
  } = stats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Total Listings */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL LISTINGS</span>
          <span className="w-8 h-8 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center text-sm">
            📦
          </span>
        </div>
        <div className="text-3xl font-black text-slate-900">{totalListings}</div>
        <div className="text-[11px] text-slate-500 font-medium">+12 this week</div>
      </div>

      {/* Available Listings */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">AVAILABLE</span>
          <span className="w-8 h-8 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center text-sm">
            🟢
          </span>
        </div>
        <div className="text-3xl font-black text-slate-900">{availableListings}</div>
        <div className="text-[11px] text-emerald-700 font-medium">Ready for distribution</div>
      </div>

      {/* Reserved Listings */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">RESERVED</span>
          <span className="w-8 h-8 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center text-sm">
            📑
          </span>
        </div>
        <div className="text-3xl font-black text-slate-900">{reservedListings}</div>
        <div className="text-[11px] text-amber-700 font-medium">Claimed & pending pickup</div>
      </div>

      {/* Collected Listings */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">COLLECTED</span>
          <span className="w-8 h-8 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center text-sm">
            ✓
          </span>
        </div>
        <div className="text-3xl font-black text-slate-900">{collectedListings}</div>
        <div className="text-[11px] text-blue-700 font-medium">Handed over & verified</div>
      </div>

      {/* Total Food Rescued */}
      <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-2xl p-5 shadow-sm space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider">FOOD RESCUED</span>
          <span className="w-8 h-8 bg-white/10 text-emerald-200 rounded-xl flex items-center justify-center text-sm">
            🍃
          </span>
        </div>
        <div className="text-3xl font-black">{foodRescued} <span className="text-xs font-normal text-emerald-200">portions</span></div>
        <div className="text-[11px] text-emerald-300 font-medium">Saved from food waste</div>
      </div>
    </div>
  );
}
