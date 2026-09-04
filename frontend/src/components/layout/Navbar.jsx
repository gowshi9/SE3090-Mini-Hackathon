import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Main Layout Navigation Bar matching FoodRescue LK UI Reference.
 * @returns {JSX.Element}
 */
export function Navbar() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Browse Food', path: '/reserve' },
    { label: 'Post Food', path: '/post-food' },
    { label: 'My Listings', path: '/dashboard' },
    { label: 'My Reservations', path: '/my-reservations' },
    { label: 'Collection', path: '/collection' },
    { label: 'Impact', path: '/impact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 text-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2zm4 8h-2v-4h2v4zm0-6h-2V7h2v2z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black text-emerald-800 tracking-tight leading-none group-hover:text-emerald-700">
              FoodRescue LK
            </span>
            <span className="text-[9px] font-bold tracking-widest text-emerald-700 uppercase mt-0.5">
              SAVE FOOD. SHARE HOPE.
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/reserve' && location.pathname.startsWith('/reserve'));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2 bg-slate-100/80 hover:bg-slate-100 border border-slate-200/80 rounded-full px-3 py-1 cursor-pointer transition-colors">
          <div className="text-right">
            <div className="text-xs font-bold text-slate-800 leading-tight">Kavindi Perera</div>
            <div className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded-full inline-block">
              Food Provider & Student
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
            alt="Kavindi Perera"
            className="w-8 h-8 rounded-full object-cover border-2 border-emerald-500 shrink-0"
          />
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
}

