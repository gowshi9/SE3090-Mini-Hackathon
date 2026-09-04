import React from 'react';
import { FoodCard } from './FoodCard';

export function FoodList({ items = [], isLoading = false, error = null }) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">
            Finding available food...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <h3 className="text-lg font-bold text-red-800 mb-2">
          Unable to load food listings
        </h3>

        <p className="text-red-600 text-sm">
          {error}
        </p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-10 text-center">
        <div className="text-4xl mb-4">🍱</div>

        <h3 className="text-xl font-bold text-slate-800 mb-2">
          No food listings found
        </h3>

        <p className="text-slate-600">
          Try changing your search or filters to find available surplus food.
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-slate-900">
          Available Food
        </h2>

        <span className="text-sm text-slate-500">
          {items.length} {items.length === 1 ? 'listing' : 'listings'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}