import { apiClient } from '../../../services/apiClient';

/**
 * Submits a new food listing to the backend API.
 * @param {Object} foodData
 * @returns {Promise<any>}
 */
export async function createFoodListing(foodData) {
  return apiClient('/foodlistings', {
    method: 'POST',
    body: JSON.stringify(foodData),
  });
}
