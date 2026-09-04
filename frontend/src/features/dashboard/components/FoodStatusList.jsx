import React from 'react';
import { StatusBadge } from './StatusBadge';

/**
 * List of managed listings with status update actions.
 */
export function FoodStatusList({ listings, onStatusChange }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800">My Food Listings Management</h3>
      </div>
      <div className="divide-y divide-slate-100 overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Listing Title</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Current Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {listings.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-900">{item.title}</td>
                <td className="px-6 py-4">{item.quantity} {item.unit}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  {item.status === 'Available' && (
                    <button
                      onClick={() => onStatusChange(item.id, 'Reserved')}
                      className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold px-3 py-1.5 rounded-lg border border-amber-200"
                    >
                      Mark Reserved
                    </button>
                  )}
                  {item.status === 'Reserved' && (
                    <button
                      onClick={() => onStatusChange(item.id, 'Completed')}
                      className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold px-3 py-1.5 rounded-lg border border-emerald-200"
                    >
                      Mark Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
