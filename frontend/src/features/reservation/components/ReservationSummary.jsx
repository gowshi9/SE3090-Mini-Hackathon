import React from 'react';

/**
 * Displays summary of selected food item to be reserved.
 */
export function ReservationSummary({ foodItem }) {
  if (!foodItem) return null;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
      <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">
        Food Reservation Summary
      </h3>
      <div className="space-y-2 text-sm text-slate-700">
        <p><strong className="text-slate-900">Item:</strong> {foodItem.title}</p>
        <p><strong className="text-slate-900">Quantity Available:</strong> {foodItem.quantity} {foodItem.unit}</p>
        <p><strong className="text-slate-900">Pickup Location:</strong> {foodItem.pickupLocation}</p>
        <p><strong className="text-slate-900">Donor:</strong> {foodItem.donorName}</p>
      </div>
    </div>
  );
}
