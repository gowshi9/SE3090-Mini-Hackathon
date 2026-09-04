import React from 'react';

export function AdminReservationsTable({ reservations }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden space-y-4 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Manage Reservations</h2>
          <p className="text-xs text-slate-500">Monitor active food claims, verify collection schedules, and ensure fair portion distribution.</p>
        </div>
        <span className="bg-emerald-50 text-emerald-800 font-bold text-xs px-3 py-1.5 rounded-full self-start sm:self-auto border border-emerald-200">
          Fair Distribution Policy Enforced
        </span>
      </div>

      {reservations.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-500 text-sm font-medium">No reservations recorded in the system.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">RESERVATION ID</th>
                <th className="py-3 px-4">FOOD ITEM</th>
                <th className="py-3 px-4">RESERVED BY</th>
                <th className="py-3 px-4">QUANTITY</th>
                <th className="py-3 px-4">HUB LOCATION</th>
                <th className="py-3 px-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reservations.map((res) => {
                const isCollected = res.status === 'Collected' || res.status === 'Completed' || res.status === 'Fulfilled';
                return (
                  <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-amber-800">
                      <span className="bg-amber-100 px-2 py-1 rounded">#RES-{8900 + res.id}-LK</span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900">{res.foodListing?.title || res.foodItemTitle || 'Surplus Batch'}</div>
                      <div className="text-[10px] text-slate-400">Claimed Food Item</div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900">{res.recipientName || 'Community Member'}</div>
                      <div className="text-[10px] text-slate-400">Verified Beneficiary</div>
                    </td>

                    <td className="py-4 px-4 font-bold text-slate-900">
                      {res.quantity || 5} <span className="font-normal text-slate-500">portions</span>
                    </td>

                    <td className="py-4 px-4 text-slate-700 font-medium">
                      📍 {res.pickupLocation || 'Colombo Central Hub'}
                    </td>

                    <td className="py-4 px-4">
                      {isCollected ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-bold text-[11px] px-2.5 py-1 rounded-full">
                          ✓ COLLECTED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 font-bold text-[11px] px-2.5 py-1 rounded-full">
                          ● RESERVED
                        </span>
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
  );
}
