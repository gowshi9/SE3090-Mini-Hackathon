import React from 'react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

/**
 * Reservation input form component.
 */
export function ReservationForm({ formData, handleChange, handleSubmit, errors, isSubmitting }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.submit && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-sm font-semibold">
          {errors.submit}
        </div>
      )}

      <Input
        label="Your Full Name / NGO Name"
        name="recipientName"
        placeholder="e.g. Community Relief Foundation"
        value={formData.recipientName}
        onChange={handleChange}
        error={errors.recipientName}
      />

      <Input
        label="Contact Phone / Email"
        name="recipientContact"
        placeholder="e.g. +94 71 987 6543"
        value={formData.recipientContact}
        onChange={handleChange}
        error={errors.recipientContact}
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="notes" className="text-sm font-semibold text-slate-700">
          Pickup Notes & Special Requests
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="e.g. Arriving around 4:00 PM today with cooling box..."
          value={formData.notes}
          onChange={handleChange}
          className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <Button type="submit" isLoading={isSubmitting} className="w-full py-3 text-base">
        Confirm Reservation
      </Button>
    </form>
  );
}
