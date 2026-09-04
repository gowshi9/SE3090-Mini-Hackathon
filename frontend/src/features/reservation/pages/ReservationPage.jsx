import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useReservation } from '../hooks/useReservation';
import { ReservationSummary } from '../components/ReservationSummary';
import { ReservationForm } from '../components/ReservationForm';
import { Loading } from '../../../components/ui/Loading';
import { Button } from '../../../components/ui/Button';

/**
 * Page component for Member 3 - Food Reservation.
 */
export function ReservationPage() {
  const { id } = useParams();
  const {
    foodItem,
    formData,
    errors,
    isLoading,
    isSubmitting,
    reservationSuccess,
    handleChange,
    handleSubmit,
  } = useReservation(id);

  if (isLoading) {
    return <Loading message="Loading food details..." />;
  }

  if (reservationSuccess) {
    return (
      <div className="max-w-lg mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto">
          ✓
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Reservation Confirmed!</h2>
        <p className="text-slate-600">
          Thank you! Please contact the donor to coordinate pickup using the details provided.
        </p>
        <Link to="/">
          <Button className="mt-4">Back to Food Listings</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Reserve Surplus Food</h1>
        <p className="text-slate-600 mt-1">Complete the details below to claim this food listing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ReservationSummary foodItem={foodItem} />
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
          <ReservationForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
