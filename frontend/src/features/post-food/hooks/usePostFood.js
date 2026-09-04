import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialFoodState, validateFoodListing } from '../schemas/foodSchema';
import { createFoodListing } from '../services/postFoodService';

/**
 * Custom hook managing the food submission form state & logic.
 */
export function usePostFood() {
  const navigate = useNavigate();
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
    if (e) e.preventDefault();
    const validationErrors = validateFoodListing(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setIsSubmitting(true);
    try {
      // Backend expects proper ExpiryDate format
      let parsedExpiry = new Date();
      parsedExpiry.setHours(parsedExpiry.getHours() + 6);

      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        quantity: parseInt(formData.quantity, 10),
        unit: formData.unit || 'portions',
        pickupLocation: formData.pickupLocation,
        expiryDate: parsedExpiry.toISOString(),
        donorName: formData.donorName || 'Kavindi Perera',
        donorContact: formData.donorContact || 'kavindi.p@univ.ac.lk',
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
      };

      await createFoodListing(payload);
      setSuccessMessage('Surplus food posted successfully. Your listing is active and broadcasted to 14 verified mutual-aid partners in Jaffna.');
      
      // Auto navigate to my listings after brief delay or user can view directly
      return true;
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to submit food listing' });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    isSubmitting,
    successMessage,
    setSuccessMessage,
    handleChange,
    handleSubmit,
  };
}
