import React, { useRef } from 'react';
import { Check, Upload, Image, RefreshCw, Trash2, Clock, MapPin, Tag, Utensils, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  'Bakery',
  'Cooked Meals',
  'Rice & Curry',
  'Fruits & Vegetables',
  'Packaged Groceries',
  'Beverages & Dairy',
];

const LOCATIONS = [
  'Jaffna Town',
  'Jaffna Town (Main St. Depot)',
  'Colombo 03 (Liberty Plaza Area)',
  'Colombo 07 (Cinnamon Gardens)',
  'Kandy Central (Clock Tower Hub)',
  'Galle Fort (Main Gate)',
  'Negombo Beach Road Hub',
  'Kurunegala Town Centre',
];

export function FoodFormFields({ formData, handleChange, errors, setFormData }) {
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, imageUrl }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, imageUrl: '' }));
  };

  return (
    <div className="space-y-6 text-left">
      {/* Step 1 Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center text-sm border border-blue-200">
            1
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">Food Details</h2>
            <p className="text-xs text-slate-500">Accurate data ensures rapid claim and hygienic handling.</p>
          </div>
        </div>
        <span className="text-[11px] font-bold text-amber-700">* Required fields</span>
      </div>

      {/* Food Name */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1">
            <span>Food Name</span>
            <span className="text-rose-500">*</span>
          </label>
          {formData.title?.trim() && (
            <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Valid title
            </span>
          )}
        </div>
        <input
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Fresh Bread Packets"
          className={`w-full px-4 py-3 bg-[#f0f4f9] hover:bg-[#e9eff6] focus:bg-white border rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all ${
            errors.title ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200/80'
          }`}
        />
        <div className="flex items-center justify-between mt-1">
          <span className="text-[11px] text-slate-500">
            ⓘ Provide a clear descriptive title for quick volunteer matching.
          </span>
          {errors.title && <span className="text-xs text-rose-500 font-bold">{errors.title}</span>}
        </div>
      </div>

      {/* Category and Quantity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Category */}
        <div>
          <label className="text-xs sm:text-sm font-bold text-slate-900 block mb-1.5">
            Category <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#f0f4f9] hover:bg-[#e9eff6] focus:bg-white border border-slate-200/80 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Determines storage temperature requirements.
          </span>
        </div>

        {/* Quantity */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs sm:text-sm font-bold text-slate-900">
              Quantity <span className="text-rose-500">*</span>
            </label>
            <span className="text-[10px] font-extrabold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-sm uppercase tracking-wider">
              PORTIONS/PACKETS
            </span>
          </div>
          <div className="relative">
            <input
              type="number"
              name="quantity"
              min="1"
              required
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g. 20"
              className={`w-full px-4 py-3 bg-[#f0f4f9] hover:bg-[#e9eff6] focus:bg-white border rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all ${
                errors.quantity ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200/80'
              }`}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[11px] text-slate-500">
              Approximate count or standard servings available.
            </span>
            {errors.quantity && <span className="text-xs text-rose-500 font-bold">{errors.quantity}</span>}
          </div>
        </div>
      </div>

      {/* Pickup Location and Available Until */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Location */}
        <div>
          <label className="text-xs sm:text-sm font-bold text-slate-900 block mb-1.5">
            Pickup Location <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#f0f4f9] hover:bg-[#e9eff6] focus:bg-white border border-slate-200/80 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all cursor-pointer"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Designated point for NGO collection van or dispatch.
          </span>
        </div>

        {/* Available Until */}
        <div>
          <label className="text-xs sm:text-sm font-bold text-slate-900 block mb-1.5">
            Available Until <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="expiryDate"
              required
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="e.g. Today, 7:00 PM"
              className={`w-full px-4 py-3 bg-[#f0f4f9] hover:bg-[#e9eff6] focus:bg-white border rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all ${
                errors.expiryDate ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200/80'
              }`}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[11px] text-slate-500">
              Food spoilage limit based on kitchen preparation time.
            </span>
            {errors.expiryDate && <span className="text-xs text-rose-500 font-bold">{errors.expiryDate}</span>}
          </div>
        </div>
      </div>

      {/* Description & Packaging Notes */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs sm:text-sm font-bold text-slate-900">
            Description & Packaging Notes
          </label>
          <span className="text-[11px] font-mono text-slate-500 font-semibold">
            {formData.description?.length || 0} / 500
          </span>
        </div>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          maxLength={500}
          placeholder="Freshly baked artisanal sandwich loaves and dinner rolls from afternoon batch. Cleanly packaged and sealed."
          className="w-full px-4 py-3 bg-[#f0f4f9] hover:bg-[#e9eff6] focus:bg-white border border-slate-200/80 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all placeholder:text-slate-400"
        />
        <div className="flex items-center justify-between mt-1">
          <span className="text-[11px] text-slate-500">
            Include allergen warnings (gluten, dairy, eggs, peanuts).
          </span>
          {errors.description && <span className="text-xs text-rose-500 font-bold">{errors.description}</span>}
        </div>
      </div>

      {/* Food Image Verification */}
      <div className="space-y-2">
        <label className="text-xs sm:text-sm font-bold text-slate-900 block">
          Food Image Verification
        </label>
        <div className="p-4 bg-[#f0f4f9] border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative w-24 h-20 bg-slate-200 rounded-xl overflow-hidden flex-shrink-0 border border-slate-300">
            {formData.imageUrl ? (
              <img
                src={formData.imageUrl}
                alt="Food Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <Image className="w-6 h-6" />
              </div>
            )}
            {formData.imageUrl && (
              <span className="absolute top-1 left-1 bg-emerald-700/90 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm shadow-xs">
                Loaded
              </span>
            )}
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-slate-900 font-mono">
                bread_batch_38_jaffna.jpg
              </span>
              <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-sm font-semibold">
                1.4 MB
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Image verified by provider {formData.donorName || 'Kavindi Perera'}. Clear shot helps recipient shelters plan transport.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <RefreshCw className="w-3 h-3 text-slate-500" />
                <span>Replace Photo</span>
              </button>
              {formData.imageUrl && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
