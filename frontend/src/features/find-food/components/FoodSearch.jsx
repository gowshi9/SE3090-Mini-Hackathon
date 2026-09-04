import React from 'react';
import { Input } from '../../../components/ui/Input';

/**
 * Search Bar component for food items.
 */
export function FoodSearch({ value, onChange }) {
  return (
    <div className="w-full max-w-xl">
      <Input
        type="text"
        placeholder="🔍 Search food by title, donor, or keyword..."
        value={value}
        onChange={(e) => onChange('searchQuery', e.target.value)}
        className="w-full text-base py-3 shadow-sm border-slate-300 focus:border-emerald-500"
      />
    </div>
  );
}
