import { useState, useEffect, useCallback } from 'react';
import { defaultFilterState } from '../schemas/foodFilterSchema';
import { getFoodListings } from '../services/findFoodService';

/**
 * Custom hook for searching and filtering food listings.
 */
export function useFoodSearch() {
  const [filters, setFilters] = useState(defaultFilterState);
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFoodListings(filters);
      setFoodItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load food listings');
      // Fallback mockup data for dev preview if API is offline
      setFoodItems([
        {
          id: 1,
          title: 'Fresh Bakery Pastries & Bread',
          description: 'Surplus items from bakery closing. Includes buns, loaves, and Danishes.',
          category: 'Bakery Items',
          quantity: 20,
          unit: 'items',
          pickupLocation: 'Bambalapitiya, Colombo 04',
          expiryDate: new Date(Date.now() + 86400000).toISOString(),
          status: 'Available',
          donorName: 'Golden Loaf Bakery',
        },
        {
          id: 2,
          title: 'Vegetable Buffet Rice Packs',
          description: 'Untouched freshly cooked lunch packets from corporate event.',
          category: 'Cooked Meals',
          quantity: 35,
          unit: 'servings',
          pickupLocation: 'Kollupitiya, Colombo 03',
          expiryDate: new Date(Date.now() + 43200000).toISOString(),
          status: 'Available',
          donorName: 'TechHub Lanka Catering',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilterState);
  };

  return {
    filters,
    foodItems,
    isLoading,
    error,
    updateFilter,
    resetFilters,
    refetch: fetchListings,
  };
}
