import { apiClient } from '../../../services/apiClient';

/**
 * Fetches dashboard analytics metrics.
 * @returns {Promise<any>}
 */
export async function getDashboardStats() {
  return apiClient('/dashboard/stats');
}

/**
 * Updates food listing status.
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
