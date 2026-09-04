import React from 'react';

/**
 * Metric Impact Card component.
 */
export function ImpactCard({ icon, title, value, unit, color = 'emerald' }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md flex items-center gap-4">
      <div className="text-3xl p-3 bg-emerald-50 rounded-xl text-emerald-600 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-black text-slate-900 mt-1">
          {value} {unit && <span className="text-sm font-normal text-slate-500">{unit}</span>}
        </p>
      </div>
    </div>
  );
}
