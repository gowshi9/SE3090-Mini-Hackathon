import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, ShieldCheck, Clock, MapPin, 
  Save, X, Sparkles, Leaf, Eye, User, Utensils
} from 'lucide-react';
import { getFoodListingById, updateFoodListing } from '../services/postFoodService';
import { validateFoodListing } from '../schemas/foodSchema';

const DEFAULT_EDIT_ITEM = {
  id: '1042',
  title: 'Fresh Bread Packets',
  category: 'Bakery',
  quantity: 20,
  unit: 'portions',
  pickupLocation: 'Jaffna Town (Main St. Depot)',
  district: 'Northern Province',
  expiryDate: 'Today, 7:00 PM',
  description: 'Freshly baked artisanal sandwich loaves and dinner rolls from afternoon batch. Cleanly packaged and sealed in eco-friendly paper bags.',
  imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
  donorName: 'Kavindi Perera',
  donorRole: 'Verified Community Baker',
  status: 'Available',
};

const CATEGORIES = [
  'Bakery',
  'Cooked Meals',
  'Rice & Curry',
  'Fruits & Vegetables',
  'Packaged Groceries',
  'Beverages & Dairy',
];

const LOCATIONS = [
  'Jaffna Town (Main St. Depot)',
  'Jaffna Town',
  'Colombo 03 (Liberty Plaza Area)',
  'Colombo 07 (Cinnamon Gardens)',
  'Kandy Central (Clock Tower Hub)',
  'Galle Fort (Main Gate)',
];

export function EditFoodPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ ...DEFAULT_EDIT_ITEM, id: id || '1042' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (id) {
      loadListing(id);
    }
  }, [id]);

  const loadListing = async (listingId) => {
    setIsLoading(true);
    try {
      const data = await getFoodListingById(listingId);
      if (data) {
        setFormData((prev) => ({
          ...prev,
          ...data,
          id: data.id,
          title: data.title || prev.title,
          category: data.category || prev.category,
          quantity: data.quantity || prev.quantity,
          pickupLocation: data.pickupLocation || prev.pickupLocation,
          description: data.description || prev.description,
          imageUrl: data.imageUrl || prev.imageUrl,
        }));
      }
    } catch {
      // Keep sample data if offline
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const validationErrors = validateFoodListing(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    try {
      let parsedExpiry = new Date();
      parsedExpiry.setHours(parsedExpiry.getHours() + 5);

      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        quantity: parseInt(formData.quantity, 10),
        unit: formData.unit || 'portions',
        pickupLocation: formData.pickupLocation,
        expiryDate: parsedExpiry.toISOString(),
        imageUrl: formData.imageUrl,
      };

      await updateFoodListing(formData.id, payload);
      setSuccessMessage('Food listing updated successfully. Surplus distribution manifest has been updated for local verified dispatch riders.');
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to update food listing' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 text-left">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-[#eef2ff] border border-[#dbe4fe] px-4 py-2 rounded-2xl text-xs font-semibold text-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
          <span>MODULE: IT24102099 — POST & MANAGE SURPLUS FOOD | UNIVERSITY HACKATHON DEMO</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-sm">Sprint Review V2.4</span>
          <span className="text-slate-500">SLIIT Faculty of Computing</span>
        </div>
      </div>

      {/* Breadcrumb Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <Link to="/my-listings" className="hover:text-emerald-800 flex items-center gap-1 font-bold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>My Listings</span>
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Edit Listing #FL-{formData.id}</span>
          <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
            Active Post
          </span>
        </div>
        <div className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>Last sync: 4 mins ago by {formData.donorName || 'Kavindi P.'}</span>
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
              <span className="font-bold block sm:inline">Food listing updated successfully. </span>
              <span className="text-emerald-100">
                Surplus distribution manifest has been updated for local verified dispatch riders.
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

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Editor Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              <span className="text-emerald-700">LISTING EDITOR</span>
              <span>•</span>
              <span>Listing ID: #FL-{formData.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Edit Food Listing
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Update portion quantity, pickup location, or collection cutoff time to maintain dispatch integrity.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-900">
                  Food Item Title <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] font-semibold text-slate-400">
                  Visible in Public Surplus Feed
                </span>
              </div>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#f0f4f9] focus:bg-white border border-slate-200/80 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
              />
              {errors.title && <span className="text-xs text-rose-500 font-bold">{errors.title}</span>}
            </div>

            {/* Category and Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1.5">
                  Category <span className="text-rose-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#f0f4f9] focus:bg-white border border-slate-200/80 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-900">
                    Quantity (Portions) <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] font-bold text-emerald-800">
                    1 pack = 1 portion
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
                    className="w-full px-4 py-3 bg-[#f0f4f9] focus:bg-white border border-slate-200/80 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-slate-400">
                    units
                  </span>
                </div>
                {errors.quantity && <span className="text-xs text-rose-500 font-bold">{errors.quantity}</span>}
              </div>
            </div>

            {/* Pickup Location and Available Until */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-900">
                    Pickup Location <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-500 font-medium">Northern Province</span>
                </div>
                <select
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#f0f4f9] focus:bg-white border border-slate-200/80 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all cursor-pointer"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-900">
                    Available Until (Cutoff) <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-amber-800 font-bold flex items-center gap-0.5">
                    ⏱ Strict SLA
                  </span>
                </div>
                <input
                  type="text"
                  name="expiryDate"
                  required
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#f0f4f9] focus:bg-white border border-slate-200/80 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                />
                {errors.expiryDate && <span className="text-xs text-rose-500 font-bold">{errors.expiryDate}</span>}
              </div>
            </div>

            {/* Description & Handling Notes */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-900">
                  Batch Description & Handling Notes <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] font-mono text-slate-500 font-semibold">
                  {formData.description?.length || 0} / 300
                </span>
              </div>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                maxLength={300}
                className="w-full px-4 py-3 bg-[#f0f4f9] focus:bg-white border border-slate-200/80 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
              />
              <span className="text-[11px] text-slate-500 block mt-1">
                ✓ Includes safety confirmation: Non-perishable under ambient dry storage until stated cutoff.
              </span>
            </div>

            {/* Food Safety & Dietary Check Card */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  🍃
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">Food Safety & Dietary Check</h4>
                  <p className="text-[11px] text-emerald-900">Vegetarian • Egg-Free • Sealed in moisture barriers</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold bg-white text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-md">
                Standard Inspection: PASSED
              </span>
            </div>

            {/* Form Actions */}
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
                disabled={isSaving}
                className="px-7 py-3 bg-[#056526] hover:bg-[#04521e] active:scale-[0.99] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-60 cursor-pointer"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Preview Column */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Live Feed Card Preview */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                LIVE FEED CARD PREVIEW
              </span>
              <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Live
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="relative h-44 bg-slate-100">
                <img
                  src={formData.imageUrl || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80'}
                  alt={formData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <span>⚡ Cutoff {formData.expiryDate}</span>
                </div>
                <span className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                  {formData.category}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-base">{formData.title}</h3>
                  <span className="text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    {formData.quantity} Portions
                  </span>
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{formData.pickupLocation}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-bold">Free Redistribution</span>
                </div>

                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {formData.description}
                </p>

                {/* Provider Badge */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs flex items-center justify-center">
                    KP
                  </div>
                  <div className="text-left text-xs">
                    <div className="font-bold text-slate-900 leading-tight">
                      {formData.donorName || 'Kavindi Perera'} (Provider)
                    </div>
                    <div className="text-[10px] text-slate-500">{formData.donorRole || 'Verified Community Baker'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pickup Geo-Fence Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-900">PICKUP GEO-FENCE</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                🧭 GPS Calibrated
              </span>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-slate-200 h-28 bg-gradient-to-br from-teal-50 via-emerald-100 to-sky-100 flex items-center justify-center p-3 shadow-inner">
              <div className="bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2 shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{formData.pickupLocation}</span>
                <span className="text-[10px] text-slate-400 font-mono">Hub #04</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Food delivery volunteers within a 5km radius will receive instant alerts upon saving updates.
            </p>
          </div>

          {/* Estimated Impact Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-900 uppercase">ESTIMATED IMPACT</span>
              <Leaf className="w-4 h-4 text-emerald-600" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#f0f4f9] border border-slate-200/80">
                <div className="text-2xl font-black text-slate-900">14.8</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">Kg CO₂e Avoided</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#f0f4f9] border border-slate-200/80">
                <div className="text-2xl font-black text-slate-900">{formData.quantity || 20}</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">Meals Provided</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center">
                80%
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-slate-900">Batch Readiness</div>
                <div className="text-[11px] text-slate-600">Packaged & ready for immediate courier assignment</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Listing Modification Trail */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
        <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
          LISTING MODIFICATION TRAIL
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-[#f0f4f9] border border-slate-200/80">
            <div className="text-[10px] font-bold text-slate-500 uppercase">Created at</div>
            <div className="font-extrabold text-slate-900 text-sm mt-0.5">Today, 2:15 PM</div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Initial batch: 30 portions</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#f0f4f9] border border-slate-200/80">
            <div className="text-[10px] font-bold text-slate-500 uppercase">Claimed so far</div>
            <div className="font-extrabold text-slate-900 text-sm mt-0.5 text-amber-800">10 portions (2 rescues)</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Remaining: {formData.quantity}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#f0f4f9] border border-slate-200/80">
            <div className="text-[10px] font-bold text-slate-500 uppercase">Designated Dispatcher</div>
            <div className="font-extrabold text-slate-900 text-sm mt-0.5">Jaffna Youth Aid Guild</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Direct handover route</div>
          </div>
        </div>
      </div>
    </div>
  );
}
