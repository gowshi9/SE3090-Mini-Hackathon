import { useState, useEffect } from 'react';
import { getDashboardStats, updateFoodStatus } from '../services/dashboardService';

/**
 * Custom hook managing dashboard stats & status management.
 */
export function useDashboard() {
  const [stats, setStats] = useState(null);
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      setIsLoading(true);
      try {
        const data = await getDashboardStats();
        setStats(data.stats);
        setListings(data.listings || []);
      } catch (err) {
        // Fallback mockup stats for dev preview
        setStats({
          totalListings: 42,
          mealsSaved: 380,
          activeReservations: 8,
          co2ReducedKg: 190,
        });
        setListings([
          { id: 1, title: 'Fresh Bakery Pastries', status: 'Available', quantity: 20, unit: 'items', date: '2026-09-04' },
          { id: 2, title: 'Vegetable Buffet Rice Packs', status: 'Reserved', quantity: 35, unit: 'servings', date: '2026-09-04' },
          { id: 3, title: 'Assorted Sandwich Box', status: 'Completed', quantity: 15, unit: 'packs', date: '2026-09-03' },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateFoodStatus(id, newStatus);
      setListings((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return {
    stats,
    listings,
    isLoading,
    handleStatusChange,
  };
}
