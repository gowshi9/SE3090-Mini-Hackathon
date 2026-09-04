/**
 * Centralized API client for communicating with the backend API.
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Performs an HTTP request with JSON payload handling.
 * @param {string} endpoint - The relative API endpoint path.
 * @param {RequestInit} [options] - Fetch request options.
 * @returns {Promise<any>} Response JSON data.
 */
export async function apiClient(endpoint, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'API Request Failed' }));
    throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
  }

  if (response.status === 24 || response.headers.get('content-length') === '0') {
    return null;
  }

  return response.json();
}
