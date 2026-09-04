import React from 'react';
import { Select } from '../../../components/ui/Select';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

const categoryFilterOptions = [
  { value: '', label: 'All Categories' },
  { value: 'Cooked Meals', label: 'Cooked Meals' },
  { value: 'Bakery Items', label: 'Bakery Items' },
  { value: 'Produce & Veggies', label: 'Produce & Veggies' },
  { value: 'Groceries', label: 'Groceries' },
];

const statusFilterOptions = [
  { value: 'Available', label: 'Available Only' },
  { value: 'Reserved', label: 'Reserved' },
  { value: '', label: 'All Statuses' },
];

export function FoodFilters({ filters, updateFilter, resetFilters }) {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm w-full">
      <div className="w-full sm:w-48">
        <label
          htmlFor="food-category"
          className="block text-xs font-semibold text-slate-600 mb-1"
        >
          Category
        </label>

        <Select
          id="food-category"
          options={categoryFilterOptions}
          value={filters.category}
          onChange={(e) => updateFilter('category', e.target.value)}
        />
      </div>

      <div className="w-full sm:w-44">
        <label
          htmlFor="food-status"
          className="block text-xs font-semibold text-slate-600 mb-1"
        >
          Status
        </label>

        <Select
          id="food-status"
          options={statusFilterOptions}
          value={filters.status}
          onChange={(e) => updateFilter('status', e.target.value)}
        />
      </div>

      <div className="w-full sm:w-52">
        <label
          htmlFor="food-location"
          className="block text-xs font-semibold text-slate-600 mb-1"
        >
          Location
        </label>

        <Input
          id="food-location"
          type="search"
          placeholder="Search pickup location"
          value={filters.location}
          onChange={(e) => updateFilter('location', e.target.value)}
        />
      </div>

      <Button
        variant="outline"
        onClick={resetFilters}
        className="sm:ml-auto text-xs py-2"
      >
        Reset Filters
      </Button>
    </div>
  );
}