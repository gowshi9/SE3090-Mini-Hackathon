import React from 'react';
import { FoodSearch } from '../components/FoodSearch';
import { FoodFilters } from '../components/FoodFilters';
import { FoodList } from '../components/FoodList';
import { useFoodSearch } from '../hooks/useFoodSearch';

/**
 * Page component for Member 2 - Find Food.
 */
export function FindFoodPage() {
  const { filters, foodItems, isLoading, error, updateFilter, resetFilters } = useFoodSearch();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Find Surplus Food Nearby
        </h1>
        <p className="text-slate-600 max-w-2xl text-base">
          Browse available food shares donated by local restaurants, supermarkets, and community members in Sri Lanka.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <FoodSearch value={filters.searchQuery} onChange={updateFilter} />
        <FoodFilters filters={filters} updateFilter={updateFilter} resetFilters={resetFilters} />
      </div>

      <FoodList items={foodItems} isLoading={isLoading} error={error} />
    </div>
  );
}
