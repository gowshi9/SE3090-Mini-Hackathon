import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

/**
 * Individual Food Item Card.
 */
export function FoodCard({ item }) {
  const isAvailable = item.status === 'Available';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex justify-between items-start gap-2 mb-2">
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
              {item.category}
            </span>
            <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
              isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {item.status}
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {item.title}
          </h3>

          <p className="text-slate-600 text-sm mt-2 line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="space-y-2 text-xs text-slate-500 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <span>📍</span> <strong className="text-slate-700">{item.pickupLocation}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>📦 {item.quantity} {item.unit}</span>
            <span>🕒 Exp: {new Date(item.expiryDate).toLocaleDateString()}</span>
          </div>
          <div className="text-slate-400 font-medium">
            Posted by: {item.donorName}
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <Link to={`/reserve/${item.id}`} className="w-full">
          <Button
            variant={isAvailable ? 'primary' : 'outline'}
            disabled={!isAvailable}
            className="w-full py-2 text-sm"
          >
            {isAvailable ? 'Reserve Food' : 'Already Reserved'}
          </Button>
        </Link>
      </div>
    </div>
  );
}
