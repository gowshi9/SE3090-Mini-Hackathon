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

/**
 * Retrieves all food listings for the current provider/user.
 * @param {Object} [params]
 * @returns {Promise<Array>}
 */
export async function getMyFoodListings(params = {}) {
  const searchParams = new URLSearchParams();
  if (params.query) searchParams.append('query', params.query);
  if (params.category) searchParams.append('category', params.category);
  if (params.status) searchParams.append('status', params.status);

  const qs = searchParams.toString();
  return apiClient(`/foodlistings${qs ? `?${qs}` : ''}`);
}

/**
 * Fetches single food listing details by ID.
 * @param {number|string} id
 * @returns {Promise<any>}
 */
export async function getFoodListingById(id) {
  return apiClient(`/foodlistings/${id}`);
}

/**
 * Updates an existing food listing.
 * @param {number|string} id
 * @param {Object} foodData
 * @returns {Promise<any>}
 */
export async function updateFoodListing(id, foodData) {
  return apiClient(`/foodlistings/${id}`, {
    method: 'PUT',
    body: JSON.stringify(foodData),
  });
}

/**
 * Cancels a food listing (soft-cancellation with optional reason).
 * @param {number|string} id
 * @param {string} [reason]
 * @returns {Promise<any>}
 */
export async function cancelFoodListing(id, reason) {
  return apiClient(`/foodlistings/${id}/cancel`, {
    method: 'PATCH',
    body: JSON.stringify({ reason }),
  });
}
