import React from 'react';
import { FoodFormFields } from './FoodFormFields';
import { Button } from '../../../components/ui/Button';
import { usePostFood } from '../hooks/usePostFood';

/**
 * Main Food Posting Form Container.
 */
export function FoodForm() {
  const { formData, errors, isSubmitting, successMessage, handleChange, handleSubmit } = usePostFood();

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 max-w-2xl mx-auto space-y-6">
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2">
          <span>✅</span> {successMessage}
        </div>
      )}

      {errors.submit && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm font-semibold flex items-center gap-2">
          <span>⚠️</span> {errors.submit}
        </div>
      )}

      <FoodFormFields formData={formData} handleChange={handleChange} errors={errors} />

      <Button type="submit" isLoading={isSubmitting} className="w-full py-3 text-base">
        Publish Food Share Listing
      </Button>
    </form>
  );
}
