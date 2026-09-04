import { useState, useEffect, useCallback } from 'react';
import { defaultFilterState } from '../schemas/foodFilterSchema';
import { getFoodListings } from '../services/findFoodService';

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
      setFoodItems([]);
      setError(err.message || 'Failed to load food listings.');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const updateFilter = (key, value) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      [key]: value,
    }));
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