import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export function FoodPackagingGuidelinesCard() {
  return (
    <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-200/70 space-y-2 text-left">
      <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
        <Sparkles className="w-4 h-4 text-amber-700" />
        <span>Food Packaging Guidelines</span>
      </div>
      <p className="text-[11px] text-amber-800/90 leading-relaxed">
        Keep warm bread ventilated in paper bags to avoid condensation. Label any items containing nuts or common allergens clearly before handing over to community volunteers.
      </p>
    </div>
  );
}
