import { apiClient } from '../../../services/apiClient';

/**
 * Creates a food reservation request.
 * @param {Object} payload
 * @returns {Promise<any>}
 */
export async function createReservation(payload) {
  return apiClient('/reservations', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Gets reservation details by ID.
 * @param {number|string} id
 * @returns {Promise<any>}
 */
export async function getReservationById(id) {
  return apiClient(`/reservations/${id}`);
}
