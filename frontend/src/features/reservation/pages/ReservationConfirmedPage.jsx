import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Module: IT24102892 — Reserve & Prevent Over-claiming
 * Reservation Confirmed Manifest & Token Page matching UI Reference 3.
 */
export function ReservationConfirmedPage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const token = 'FR-JAF-582';

  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Confirmation Hero (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Card with Soft Emerald Gradient */}
          <div className="bg-gradient-to-br from-emerald-50/70 via-slate-50/50 to-indigo-50/30 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Header Icon & Transaction Hash */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-2xl shadow-sm">
                ✓
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-blue-200">
                  ALLOCATED & LOCKED
                </span>
                <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                  Tx: 0x8f2e...LK01
                </span>
              </div>
            </div>

            {/* Confirmation Title & Subtitle */}
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Reservation Confirmed
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Your surplus food claim has been securely allocated and held. Over-claim deterrence locks are verified on the local hub ledger.
              </p>
            </div>

            {/* OFFICIAL COLLECTION TOKEN Box */}
            <div className="bg-[#f0f4ff] border border-indigo-200/90 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
              
              {/* Left Details */}
              <div className="space-y-2 text-center sm:text-left">
                <div className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                  OFFICIAL COLLECTION TOKEN
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <span className="text-3xl sm:text-4xl font-mono font-black text-emerald-950 tracking-wider">
                    {token}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyToken}
                    title="Copy Token"
                    className="p-2 rounded-xl bg-white border border-indigo-200 hover:bg-indigo-50 text-slate-600 transition-colors shadow-2xs"
                  >
                    {copied ? (
                      <span className="text-xs text-emerald-700 font-bold">✓ Copied</span>
                    ) : (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                      </svg>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-600 font-medium leading-tight">
                  Present this token to the logistics steward at the pickup counter.
                </p>
              </div>

              {/* Right QR Code Box */}
              <div className="bg-white border border-indigo-100 rounded-2xl p-3.5 shadow-sm text-center shrink-0">
                {/* SVG QR Code Simulation */}
                <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100" fill="none">
                  {/* Position detection pattern Top Left */}
                  <rect x="5" y="5" width="28" height="28" fill="#047857" rx="4" />
                  <rect x="9" y="9" width="20" height="20" fill="white" rx="2" />
                  <rect x="13" y="13" width="12" height="12" fill="#047857" rx="1" />
                  
                  {/* Position detection pattern Top Right */}
                  <rect x="67" y="5" width="28" height="28" fill="#047857" rx="4" />
                  <rect x="71" y="9" width="20" height="20" fill="white" rx="2" />
                  <rect x="75" y="13" width="12" height="12" fill="#047857" rx="1" />

                  {/* Position detection pattern Bottom Left */}
                  <rect x="5" y="67" width="28" height="28" fill="#047857" rx="4" />
                  <rect x="9" y="71" width="20" height="20" fill="white" rx="2" />
                  <rect x="13" y="75" width="12" height="12" fill="#047857" rx="1" />

                  {/* Data modules */}
                  <rect x="40" y="8" width="6" height="6" fill="#0f172a" />
                  <rect x="52" y="8" width="6" height="6" fill="#0f172a" />
                  <rect x="40" y="20" width="6" height="6" fill="#047857" />
                  <rect x="46" y="26" width="6" height="6" fill="#0f172a" />
                  
                  <rect x="8" y="40" width="6" height="6" fill="#0f172a" />
                  <rect x="20" y="46" width="6" height="6" fill="#047857" />
                  
                  <rect x="40" y="40" width="8" height="8" fill="#047857" rx="1" />
                  <rect x="54" y="40" width="6" height="6" fill="#0f172a" />
                  <rect x="40" y="54" width="6" height="6" fill="#0f172a" />
                  <rect x="52" y="52" width="8" height="8" fill="#047857" rx="1" />

                  <rect x="68" y="40" width="6" height="6" fill="#0f172a" />
                  <rect x="80" y="46" width="6" height="6" fill="#047857" />
                  <rect x="74" y="54" width="6" height="6" fill="#0f172a" />

                  <rect x="40" y="68" width="6" height="6" fill="#0f172a" />
                  <rect x="52" y="74" width="6" height="6" fill="#047857" />
                  <rect x="46" y="80" width="6" height="6" fill="#0f172a" />
                  <rect x="68" y="74" width="8" height="8" fill="#047857" rx="1" />
                  <rect x="82" y="80" width="6" height="6" fill="#0f172a" />
                </svg>

                <div className="text-[10px] font-extrabold tracking-wider text-slate-700 mt-1 uppercase">
                  JAF-VERIFIED
                </div>
              </div>

            </div>

            {/* Portion & Batch Metrics (2 Grid Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Portions Claimed */}
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                  <span>PORTIONS CLAIMED</span>
                  <span>🛍️</span>
                </div>
                <div className="text-3xl font-black text-emerald-800">
                  5 Portions
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Reserved by Kavindi Perera
                </div>
              </div>

              {/* Card 2: Remaining Batch */}
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                  <span>REMAINING BATCH</span>
                  <span>📊</span>
                </div>
                <div className="text-3xl font-black text-slate-900">
                  15 Portions
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Available for mutual aid partners
                </div>
              </div>

            </div>

            {/* Batch Allocation Visual Progress Bar Box */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-600">Batch Allocation (Total: 20 Packets)</span>
                <span className="text-emerald-700 font-extrabold">25% Locked By You</span>
              </div>

              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden flex">
                <div className="bg-emerald-600 h-full w-[25%]" />
                <div className="bg-emerald-400/50 h-full w-[75%]" />
              </div>

              <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500">
                <span>5 Reserved (Your Claim)</span>
                <span>15 Open for Other Students/Shelters</span>
              </div>
            </div>

            {/* Navigation Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigate('/my-reservations')}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
              >
                <span>📋</span> View My Reservations
              </button>

              <button
                type="button"
                onClick={() => navigate('/reserve')}
                className="w-full py-3.5 px-4 rounded-xl bg-indigo-50/80 hover:bg-indigo-100 text-indigo-950 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-indigo-200/80 shadow-2xs"
              >
                <span>🔍</span> Browse More Surplus Food
              </button>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Manifest Ledger & Helpful Guidelines (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Card 1: MANIFEST LEDGER / Reservation Details */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
            
            {/* Ledger Header */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  MANIFEST LEDGER
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Reservation Details
                </h3>
              </div>
              <span className="bg-slate-100 text-slate-700 font-mono font-bold text-[10px] px-2.5 py-1 rounded-md border border-slate-200">
                #RES-8921-LK
              </span>
            </div>

            {/* Item Info Banner */}
            <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-xl p-3.5 flex items-center gap-3.5">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&auto=format&fit=crop&q=80"
                alt="Fresh Bread Packets"
                className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
              />
              <div className="space-y-0.5">
                <span className="text-[9px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-full">
                  FRESH BAKERY SURPLUS
                </span>
                <div className="font-extrabold text-slate-900 text-sm">
                  Fresh Bread Packets
                </div>
                <div className="text-[11px] text-slate-500">
                  Batch baked today • Jaffna Central Bakery
                </div>
              </div>
            </div>

            {/* Pickup Specifications */}
            <div className="space-y-4 text-xs">
              
              {/* Collection Location */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm shrink-0">
                  📍
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    COLLECTION LOCATION
                  </div>
                  <div className="font-extrabold text-slate-900 text-xs">
                    Jaffna Town (Main St. Hub)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    No. 142, Main Street, Jaffna (Opposite Central Market)
                  </div>
                </div>
              </div>

              {/* Pickup Deadline */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-sm shrink-0">
                  🕒
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    PICKUP DEADLINE
                  </div>
                  <div className="font-extrabold text-amber-800 text-xs">
                    Today, before 7:00 PM
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Held until window expiry • 3h 15m remaining
                  </div>
                </div>
              </div>

              {/* Package Allocation */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm shrink-0">
                  📦
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    PACKAGE ALLOCATION
                  </div>
                  <div className="font-extrabold text-slate-900 text-xs">
                    5 Packets (approx. 2.5 kg)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Vegetarian • Freshly packaged & tagged
                  </div>
                </div>
              </div>

            </div>

            {/* Map Graphic Box */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-36 bg-slate-100 shadow-2xs">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=80"
                alt="Jaffna Dispatch Map Route"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-3">
                <div className="bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-extrabold text-slate-800 shadow-xs flex items-center gap-1.5">
                  <span className="text-emerald-600">📍</span> 1.2 km from your current campus node
                </div>
              </div>
            </div>

          </div>

          {/* Card 2: Helpful Guidelines Container */}
          <div className="bg-[#eef2ff] border border-indigo-200/80 rounded-2xl p-6 space-y-4 shadow-2xs">
            
            <div className="flex items-center gap-2">
              <span className="text-emerald-700">🍃</span>
              <h3 className="text-base font-extrabold text-indigo-950">
                Helpful Guidelines
              </h3>
            </div>

            {/* Guideline Item 1 */}
            <div className="bg-white border border-indigo-100 rounded-xl p-3.5 flex items-start gap-3 text-xs">
              <span className="text-base text-amber-600 shrink-0">🛍️</span>
              <p className="text-slate-700 font-medium leading-relaxed">
                <strong className="text-slate-900 font-bold">Please bring your own reusable container or bag</strong> to reduce single-use plastic consumption at community hubs.
              </p>
            </div>

            {/* Guideline Item 2 */}
            <div className="bg-white border border-indigo-100 rounded-xl p-3.5 flex items-start gap-3 text-xs">
              <span className="text-base text-rose-500 shrink-0">📅</span>
              <p className="text-slate-700 font-medium leading-relaxed">
                <strong className="text-slate-900 font-bold">Cannot make it before 7:00 PM?</strong> Please cancel your reservation promptly in the app so other students and welfare shelters may claim this fresh food before end of day.
              </p>
            </div>

            {/* Verification Footer Bar */}
            <div className="pt-2 border-t border-indigo-200/60 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
              <span>Concurrency Control System: Verified</span>
              <span className="flex items-center gap-1 text-emerald-800 font-bold bg-emerald-100/80 px-2 py-0.5 rounded">
                🔒 Slot Secured
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
