import { apiClient } from '../../../services/apiClient';

/**
 * Fetches dashboard analytics metrics.
 * @returns {Promise<any>}
 */
export async function getDashboardStats() {
  return apiClient('/dashboard/stats');
}

/**
 * Fetches all food listings.
 * @param {string} [status]
 * @returns {Promise<any>}
 */
export async function getAllFoodListings(status) {
  const query = status ? `?status=${encodeURIComponent(status)}` : '';
  return apiClient(`/foodlistings${query}`);
}

/**
 * Fetches all reservations.
 * @returns {Promise<any>}
 */
export async function getReservations() {
  return apiClient('/reservations');
}

/**
 * Updates food listing status (e.g. RESERVED -> COLLECTED).
 * @param {number|string} id
 * @param {string} status
 * @returns {Promise<any>}
 */
export async function updateFoodStatus(id, status) {
  return apiClient(`/foodlistings/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

