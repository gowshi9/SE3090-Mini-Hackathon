import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowRight } from 'lucide-react';
import { FoodFormFields } from './FoodFormFields';

export function FoodForm({ formData, handleChange, errors, isSubmitting, setFormData, handleSubmit }) {
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/90 space-y-6">
      <FoodFormFields
        formData={formData}
        handleChange={handleChange}
        errors={errors}
        setFormData={setFormData}
      />

      {/* Action Buttons Row */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={() => navigate('/my-listings')}
          className="px-6 py-2.5 bg-[#f0f4f9] hover:bg-[#e4ebf5] text-slate-700 font-bold rounded-xl text-sm transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-7 py-3 bg-[#056526] hover:bg-[#04521e] active:scale-[0.99] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Send className="w-4 h-4 rotate-45 stroke-[2.5]" />
              <span>Post Food</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
