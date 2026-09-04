import React from 'react';
import { ImpactCard } from './ImpactCard';

/**
 * Overview statistics section.
 */
export function DashboardStats({ stats }) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <ImpactCard icon="🍲" title="Total Listings" value={stats.totalListings} />
      <ImpactCard icon="🎁" title="Meals Saved" value={stats.mealsSaved} unit="servings" />
      <ImpactCard icon="🤝" title="Active Reservations" value={stats.activeReservations} />
      <ImpactCard icon="🌱" title="CO2 Saved" value={stats.co2ReducedKg} unit="kg" />
    </div>
  );
}
