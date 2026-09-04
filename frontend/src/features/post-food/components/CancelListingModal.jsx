import React, { useState } from 'react';
import { AlertTriangle, ArrowLeft, Trash2, Info, X } from 'lucide-react';

export function CancelListingModal({ isOpen, listing, onClose, onConfirmCancel, isCancelling = false }) {
  const [reason, setReason] = useState('Surplus batch consumed internally / expired');

  if (!isOpen || !listing) return null;

  const handleConfirm = (e) => {
    e.preventDefault();
    onConfirmCancel(listing.id, reason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-scaleUp">
        
        {/* Top Warning Strip */}
        <div className="h-1.5 bg-amber-500 w-full"></div>

        <div className="p-6 sm:p-8 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/80 border border-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded-sm">
                    SURPLUS WITHDRAWAL
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-semibold">
                    #FL-{listing.id || '8821'}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Cancel Food Listing
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Description Box */}
          <div className="bg-[#f0f3fe] border border-[#d9e2fc] rounded-2xl p-4 space-y-1.5">
            <h3 className="text-sm font-extrabold text-slate-900">
              Cancel this food listing?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to cancel listing <strong className="text-slate-900">"{listing.title}"</strong> ({listing.quantity} portions, {listing.pickupLocation})? Once cancelled, community members will no longer be able to discover or reserve this batch.
            </p>
          </div>

          {/* 3 Detail Cards */}
          <div className="grid grid-cols-3 gap-2 text-left">
            <div className="bg-[#f0f4f9] border border-slate-200/80 rounded-xl p-3">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                QUANTITY
              </div>
              <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                {listing.quantity} Portions
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                {listing.category || 'Surplus'}
              </div>
            </div>

            <div className="bg-[#f0f4f9] border border-slate-200/80 rounded-xl p-3">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                LOCATION
              </div>
              <div className="text-sm font-extrabold text-slate-900 mt-0.5 truncate">
                {listing.pickupLocation || 'Regional Hub'}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                Local Node
              </div>
            </div>

            <div className="bg-[#f0f4f9] border border-slate-200/80 rounded-xl p-3">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                AUDITED STATUS
              </div>
              <div className="text-sm font-extrabold text-emerald-700 mt-0.5">
                {listing.status === 'Available' ? 'Unreserved' : listing.status}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                0 Active Claims
              </div>
            </div>
          </div>

          {/* Optional Reason Dropdown */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800">
                Reason for cancellation <span className="font-normal text-slate-500">(optional)</span>
              </label>
              <span className="text-[10px] text-slate-400">Helps maintain network audits</span>
            </div>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#f0f4f9] border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
            >
              <option value="Surplus batch consumed internally / expired">Surplus batch consumed internally / expired</option>
              <option value="Storage or refrigeration failure">Storage or refrigeration failure</option>
              <option value="Pickup window passed">Pickup window passed</option>
              <option value="Duplicate listing made in error">Duplicate listing made in error</option>
              <option value="Other donor operational reasons">Other donor operational reasons</option>
            </select>
          </div>

          {/* Donor Log Notice */}
          <div className="bg-[#f0f4f9] border border-slate-200/60 rounded-xl p-3 flex items-center gap-2 text-[11px] text-slate-600">
            <Info className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
            <span>
              Action will be recorded under donor log: <strong className="text-slate-800">{listing.donorName || 'Kavindi Perera'} (Donor #8812)</strong>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isCancelling}
              className="flex-1 py-3 px-4 bg-[#eef2ff] hover:bg-[#e0e7ff] text-slate-800 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#dbe4fe] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Keep Listing</span>
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={isCancelling}
              className="flex-1 py-3 px-4 bg-[#b91c1c] hover:bg-[#991b1b] active:scale-[0.99] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-60"
            >
              {isCancelling ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>Cancel Listing</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
