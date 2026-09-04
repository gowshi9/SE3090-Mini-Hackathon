/**
 * Validation schema & default values for food posting.
 */
export const initialFoodState = {
  title: 'Fresh Bread Packets',
  description: 'Freshly baked artisanal sandwich loaves and dinner rolls from afternoon batch. Cleanly packaged and sealed in eco-friendly paper bags.',
  category: 'Bakery',
  quantity: 20,
  unit: 'portions',
  pickupLocation: 'Jaffna Town',
  expiryDate: 'Today, 7:00 PM',
  imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
  donorName: 'Kavindi Perera',
  donorContact: 'kavindi.p@univ.ac.lk',
};

/**
 * Validates food listing form values.
 * @param {typeof initialFoodState} values
 * @returns {Record<string, string>} Validation errors.
 */
export function validateFoodListing(values) {
  const errors = {};
  if (!values.title?.trim()) {
    errors.title = 'Food name is required.';
  }
  if (!values.category?.trim()) {
    errors.category = 'Please select a category.';
  }
  if (values.quantity === '' || values.quantity === null || values.quantity === undefined) {
    errors.quantity = 'Quantity is required.';
  } else if (Number(values.quantity) <= 0) {
    errors.quantity = 'Quantity must be greater than 0.';
  }
  if (!values.pickupLocation?.trim()) {
    errors.pickupLocation = 'Pickup location is required.';
  }
  if (!values.expiryDate?.trim()) {
    errors.expiryDate = 'Please enter a valid availability time.';
  }
  if (values.description && values.description.length > 500) {
    errors.description = 'Description cannot exceed 500 characters.';
  }
  return errors;
}

/**
 * Returns the status of the 5 validation rules for the real-time checklist.
 * @param {typeof initialFoodState} values
 */
export function getValidationRulesStatus(values) {
  const rules = [
    {
      id: 'name',
      label: 'Food name is required.',
      subtext: values.title?.trim() ? `Detected: '${values.title.trim()}'` : 'Missing title',
      isMet: !!values.title?.trim(),
    },
    {
      id: 'category',
      label: 'Please select a category.',
      subtext: values.category?.trim() ? `Selected: '${values.category.trim()}'` : 'No category selected',
      isMet: !!values.category?.trim(),
    },
    {
      id: 'quantity',
      label: 'Quantity must be greater than 0.',
      subtext: Number(values.quantity) > 0 ? `Count: ${values.quantity} units (Valid > 0)` : 'Quantity must be > 0',
      isMet: Number(values.quantity) > 0,
    },
    {
      id: 'location',
      label: 'Location is required.',
      subtext: values.pickupLocation?.trim() ? `Assigned: '${values.pickupLocation.trim()}'` : 'Missing location',
      isMet: !!values.pickupLocation?.trim(),
    },
    {
      id: 'time',
      label: 'Please enter a valid availability time.',
      subtext: values.expiryDate?.trim() ? `Target: '${values.expiryDate.trim()}'` : 'Missing availability cutoff',
      isMet: !!values.expiryDate?.trim(),
    },
  ];

  const metCount = rules.filter((r) => r.isMet).length;
  return { rules, metCount, totalCount: rules.length, allMet: metCount === rules.length };
}
