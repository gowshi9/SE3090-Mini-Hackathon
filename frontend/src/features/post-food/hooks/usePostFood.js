import { useState } from 'react';
import { initialFoodState, validateFoodListing } from '../schemas/foodSchema';
import { createFoodListing } from '../services/postFoodService';

/**
 * Custom hook managing the food submission form state & logic.
 */
export function usePostFood() {
  const [formData, setFormData] = useState(initialFoodState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFoodListing(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await createFoodListing(formData);
      setSuccessMessage('Food listing posted successfully!');
      setFormData(initialFoodState);
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to submit food listing' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    successMessage,
    handleChange,
    handleSubmit,
  };
}
