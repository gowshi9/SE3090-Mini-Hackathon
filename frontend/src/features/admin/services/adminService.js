import { apiClient } from '../../../services/apiClient';

/**
 * Service for Admin Management feature API integrations.
 */

/**
 * Fetches platform summary statistics.
 * @returns {Promise<any>}
 */
export async function getAdminStats() {
  return apiClient('/dashboard/stats');
}

/**
 * Fetches food listings with optional query, category, and status filtering.
 * @param {Object} [filters]
 * @param {string} [filters.query]
 * @param {string} [filters.category]
 * @param {string} [filters.status]
 * @returns {Promise<any>}
 */
export async function getAdminListings(filters = {}) {
  const params = new URLSearchParams();
  if (filters.query) params.append('query', filters.query);
  if (filters.category) params.append('category', filters.category);
  if (filters.status) params.append('status', filters.status);

  const queryString = params.toString() ? `?${params.toString()}` : '';
  return apiClient(`/foodlistings${queryString}`);
}

/**
 * Fetches all platform reservations.
 * @returns {Promise<any>}
 */
export async function getAdminReservations() {
  return apiClient('/reservations');
}

/**
 * Updates a food listing's status.
 * @param {number|string} id
 * @param {string} status
 * @returns {Promise<any>}
 */
export async function updateListingStatus(id, status) {
  return apiClient(`/foodlistings/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}
