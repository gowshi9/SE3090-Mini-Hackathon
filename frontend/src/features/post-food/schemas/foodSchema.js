/**
 * Validation schema & default values for food posting.
 */
export const initialFoodState = {
  title: '',
  description: '',
  category: 'Cooked Meals',
  quantity: 1,
  unit: 'servings',
  pickupLocation: '',
  expiryDate: '',
  donorName: '',
  donorContact: '',
};

/**
 * Validates food listing form values.
 * @param {typeof initialFoodState} values
 * @returns {Record<string, string>} Validation errors.
 */
export function validateFoodListing(values) {
  const errors = {};
  if (!values.title?.trim()) errors.title = 'Title is required';
  if (!values.description?.trim()) errors.description = 'Description is required';
  if (!values.pickupLocation?.trim()) errors.pickupLocation = 'Pickup location is required';
  if (!values.donorName?.trim()) errors.donorName = 'Donor name is required';
  if (!values.donorContact?.trim()) errors.donorContact = 'Contact details are required';
  if (!values.expiryDate) errors.expiryDate = 'Expiry date is required';
  if (values.quantity <= 0) errors.quantity = 'Quantity must be greater than 0';
  return errors;
}
