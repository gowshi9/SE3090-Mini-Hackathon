import React from 'react';
import { FoodCard } from './FoodCard';
import { Loading } from '../../../components/ui/Loading';

/**
 * Food List Grid container.
 */
export function FoodList({ items, isLoading, error }) {
  if (isLoading) {
    return <Loading message="Searching available surplus food..." />;
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl">
        <p className="font-semibold">{error}</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <span className="text-4xl">🍲</span>
        <h3 className="text-lg font-bold text-slate-800 mt-2">No food listings found</h3>
        <p className="text-slate-500 text-sm mt-1">
          Try adjusting your search criteria or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <FoodCard key={item.id} item={item} />
      ))}
    </div>
  );
}
