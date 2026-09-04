import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Module: IT24102892 — Reserve & Prevent Over-claiming
 * My Reservations & Fair Allocation Engine Page matching UI Reference 2.
 */
export function MyReservationsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const reservationItems = [
    {
      id: 'res-1',
      title: 'Fresh Bread Packets',
      category: 'Bakery & Grains',
      portions: 5,
      token: 'FR-JAF-582',
      status: 'RESERVED',
      date: 'Today, Oct 24, 2024',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80',
      depot: 'Jaffna Town Center Distribution',
      window: 'Today, 7:00 PM (1h 15m remaining)',
      lockUid: 'IT24102892',
      steps: ['Government Lock', 'Packing by Owner', 'Ready', 'Collected'],
      currentStep: 1,
    },
    {
      id: 'res-2',
      title: 'Vegetable Rice Packs',
      category: 'Cooked Warm Meal • Vegetarian',
      portions: 3,
      token: 'GATE-B82',
      status: 'READY FOR COLLECTION',
      date: 'Today, Oct 24, 2024',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80',
      depot: 'Colombo 07 — Community Pantry',
      window: 'Today, 8:00 PM (Awaiting arrival)',
      lockUid: 'IT24102892',
      steps: ['Confirmed', 'Packaged', 'Ready at Hub', 'Handover Done'],
      currentStep: 3,
    },
  ];

  const filteredItems = reservationItems.filter((item) => {
    if (activeTab === 'reserved') return item.status === 'RESERVED';
    if (activeTab === 'ready') return item.status === 'READY FOR COLLECTION';
    if (activeTab === 'collected') return item.status === 'COLLECTED';
    if (activeTab === 'cancelled') return item.status === 'CANCELLED';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-slate-500 font-medium flex items-center gap-2">
        <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">BENEFICIARY MUTUAL AID PAGE</span>
        <span>›</span>
        <span className="text-slate-700">Sri Lanka External Dispatch</span>
      </nav>

      {/* Page Header with Stats Pill */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Reservations</h1>
          <p className="text-slate-600 text-sm mt-1 font-medium">
            Track your food claims, verifiable pickup manifests, and active collection tokens.
          </p>
        </div>

        {/* Stats Badges */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl px-3.5 py-2 flex items-center gap-2">
            <span className="text-emerald-700">📦</span>
            <div>
              <div className="text-[9px] text-emerald-800 uppercase font-extrabold">Reserved Portions</div>
              <div className="text-xs font-extrabold text-emerald-950">8 Portions</div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200/80 rounded-xl px-3.5 py-2 flex items-center gap-2">
            <span className="text-amber-700">🔑</span>
            <div>
              <div className="text-[9px] text-amber-800 uppercase font-extrabold">Active Token</div>
              <div className="text-xs font-mono font-extrabold text-amber-950">FR-JAF-582</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'all', label: 'All', count: 3 },
          { id: 'reserved', label: 'Reserved', count: 1 },
          { id: 'ready', label: 'Ready for Collection', count: 1 },
          { id: 'collected', label: 'Collected', count: 1 },
          { id: 'cancelled', label: 'Cancelled', count: 0 },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {tab.label}
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-100 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Reservation Cards & Empty State Demo (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Reservation Card 1: Fresh Bread Packets (RESERVED) */}
          {(activeTab === 'all' || activeTab === 'reserved') && (
            <div className="bg-white border-2 border-amber-300/80 rounded-2xl p-5 shadow-xs space-y-4">
              
              {/* Header Badge & Token */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-300">
                    ● RESERVED
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">
                    Reservation Date: Today, Oct 24, 2024
                  </span>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-1 text-right">
                  <div className="text-[9px] text-amber-700 uppercase font-bold">PICKUP TOKEN</div>
                  <div className="text-xs font-mono font-black text-amber-900">FR-JAF-582</div>
                </div>
              </div>

              {/* Title & Info */}
              <div className="flex gap-4 items-start">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80"
                  alt="Fresh Bread Packets"
                  className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-slate-900">
                    Fresh Bread Packets
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <span>🌾</span> 5 portions reserved • Bakery & Grains
                  </p>
                </div>
              </div>

              {/* Details Box */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Handover Depot</div>
                  <div className="font-bold text-slate-800 mt-0.5">📍 Jaffna Town Center Distribution</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Pickup Window</div>
                  <div className="font-bold text-amber-700 mt-0.5">🕒 Today, 7:00 PM (1h 15m remaining)</div>
                </div>
              </div>

              {/* Milestone Progress Bar */}
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-4 text-center text-[10px] font-bold text-slate-600">
                  <span className="text-emerald-700">1. Government Lock</span>
                  <span className="text-amber-700">2. Packing by Owner</span>
                  <span className="text-slate-400">3. Ready</span>
                  <span className="text-slate-400">4. Collected</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-600 h-full w-1/4" />
                  <div className="bg-amber-400 h-full w-1/4 animate-pulse" />
                  <div className="bg-slate-200 h-full w-2/4" />
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                  🔒 Lock active against double-claims under UID IT24102892
                </span>
                <Link
                  to="/reserve"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors text-xs"
                >
                  View Details &rsaquo;
                </Link>
              </div>

            </div>
          )}

          {/* Reservation Card 2: Vegetable Rice Packs (READY FOR COLLECTION) */}
          {(activeTab === 'all' || activeTab === 'ready') && (
            <div className="bg-white border-2 border-blue-300/80 rounded-2xl p-5 shadow-xs space-y-4">
              
              {/* Header Badge & Token */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-blue-300">
                    ● READY FOR COLLECTION
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">
                    Reservation Date: Today, Oct 24, 2024
                  </span>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-1 text-right">
                  <div className="text-[9px] text-blue-700 uppercase font-bold">READY COUNTER</div>
                  <div className="text-xs font-mono font-black text-blue-900">GATE-B82</div>
                </div>
              </div>

              {/* Title & Info */}
              <div className="flex gap-4 items-start">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80"
                  alt="Vegetable Rice Packs"
                  className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-slate-900">
                    Vegetable Rice Packs
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <span>🍱</span> 3 portions reserved • Cooked Warm Meal • Vegetarian
                  </p>
                </div>
              </div>

              {/* Details Box */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Handover Location</div>
                  <div className="font-bold text-slate-800 mt-0.5">📍 Colombo 07 — Community Pantry</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Collection Time</div>
                  <div className="font-bold text-blue-700 mt-0.5">🕒 Today, 8:00 PM (Awaiting arrival)</div>
                </div>
              </div>

              {/* Milestone Progress Bar */}
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-4 text-center text-[10px] font-bold text-slate-600">
                  <span className="text-emerald-700">1. Confirmed</span>
                  <span className="text-emerald-700">2. Packaged</span>
                  <span className="text-blue-700">3. Ready at Hub</span>
                  <span className="text-slate-400">4. Handover Done</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-600 h-full w-2/4" />
                  <div className="bg-blue-500 h-full w-1/4 animate-pulse" />
                  <div className="bg-slate-200 h-full w-1/4" />
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                  🛡️ Food inspection & temperature verified by donor
                </span>
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-colors text-xs flex items-center gap-1 shadow-2xs"
                >
                  View Details 📱
                </button>
              </div>

            </div>
          )}

          {/* Section: Empty State Demonstration */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <span>📁</span> Empty State Demonstration
              </h3>
              <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-200">
                Audit & Empty State Demo
              </span>
            </div>

            {/* Empty State Banner Container */}
            <div className="bg-gradient-to-br from-indigo-50/50 via-slate-50 to-emerald-50/50 border border-slate-200 rounded-2xl p-8 text-center space-y-4">
              <div className="w-14 h-14 bg-indigo-100/80 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mx-auto border border-indigo-200/60 shadow-2xs">
                🛒
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-slate-900">
                  You haven't reserved any surplus food yet.
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Explore available surplus meals and produce from community providers.
                </p>
              </div>

              <Link
                to="/reserve"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all shadow-sm"
              >
                <span>🛒</span> Browse Available Food
              </Link>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-2 font-medium">
                <span>✓ Zero-waste community standard</span>
                <span>•</span>
                <span>✓ Real-time inventory guarantee</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Fair Allocation Engine & Hub Locations (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Card 1: Fair Allocation Engine */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-lg">🛡️</span>
              <h3 className="text-base font-extrabold text-slate-900">
                Fair Allocation Engine
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Under hackathon module <strong className="text-slate-900 font-bold">IT24102892</strong>, verified student accounts are capped at 10 active portions per 12-hour window to protect community availability.
            </p>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-800">Active Quota Used:</span>
                <span className="text-emerald-700">8 / 10 Portions (80%)</span>
              </div>

              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: '80%' }}
                />
              </div>

              <div className="text-[11px] text-slate-500 italic">
                2 portions remain allocable until 8:00 PM.
              </div>
            </div>

            {/* Grace Period Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2.5 text-xs text-amber-900">
              <span className="text-base">⏰</span>
              <div>
                <span className="font-bold">Grace Period to Collect:</span> 45 mins after pickup time
              </div>
            </div>
          </div>

          {/* Card 2: Hub Locations */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span>📍</span> Hub Locations
              </h3>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                2 ACTIVE ROUTES
              </span>
            </div>

            {/* Map Placeholder */}
            <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 text-center space-y-2">
              <div className="text-2xl">🗺️</div>
              <div className="text-xs font-bold text-slate-800">
                Jaffna & Colombo Dispatch Hubs
              </div>
              <div className="text-[11px] text-slate-500">
                Real-time route locking & telemetry
              </div>
            </div>

            {/* Route List */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">📍</span>
                  <div>
                    <div className="font-bold text-slate-900">Jaffna Town Hub</div>
                    <div className="text-[10px] text-slate-500">Nallur Station Area</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                  FR-JAF-582
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">📍</span>
                  <div>
                    <div className="font-bold text-slate-900">Colombo 07 Hub</div>
                    <div className="text-[10px] text-slate-500">Community Pantry Depot</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  Ready Now
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
