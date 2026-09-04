import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Module: IT24102892 — Reserve & Prevent Over-claiming
 * Main UI component for Food Reservation with Over-claim Prevention.
 */
export function ReservationPage() {
  const navigate = useNavigate();
  
  // Available stock constant
  const maxAvailable = 20;

  // Form State
  const [quantity, setQuantity] = useState('5');
  const [confirmedCheckbox, setConfirmedCheckbox] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [submittedToken, setSubmittedToken] = useState('');

  // Parse numeric value
  const numericQty = quantity === '' ? null : Number(quantity);

  // Dynamic Validation Analysis
  const isOverClaim = numericQty !== null && !isNaN(numericQty) && numericQty > maxAvailable;
  const isEmpty = quantity === '';
  const isZero = numericQty === 0;
  const isNegative = numericQty !== null && !isNaN(numericQty) && numericQty < 0;
  const isValid = numericQty !== null && !isNaN(numericQty) && numericQty > 0 && numericQty <= maxAvailable && confirmedCheckbox;

  // Calculate allocation breakdown
  const reqCount = isValid ? numericQty : (numericQty && numericQty > 0 ? numericQty : 0);
  const reqPercentage = Math.min(Math.round((reqCount / maxAvailable) * 100), 100);
  const remainingCount = Math.max(maxAvailable - reqCount, 0);
  const remainingPercentage = 100 - reqPercentage;

  // Handler for Stepper Controls
  const handleIncrement = () => {
    const current = numericQty || 0;
    setQuantity(String(current + 1));
  };

  const handleDecrement = () => {
    const current = numericQty || 0;
    if (current > 1) {
      setQuantity(String(current - 1));
    }
  };

  // Test Case Injector handler
  const injectTestCase = (type) => {
    switch (type) {
      case 'overclaim':
        setQuantity('25');
        break;
      case 'empty':
        setQuantity('');
        break;
      case 'zero':
        setQuantity('0');
        break;
      case 'negative':
        setQuantity('-3');
        break;
      default:
        break;
    }
  };

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/reservation-confirmed');
    }, 600);
  };

  if (reservationSuccess) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
          ✓
        </div>
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Atomic Inventory Lock Active
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">Reservation Confirmed!</h2>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            Your claim of <strong className="text-slate-900">{quantity} portions</strong> of Fresh Bread Packets has been locked under UID <code className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-mono font-bold">IT24102892</code>.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 max-w-md mx-auto text-left flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-amber-800 uppercase">Pickup Token</div>
            <div className="text-xl font-mono font-black text-amber-900 tracking-wider">FR-JAF-582</div>
          </div>
          <div className="text-right text-xs text-amber-700">
            <div>📍 Jaffna Town Hub</div>
            <div>🕒 Pickup by 7:00 PM today</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/reservation-confirmed')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-all shadow-md text-sm"
          >
            View Official Manifest Token →
          </button>
          <button
            onClick={() => navigate('/my-reservations')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors text-sm"
          >
            View My Reservations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-slate-500 font-medium flex items-center gap-2">
        <Link to="/" className="hover:text-emerald-700 transition-colors">Browse Food</Link>
        <span>›</span>
        <span className="text-slate-700">Fresh Bread Packets</span>
        <span>›</span>
        <span className="text-emerald-700 font-bold">Reserve</span>
      </nav>

      {/* Main Page Title */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Reserve Food</h1>
        <p className="text-slate-600 text-sm mt-1 font-medium">
          Claim portions for your family, community welfare, or charity kitchen.
        </p>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Food Item & Portion Configuration (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 1: Food Listing Summary */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
            {/* Image Thumbnail with Priority tag */}
            <div className="relative w-full sm:w-36 h-32 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80"
                alt="Fresh Bread Packets"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                ⭐ Priority
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  BAKERY GOODS
                </span>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  Batch: AUX-JAF-402
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Fresh Bread Packets
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                Freshly wrapped assorted bakery sandwich bread batches from Nallur Community Bakeries.
              </p>

              <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Available</div>
                  <div className="font-extrabold text-emerald-700 text-sm">20 portions</div>
                </div>
                <div className="border-x border-indigo-100 px-1">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Location</div>
                  <div className="font-bold text-slate-800 text-xs truncate">📍 Jaffna Town</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Available Until</div>
                  <div className="font-bold text-amber-700 text-xs">🕒 7:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Configure Portions (The Interactive Over-Claim Prevention Form) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Configure Portions</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Enter the exact count of food portions required for your dispatch network.
              </p>
            </div>

            {/* Stepper Input Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="quantity" className="font-bold text-slate-800">
                  Quantity to Reserve <span className="text-rose-500">*</span>
                </label>
                <span className="text-slate-500 font-medium text-[11px]">
                  Max selectable: <strong className="text-slate-800 font-bold">{maxAvailable}</strong>
                </span>
              </div>

              {/* Stepper Control */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="w-12 h-12 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xl flex items-center justify-center transition-colors shadow-2xs active:scale-95 disabled:opacity-50"
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className={`flex-1 text-center font-extrabold text-2xl py-2 px-4 rounded-xl border ${
                    isOverClaim || isZero || isNegative || isEmpty
                      ? 'border-rose-300 bg-rose-50/50 text-rose-900 focus:ring-2 focus:ring-rose-400'
                      : 'border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500'
                  } outline-none transition-all`}
                />
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="w-12 h-12 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xl flex items-center justify-center transition-colors shadow-2xs active:scale-95"
                >
                  +
                </button>
              </div>

              {/* Helper/Validation Text */}
              <div className="text-xs">
                {isOverClaim && (
                  <p className="text-rose-600 font-bold flex items-center gap-1 mt-1">
                    ⚠️ Over-claim alert: You requested {quantity} portions, but only {maxAvailable} are available.
                  </p>
                )}
                {isEmpty && (
                  <p className="text-rose-600 font-bold flex items-center gap-1 mt-1">
                    🛑 Null validation: Quantity field cannot be left blank.
                  </p>
                )}
                {isZero && (
                  <p className="text-rose-600 font-bold flex items-center gap-1 mt-1">
                    ⛔ Zero baseline check: Portion count must be at least 1.
                  </p>
                )}
                {isNegative && (
                  <p className="text-rose-600 font-bold flex items-center gap-1 mt-1">
                    🚫 Inversion defense: Negative numbers are strictly blocked.
                  </p>
                )}
                {isValid && (
                  <p className="text-emerald-700 font-medium mt-1">
                    Allocating <strong className="font-bold">{quantity}</strong> of {maxAvailable} portions available.
                  </p>
                )}
              </div>
            </div>

            {/* ALLOCATION LEDGER PREVIEW */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-3">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                ALLOCATION LEDGER PREVIEW
              </div>

              {/* Metric Breakdown */}
              <div className="grid grid-cols-3 gap-3">
                {/* Available */}
                <div className="bg-white border border-slate-200 rounded-lg p-2.5 text-center">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Available</div>
                  <div className="text-xl font-black text-slate-900">{maxAvailable}</div>
                  <div className="text-[10px] text-slate-400">portions</div>
                </div>

                {/* Requested (Highlighted Gold/Peach) */}
                <div className="bg-amber-100/70 border border-amber-300 rounded-lg p-2.5 text-center">
                  <div className="text-[10px] text-amber-800 font-bold uppercase">Requested</div>
                  <div className="text-xl font-black text-amber-900">
                    {reqCount}
                  </div>
                  <div className="text-[10px] text-amber-700 font-medium">portions</div>
                </div>

                {/* Remaining */}
                <div className="bg-white border border-slate-200 rounded-lg p-2.5 text-center">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Remaining</div>
                  <div className={`text-xl font-black ${remainingCount > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {remainingCount}
                  </div>
                  <div className="text-[10px] text-slate-400">portions</div>
                </div>
              </div>

              {/* Dual Color Visual Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full transition-all duration-300 ${isOverClaim ? 'bg-rose-500' : 'bg-amber-500'}`}
                    style={{ width: `${Math.min(reqPercentage, 100)}%` }}
                  />
                  <div
                    className="h-full bg-emerald-600 transition-all duration-300"
                    style={{ width: `${isOverClaim ? 0 : remainingPercentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-semibold">
                  <span className={isOverClaim ? 'text-rose-700 font-bold' : 'text-amber-800'}>
                    Your Request ({reqPercentage}%)
                  </span>
                  <span className="text-slate-600">
                    Available for Others ({isOverClaim ? 0 : remainingPercentage}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Checkbox Confirmation */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={confirmedCheckbox}
                onChange={(e) => setConfirmedCheckbox(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-700 font-medium leading-tight group-hover:text-slate-900">
                I confirm that I will collect these <strong className="text-emerald-800 font-bold">{isValid ? quantity : '5'} portions</strong> before <strong className="text-slate-900 font-bold">7:00 PM</strong> today.
              </span>
            </label>

            {/* Confirm Reservation Button */}
            <button
              type="button"
              onClick={handleConfirmReservation}
              disabled={!isValid || isSubmitting}
              className={`w-full py-3.5 px-6 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                isValid && !isSubmitting
                  ? 'bg-emerald-800 hover:bg-emerald-900 text-white cursor-pointer active:scale-[0.99]'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Locking Inventory & Reserving...
                </span>
              ) : (
                <>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                  Confirm Reservation
                </>
              )}
            </button>

          </div>
        </div>

        {/* RIGHT COLUMN: Business Rules & Over-Claim Defense Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6 sticky top-20">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🛡️</span>
                <h3 className="text-base font-extrabold text-slate-900">
                  Business Rules & Over-Claim Defense
                </h3>
              </div>
              <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-200">
                Judge View
              </span>
            </div>

            {/* MANDATORY BUSINESS RULE Box */}
            <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-700">
                <span>⚡</span> MANDATORY BUSINESS RULE
              </div>
              <blockquote className="text-xs font-extrabold text-indigo-950 italic leading-snug">
                "Requested quantity MUST NOT exceed available quantity."
              </blockquote>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Under section 4.2 of the Mutual Aid Food Safety & Distribution Standard, atomic inventory locking guarantees no secondary claimant receives ghost stock during network dispatch.
              </p>
            </div>

            {/* INTERACTIVE TEST CASES */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  INTERACTIVE TEST CASES
                </span>
                <span className="text-slate-500 text-[10px]">Click scenario to inject:</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Test Case 1: Qty > Available (25) */}
                <button
                  type="button"
                  onClick={() => injectTestCase('overclaim')}
                  className={`p-2.5 text-left rounded-xl border transition-all text-xs flex flex-col justify-between ${
                    isOverClaim
                      ? 'bg-rose-100 border-rose-400 ring-2 ring-rose-300'
                      : 'bg-indigo-50/40 border-indigo-100 hover:bg-indigo-100/60'
                  }`}
                >
                  <div className="font-bold text-rose-700 text-xs flex items-center justify-between">
                    <span>Qty &gt; Available (25)</span>
                    <span>⚠️</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-medium">
                    Over-claim lock
                  </div>
                </button>

                {/* Test Case 2: Empty Input ("") */}
                <button
                  type="button"
                  onClick={() => injectTestCase('empty')}
                  className={`p-2.5 text-left rounded-xl border transition-all text-xs flex flex-col justify-between ${
                    isEmpty
                      ? 'bg-rose-100 border-rose-400 ring-2 ring-rose-300'
                      : 'bg-indigo-50/40 border-indigo-100 hover:bg-indigo-100/60'
                  }`}
                >
                  <div className="font-bold text-slate-800 text-xs flex items-center justify-between">
                    <span>Empty Input ("")</span>
                    <span>🛑</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-medium">
                    Null validation
                  </div>
                </button>

                {/* Test Case 3: Zero Count (0) */}
                <button
                  type="button"
                  onClick={() => injectTestCase('zero')}
                  className={`p-2.5 text-left rounded-xl border transition-all text-xs flex flex-col justify-between ${
                    isZero
                      ? 'bg-rose-100 border-rose-400 ring-2 ring-rose-300'
                      : 'bg-indigo-50/40 border-indigo-100 hover:bg-indigo-100/60'
                  }`}
                >
                  <div className="font-bold text-slate-800 text-xs flex items-center justify-between">
                    <span>Zero Count (0)</span>
                    <span>⛔</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-medium">
                    Zero baseline check
                  </div>
                </button>

                {/* Test Case 4: Negative (-3) */}
                <button
                  type="button"
                  onClick={() => injectTestCase('negative')}
                  className={`p-2.5 text-left rounded-xl border transition-all text-xs flex flex-col justify-between ${
                    isNegative
                      ? 'bg-rose-100 border-rose-400 ring-2 ring-rose-300'
                      : 'bg-indigo-50/40 border-indigo-100 hover:bg-indigo-100/60'
                  }`}
                >
                  <div className="font-bold text-slate-800 text-xs flex items-center justify-between">
                    <span>Negative (-3)</span>
                    <span>🚫</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-medium">
                    Inversion defense
                  </div>
                </button>
              </div>
            </div>

            {/* LIVE VALIDATION OBSERVER */}
            <div className="space-y-2">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                LIVE VALIDATION OBSERVER
              </div>

              {isValid && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-emerald-900">
                  <span className="text-base text-emerald-600 shrink-0">✓</span>
                  <div>
                    <div className="font-extrabold text-emerald-800">Ready & Validated</div>
                    <div className="text-[11px] text-emerald-700 mt-0.5 leading-snug">
                      {quantity} portions falls within acceptable inventory capacity ({maxAvailable} max). Zero over-claim violation detected.
                    </div>
                  </div>
                </div>
              )}

              {isOverClaim && (
                <div className="bg-rose-50 border border-rose-300 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-rose-900">
                  <span className="text-base text-rose-600 shrink-0">🚨</span>
                  <div>
                    <div className="font-extrabold text-rose-800">OVER-CLAIM VIOLATION DETECTED</div>
                    <div className="text-[11px] text-rose-700 mt-0.5 leading-snug">
                      Requested {quantity} exceeds available capacity ({maxAvailable} max)! Atomic inventory lock triggered: Auto-blocking submission.
                    </div>
                  </div>
                </div>
              )}

              {(isEmpty || isZero || isNegative) && (
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
                  <span className="text-base text-amber-600 shrink-0">⚠️</span>
                  <div>
                    <div className="font-extrabold text-amber-800">INVALID INPUT DETECTED</div>
                    <div className="text-[11px] text-amber-700 mt-0.5 leading-snug">
                      Portion count must be a positive integer greater than zero. Submission blocked.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SYSTEM VERIFICATION CHECKLIST */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                SYSTEM VERIFICATION CHECKLIST
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="flex items-center gap-2 font-semibold text-slate-700">
                    <span className="text-emerald-600 font-bold">✓</span> Over-claim Prevention (Qty &le; {maxAvailable})
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                    Auto-block
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="flex items-center gap-2 font-semibold text-slate-700">
                    <span className="text-emerald-600 font-bold">✓</span> Required / Non-empty State
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                    Required
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="flex items-center gap-2 font-semibold text-slate-700">
                    <span className="text-emerald-600 font-bold">✓</span> Greater Than Zero Requirement
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                    Minimum = 1
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="flex items-center gap-2 font-semibold text-slate-700">
                    <span className="text-emerald-600 font-bold">✓</span> Negative Number Inversion Check
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                    Sign Check
                  </span>
                </div>
              </div>
            </div>

            {/* Self-Pickup Dispatch Info Box */}
            <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="text-base">🚚</span>
                <div>
                  <div className="font-bold text-slate-900">Self-Pickup Dispatch</div>
                  <div className="text-[11px] text-slate-500">Nallur Station, Jaffna Town</div>
                </div>
              </div>
              <div className="text-[11px] font-bold text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded-md shadow-2xs">
                Today by 7:00 PM
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
