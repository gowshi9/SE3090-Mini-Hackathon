import { useState, useEffect } from 'react';
import { initialReservationState, validateReservation } from '../schemas/reservationSchema';
import { createReservation } from '../services/reservationService';
import { getFoodListingById } from '../../find-food/services/findFoodService';

/**
 * Hook for managing reservation process.
 * @param {string|number} foodListingId
 */
export function useReservation(foodListingId) {
  const [foodItem, setFoodItem] = useState(null);
  const [formData, setFormData] = useState(initialReservationState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(null);

  useEffect(() => {
    async function loadItem() {
      setIsLoading(true);
      try {
        const item = await getFoodListingById(foodListingId);
        setFoodItem(item);
      } catch (err) {
        // Fallback for dev mode
        setFoodItem({
          id: foodListingId || 1,
          title: 'Fresh Bakery Pastries & Bread',
          description: 'Surplus items from bakery closing.',
          category: 'Bakery Items',
          quantity: 20,
          unit: 'items',
          pickupLocation: 'Bambalapitiya, Colombo 04',
          donorName: 'Golden Loaf Bakery',
        });
      } finally {
        setIsLoading(false);
      }
    }
    if (foodListingId) loadItem();
  }, [foodListingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateReservation(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createReservation({
        foodListingId: Number(foodListingId),
        ...formData,
      });
      setReservationSuccess(res || { id: Date.now(), status: 'Confirmed' });
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to complete reservation' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    foodItem,
    formData,
    errors,
    isLoading,
    isSubmitting,
    reservationSuccess,
    handleChange,
    handleSubmit,
  };
}
