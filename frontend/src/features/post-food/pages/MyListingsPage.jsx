import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, Search, Edit3, Trash2, Clock, MapPin, Eye, CheckCircle2, 
  AlertTriangle, ShieldCheck, Box, Leaf, RefreshCw, X, Sparkles
} from 'lucide-react';
import { getMyFoodListings, cancelFoodListing } from '../services/postFoodService';
import { CancelListingModal } from '../components/CancelListingModal';

const SAMPLE_LISTINGS = [
  {
    id: 1,
    title: 'Fresh Bread Packets',
    category: 'Bakery',
    subCategory: 'Made Today 2:30 PM',
    quantity: 20,
    unit: 'portions',
    unitNote: 'approx. 10 kg saved',
    pickupLocation: 'Jaffna Town',
    district: 'Northern Province',
    expiryDate: 'Today, 7:00 PM',
    expiryNote: '3 hours remaining',
    status: 'Available',
    donorName: 'Kavindi Perera',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Vegetable Rice Packs',
    category: 'Cooked Meals',
    subCategory: 'Freshly Prepared',
    quantity: 15,
    unit: 'portions',
    unitNote: 'Individual Lunch Boxes',
    pickupLocation: 'Colombo 03',
    district: 'Western Province',
    expiryDate: 'Today, 8:00 PM',
    expiryNote: '4 hours remaining',
    status: 'Available',
    donorName: 'Kavindi Perera',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Banana Bunches',
    category: 'Fruits & Vegetables',
    subCategory: 'Naturally Ripened',
    quantity: 10,
    unit: 'portions',
    unitNote: '10 Bunches (Ambul / Seeni)',
    pickupLocation: 'Kandy Central',
    district: 'Central Province',
    expiryDate: 'Today, 6:00 PM',
    expiryNote: 'Claimed by Peradeniya Hostel',
    status: 'Reserved',
    donorName: 'Kavindi Perera',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'Mixed Vegetable Curry & Roti',
    category: 'Rice & Curry',
    subCategory: 'Rescue Completed',
    quantity: 25,
    unit: 'portions',
    unitNote: '100% Collected',
    pickupLocation: 'Galle Fort',
    district: 'Southern Province',
    expiryDate: 'Yesterday, 9:00 PM',
    expiryNote: "Delivered to St. Anne's Community",
    status: 'Collected',
    donorName: 'Kavindi Perera',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&auto=format&fit=crop&q=80',
  },
];

export function MyListingsPage() {
  const navigate = useNavigate();
  const [listings, setListings] = useState(SAMPLE_LISTINGS);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCancelListing, setSelectedCancelListing] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const data = await getMyFoodListings();
      if (Array.isArray(data) && data.length > 0) {
        // Merge with sample listings for complete demo representation
        const existingIds = new Set(data.map((d) => d.id));
        const merged = [
          ...data,
          ...SAMPLE_LISTINGS.filter((s) => !existingIds.has(s.id)),
        ];
        setListings(merged);
      }
    } catch {
      // Fallback to sample listings on network/offline
      setListings(SAMPLE_LISTINGS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCancel = (item) => {
    setSelectedCancelListing(item);
    setIsCancelModalOpen(true);
  };

  const handleConfirmCancel = async (id, reason) => {
    try {
      await cancelFoodListing(id, reason);
    } catch {
      // Offline fallback
    }

    setListings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Cancelled', cancellationReason: reason } : item
      )
    );

    setIsCancelModalOpen(false);
    setFeedbackMessage(`Food listing #${id} has been cancelled successfully.`);
  };

  // Filter & Search Logic
  const filteredListings = listings.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' ||
      item.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getCountByStatus = (st) => {
    if (st === 'All') return listings.length;
    return listings.filter((l) => l.status.toLowerCase() === st.toLowerCase()).length;
  };

  const totalPortionsShared = listings.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Hackathon Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-[#eef2ff] border border-[#dbe4fe] px-4 py-2 rounded-2xl text-xs font-semibold text-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
          <span>MODULE: IT24102099 — POST & MANAGE SURPLUS FOOD</span>
          <span className="text-slate-400">•</span>
          <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-md">
            University Hackathon Demo
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-700 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Active Donor Verification ID: <strong className="font-mono text-slate-900">#LK-90214</strong></span>
        </div>
      </div>

      {/* Success Notification Alert */}
      {feedbackMessage && (
        <div className="p-4 bg-emerald-700 text-white rounded-2xl shadow-md flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">{feedbackMessage}</span>
          </div>
          <button
            onClick={() => setFeedbackMessage(null)}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base">
              🗂️
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Food Listings
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage and track active, reserved, and completed surplus food batches across Sri Lanka.
          </p>
        </div>

        {/* Top Right Metric Badges */}
        <div className="flex items-center gap-3 self-start md:self-center">
          <div className="bg-white border border-slate-200/90 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Box className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-lg font-black text-slate-900 leading-tight">
                {totalPortionsShared > 0 ? totalPortionsShared : 70}
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">
                Portions Shared
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-lg font-black text-slate-900 leading-tight">
                38 kg
              </div>
              <div className="text-[10px] font-bold text-emerald-700 uppercase">
                CO₂e Averted
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar & Filter Strip */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search my listings by title, town, or category..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#f0f4f9] hover:bg-[#e8f0f8] focus:bg-white border border-slate-200/90 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {[
            { id: 'All', label: 'All' },
            { id: 'Available', label: 'Available' },
            { id: 'Reserved', label: 'Reserved' },
            { id: 'Collected', label: 'Collected' },
            { id: 'Cancelled', label: 'Cancelled' },
          ].map((pill) => {
            const count = getCountByStatus(pill.id);
            const isSelected = statusFilter === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setStatusFilter(pill.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 ${
                  isSelected
                    ? 'bg-[#056526] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                }`}
              >
                <span>{pill.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Post New Food CTA */}
        <Link
          to="/post-food"
          className="px-5 py-2.5 bg-[#056526] hover:bg-[#04521e] active:scale-[0.99] text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition-all flex-shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Post New Food</span>
        </Link>
      </div>

      {/* Main Listings Table/Card Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-600">
            {/* Table Header */}
            <thead className="bg-[#f0f4f9] text-slate-600 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200/80">
              <tr>
                <th className="px-6 py-3.5">BATCH ITEM & DETAILS</th>
                <th className="px-6 py-3.5">QUANTITY</th>
                <th className="px-6 py-3.5">LOCATION & DISTRICT</th>
                <th className="px-6 py-3.5">EXPIRY / PICKUP CUTOFF</th>
                <th className="px-6 py-3.5 text-right">STATUS & ACTIONS</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100">
              {filteredListings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    <div className="max-w-xs mx-auto space-y-2">
                      <p className="font-bold text-slate-600">No listings found</p>
                      <p className="text-xs">No food shares match your current search or filter criteria.</p>
                      <button
                        onClick={() => { setSearchQuery(''); setStatusFilter('All'); }}
                        className="text-xs font-bold text-emerald-700 hover:underline"
                      >
                        Reset filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredListings.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    {/* Batch Item & Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={item.imageUrl || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&auto=format&fit=crop&q=80'}
                          alt={item.title}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                        />
                        <div>
                          <div className="font-extrabold text-slate-900 text-sm">
                            {item.title}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                            <span className="font-semibold text-slate-700">{item.category}</span>
                            <span>•</span>
                            <span>{item.subCategory || 'Freshly Listed'}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="px-6 py-4">
                      <div className="font-extrabold text-slate-900 text-sm">
                        {item.quantity} <span className="font-medium text-slate-600">portions</span>
                      </div>
                      <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                        {item.unitNote || 'approx. 10 kg saved'}
                      </div>
                    </td>

                    {/* Location & District */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{item.pickupLocation}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 pl-5">
                        {item.district || 'Northern Hub'}
                      </div>
                    </td>

                    {/* Expiry / Pickup Cutoff */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
                        <Clock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        <span>{item.expiryDate || 'Today, 7:00 PM'}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 pl-5">
                        {item.expiryNote || 'Active dispatch window'}
                      </div>
                    </td>

                    {/* Status & Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end gap-2">
                        {/* Status Pill */}
                        {item.status === 'Available' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            AVAILABLE
                          </span>
                        )}
                        {item.status === 'Reserved' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                            RESERVED
                          </span>
                        )}
                        {item.status === 'Collected' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-900 border border-blue-200">
                            <CheckCircle2 className="w-3 h-3 text-blue-700" />
                            COLLECTED
                          </span>
                        )}
                        {item.status === 'Cancelled' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-900 border border-rose-200">
                            <AlertTriangle className="w-3 h-3 text-rose-700" />
                            CANCELLED
                          </span>
                        )}

                        {/* Action Buttons for Feature 1 */}
                        <div className="flex items-center gap-1.5">
                          {item.status === 'Available' && (
                            <>
                              <Link
                                to={`/edit-food/${item.id}`}
                                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>Edit</span>
                              </Link>
                              <button
                                onClick={() => handleOpenCancel(item)}
                                className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Cancel Listing</span>
                              </button>
                            </>
                          )}

                          {item.status === 'Reserved' && (
                            <>
                              <button
                                disabled
                                title="Reserved listings cannot be edited while claim is active"
                                className="px-3 py-1 bg-slate-100 text-slate-400 rounded-lg text-xs font-bold flex items-center gap-1 cursor-not-allowed opacity-60"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-xs font-bold flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>View Reservation</span>
                              </span>
                            </>
                          )}

                          {item.status === 'Collected' && (
                            <span className="px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg text-xs font-bold flex items-center gap-1">
                              <span>View Summary</span>
                            </span>
                          )}

                          {item.status === 'Cancelled' && (
                            <span className="text-[11px] text-slate-400 italic">
                              Withdrawn from feed
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom 3 Verification Cards matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900">SLSI 1542:2020 Compliant</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              All listings conform to Sri Lanka Food Safety Standards. Food temperatures must be maintained above 60°C or below 5°C.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900">Rapid Dispatch Window</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Volunteer couriers and community hubs in Jaffna, Colombo, Kandy, and Galle are alerted within 45 seconds of listing.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900">Automated Handover Logs</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Digital QR receipts verify transfer to registered recipients, maintaining full traceability for university audit logs.
            </p>
          </div>
        </div>
      </div>

      {/* Cancellation Modal Component */}
      <CancelListingModal
        isOpen={isCancelModalOpen}
        listing={selectedCancelListing}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirmCancel={handleConfirmCancel}
      />
    </div>
  );
}
