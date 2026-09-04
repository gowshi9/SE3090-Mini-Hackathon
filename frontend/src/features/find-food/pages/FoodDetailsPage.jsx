import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFoodListingById } from '../services/findFoodService';
import { Button } from '../../../components/ui/Button';

export function FoodDetailsPage() {
  const { id } = useParams();

  const [food, setFood] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFoodDetails() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getFoodListingById(id);
        setFood(data);
      } catch (err) {
        setError(err.message || 'Unable to load food details.');
      } finally {
        setIsLoading(false);
      }
    }

    loadFoodDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600 font-medium">
              Loading food details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !food) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold text-red-800 mb-3">
            Food listing not found
          </h1>

          <p className="text-red-600 mb-6">
            {error || 'This food listing may no longer be available.'}
          </p>

          <Link to="/">
            <Button variant="outline">
              Back to Find Food
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isAvailable = food.status?.toLowerCase() === 'available';

  const expiryDate = food.expiryDate
    ? new Date(food.expiryDate).toLocaleDateString('en-LK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Not specified';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back navigation */}
      <Link
        to="/"
        className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 mb-6"
      >
        ← Back to Find Food
      </Link>

      {/* Details Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image placeholder */}
          <div className="bg-emerald-50 min-h-[320px] lg:min-h-[500px] flex items-center justify-center">
            <div className="text-center px-6">
              <div className="text-7xl mb-4">🍱</div>
              <p className="text-emerald-700 font-semibold">
                Surplus Food
              </p>
            </div>
          </div>

          {/* Information */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                {food.category || 'Other'}
              </span>

              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  isAvailable
                    ? 'bg-green-100 text-green-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {food.status || 'Unknown'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              {food.title}
            </h1>

            <p className="text-slate-600 leading-7 mb-8">
              {food.description || 'No description available.'}
            </p>

            {/* Key information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">
                  Quantity
                </p>
                <p className="font-bold text-slate-900">
                  {food.quantity} {food.unit}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">
                  Expiry Date
                </p>
                <p className="font-bold text-slate-900">
                  {expiryDate}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 sm:col-span-2">
                <p className="text-xs text-slate-500 mb-1">
                  Pickup Location
                </p>
                <p className="font-bold text-slate-900">
                  📍 {food.pickupLocation || 'Not specified'}
                </p>
              </div>
            </div>

            {/* Donor */}
            <div className="border-t border-slate-200 pt-6 mb-8">
              <p className="text-xs text-slate-500 mb-1">
                Provided by
              </p>

              <p className="text-lg font-bold text-slate-900">
                {food.donorName || 'Community donor'}
              </p>
            </div>

            {/* Action */}
            {isAvailable ? (
              <Link to={`/reserve/${food.id}`} className="block">
                <Button variant="primary" className="w-full py-3">
                  Reserve Food
                </Button>
              </Link>
            ) : (
              <Button
                variant="outline"
                disabled
                className="w-full py-3"
              >
                Food No Longer Available
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}