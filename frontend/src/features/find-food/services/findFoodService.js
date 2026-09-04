import { apiClient } from '../../../services/apiClient';

/**
 * Fetches available food listings with search parameters.
 * @param {Object} filters
 * @returns {Promise<any[]>}
 */
export async function getFoodListings(filters = {}) {
  const query = new URLSearchParams();
  if (filters.searchQuery) query.append('query', filters.searchQuery);
  if (filters.category) query.append('category', filters.category);
  if (filters.location) query.append('location', filters.location);
  if (filters.status) query.append('status', filters.status);

  const endpoint = `/foodlistings${query.toString() ? `?${query.toString()}` : ''}`;
  return apiClient(endpoint);
}

/**
 * Fetches a single food listing by ID.
 * @param {number|string} id
 * @returns {Promise<any>}
 */
export async function getFoodListingById(id) {
  return apiClient(`/foodlistings/${id}`);
}
