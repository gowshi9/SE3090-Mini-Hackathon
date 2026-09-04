import React from 'react';
import { FoodForm } from '../components/FoodForm';

/**
 * Page component for Member 1 - Post Surplus Food.
 */
export function PostFoodPage() {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Post Surplus Food
        </h1>
        <p className="text-slate-600 max-w-lg mx-auto">
          Share extra food from events, restaurants, or home to help prevent food waste in your community.
        </p>
      </div>

      <FoodForm />
    </div>
  );
}
