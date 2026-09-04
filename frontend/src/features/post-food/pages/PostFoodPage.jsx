import React from 'react';
import { ShieldCheck, CheckCircle2, X } from 'lucide-react';
import { FoodForm } from '../components/FoodForm';
import { ValidationRulesCard } from '../components/ValidationRulesCard';
import { RecipientReachCard } from '../components/RecipientReachCard';
import { FoodPackagingGuidelinesCard } from '../components/FoodPackagingGuidelinesCard';
import { usePostFood } from '../hooks/usePostFood';

/**
 * Page component for IT24102099 - Feature 1: Post Surplus Food.
 */
export function PostFoodPage() {
  const {
    formData,
    setFormData,
    errors,
    isSubmitting,
    successMessage,
    setSuccessMessage,
    handleChange,
    handleSubmit,
  } = usePostFood();

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Module Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-[#eef2ff] border border-[#dbe4fe] px-4 py-2 rounded-2xl text-xs font-semibold text-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
          <span>MODULE: IT24102099 — POST & MANAGE SURPLUS FOOD</span>
          <span className="text-slate-400">•</span>
          <span className="text-[11px] font-mono text-slate-600 uppercase">UNIVERSITY HACKATHON DEMO</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-800 font-bold bg-emerald-100/80 px-2.5 py-0.5 rounded-full text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          Sprint Live
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMessage && (
        <div className="p-4 bg-[#056526] text-white rounded-2xl shadow-md flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            <div className="text-xs sm:text-sm">
              <span className="font-bold block sm:inline">Surplus food posted successfully. </span>
              <span className="text-emerald-100">
                Your listing is active and broadcasted to 14 verified mutual-aid partners in {formData.pickupLocation || 'Jaffna'}.
              </span>
            </div>
          </div>
          <button
            onClick={() => setSuccessMessage(null)}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-extrabold text-[#9a5b13] uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <span>⚡ RAPID COMMUNITY REDISTRIBUTION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Post Surplus Food
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Share safe, edible surplus food with your local community and regional care networks.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-xs self-start sm:self-center">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <div className="text-left text-xs">
            <div className="font-bold text-slate-900 leading-tight">Safety Protocol</div>
            <div className="text-[10px] text-slate-500 font-semibold">SLSI-387 Compliant</div>
          </div>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Form Column */}
        <div className="lg:col-span-7">
          <FoodForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            isSubmitting={isSubmitting}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
          />
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-5 space-y-5">
          <ValidationRulesCard formData={formData} />
          <RecipientReachCard location={formData.pickupLocation || 'Jaffna Town'} />
          <FoodPackagingGuidelinesCard />
        </div>
      </div>
    </div>
  );
}
