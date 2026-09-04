import React from 'react';
import { Check, AlertCircle, Sparkles, Activity } from 'lucide-react';
import { getValidationRulesStatus } from '../schemas/foodSchema';

export function ValidationRulesCard({ formData }) {
  const { rules, metCount, totalCount, allMet } = getValidationRulesStatus(formData);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
            ✓
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Validation Rules</h3>
        </div>
        <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
          allMet ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
        }`}>
          {metCount} of {totalCount} Met
        </span>
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed">
        All system integrity constraints must pass before the rescue dispatch node unlocks this record.
      </p>

      <div className="space-y-2">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
              rule.isMet
                ? 'bg-emerald-50/50 border-emerald-100/80 text-emerald-900'
                : 'bg-slate-50 border-slate-200/60 text-slate-500'
            }`}
          >
            <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
              rule.isMet ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-white'
            }`}>
              {rule.isMet ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : <span className="text-[9px]">✕</span>}
            </div>
            <div className="text-xs">
              <div className="font-bold leading-tight flex items-center gap-1">
                <span>{rule.label}</span>
              </div>
              <div className={`text-[10px] mt-0.5 ${rule.isMet ? 'text-emerald-700 font-medium' : 'text-slate-400'}`}>
                {rule.subtext}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-500">
        <span className="flex items-center gap-1.5 text-emerald-700">
          <Activity className="w-3.5 h-3.5" />
          Real-time reactive parser
        </span>
        <span className="text-slate-400 font-mono">Latency &lt; 4ms</span>
      </div>
    </div>
  );
}
