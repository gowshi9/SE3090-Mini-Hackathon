import React from 'react';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';

const categoryFilterOptions = [
  { value: '', label: 'All Categories' },
  { value: 'Cooked Meals', label: 'Cooked Meals' },
  { value: 'Bakery Items', label: 'Bakery Items' },
  { value: 'Produce & Veggies', label: 'Produce & Veggies' },
  { value: 'Groceries', label: 'Groceries' },
];

const statusFilterOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'Available', label: 'Available Only' },
  { value: 'Reserved', label: 'Reserved' },
];

/**
 * Filter panel component for category and location selection.
 */
export function FoodFilters({ filters, updateFilter, resetFilters }) {
  return (
    <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm w-full">
      <div className="w-full sm:w-48">
        <Select
          options={categoryFilterOptions}
          value={filters.category}
          onChange={(e) => updateFilter('category', e.target.value)}
        />
      </div>

      <div className="w-full sm:w-44">
        <Select
          options={statusFilterOptions}
          value={filters.status}
          onChange={(e) => updateFilter('status', e.target.value)}
        />
      </div>

      <Button variant="outline" onClick={resetFilters} className="ml-auto text-xs py-2">
        Reset Filters
      </Button>
    </div>
  );
}
