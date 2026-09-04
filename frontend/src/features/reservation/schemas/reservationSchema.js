/**
 * Schema and initial form state for reserving food.
 */
export const initialReservationState = {
  recipientName: '',
  recipientContact: '',
  notes: '',
};

/**
 * Validates reservation form input.
 * @param {typeof initialReservationState} values
 * @returns {Record<string, string>}
 */
export function validateReservation(values) {
  const errors = {};
  if (!values.recipientName?.trim()) errors.recipientName = 'Your name is required';
  if (!values.recipientContact?.trim()) errors.recipientContact = 'Contact phone/email is required';
  return errors;
}
