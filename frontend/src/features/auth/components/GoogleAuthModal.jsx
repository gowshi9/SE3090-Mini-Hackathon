import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export function GoogleAuthModal({ isOpen, onClose, onSelectGoogleAccount }) {
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  if (!isOpen) return null;

  const mockGoogleAccounts = [
    {
      name: 'Kavindi Perera',
      email: 'kavindi.perera@gmail.com',
      picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      badge: 'Colombo, Sri Lanka',
    },
    {
      name: 'Western Province Food Bank',
      email: 'foodbank.wp.lk@gmail.com',
      picture: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=120&auto=format&fit=crop&q=80',
      badge: 'Verified NGO Org',
    },
    {
      name: 'Nuwan Jayasinghe',
      email: 'nuwan.j@gmail.com',
      picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      badge: 'Community Volunteer',
    },
  ];

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail) return;
    onSelectGoogleAccount({
      name: customName || customEmail.split('@')[0],
      email: customEmail,
      picture: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(customName || customEmail)}`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden transition-all transform animate-scaleUp">
        {/* Google Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-7 h-7" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Sign in with Google</h3>
              <p className="text-xs text-slate-500">to continue to FoodRescue-LK</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Account Selector List */}
        <div className="p-6 space-y-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Choose an account
          </p>

          <div className="space-y-2">
            {mockGoogleAccounts.map((acc) => (
              <button
                key={acc.email}
                onClick={() => onSelectGoogleAccount(acc)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={acc.picture}
                    alt={acc.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 group-hover:ring-2 group-hover:ring-emerald-500 transition-all"
                  />
                  <div>
                    <div className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
                      {acc.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    </div>
                    <div className="text-xs text-slate-500">{acc.email}</div>
                  </div>
                </div>
                <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-colors">
                  {acc.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Custom Google Account Option */}
          {!showCustomInput ? (
            <button
              onClick={() => setShowCustomInput(true)}
              className="w-full text-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 py-2 hover:underline flex items-center justify-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" /> Use another Google account
            </button>
          ) : (
            <form onSubmit={handleCustomSubmit} className="pt-2 border-t border-slate-100 space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Anura Bandara"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Google Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                Sign In With This Google Account <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-400 justify-center">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <span>To continue, Google will share your name and email with FoodRescue-LK.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
