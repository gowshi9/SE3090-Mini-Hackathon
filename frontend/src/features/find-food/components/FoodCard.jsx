import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

export function FoodCard({ item }) {
  const isAvailable = item.status?.toLowerCase() === 'available';

  const formattedExpiry = item.expiryDate
    ? new Date(item.expiryDate).toLocaleDateString('en-LK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Not specified';

  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Card Content */}
      <div className="p-6">
        {/* Category + Status */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
            {item.category || 'Other'}
          </span>

          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              isAvailable
                ? 'bg-green-100 text-green-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {item.status || 'Unknown'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {item.title || 'Untitled Food'}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-6 mb-5 line-clamp-3">
          {item.description || 'No description available.'}
        </p>

        {/* Food Information */}
        <div className="space-y-3 text-sm border-t border-slate-100 pt-4">
          <div className="flex items-start gap-3">
            <span>📦</span>
            <div>
              <p className="text-xs text-slate-500">Quantity</p>
              <p className="font-semibold text-slate-800">
                {item.quantity} {item.unit}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span>📍</span>
            <div>
              <p className="text-xs text-slate-500">Pickup Location</p>
              <p className="font-semibold text-slate-800">
                {item.pickupLocation || 'Not specified'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span>⏰</span>
            <div>
              <p className="text-xs text-slate-500">Expiry Date</p>
              <p className="font-semibold text-slate-800">
                {formattedExpiry}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span>👤</span>
            <div>
              <p className="text-xs text-slate-500">Provided by</p>
              <p className="font-semibold text-slate-800">
                {item.donorName || 'Community donor'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="p-4 bg-slate-50 border-t border-slate-100">
        {isAvailable ? (
          <Link to={`/reserve/${item.id}`} className="block">
            <Button variant="primary" className="w-full py-2">
              Reserve Food
            </Button>
          </Link>
        ) : (
          <Button variant="outline" disabled className="w-full py-2">
            Not Available
          </Button>
        )}
      </div>
    </article>
  );
}