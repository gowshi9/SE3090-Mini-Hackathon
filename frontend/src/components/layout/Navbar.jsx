import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, LogOut } from 'lucide-react';
import { useAuth } from '../../features/auth/context/AuthContext';

/**
 * Main Layout Navigation Bar matching FoodRescue LK design reference.
 * @returns {JSX.Element}
 */
export function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [

  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 text-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo matching screenshots */}
        <Link to="/my-listings" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
            <Leaf className="w-4 h-4 fill-white" />
          </div>
          <div className="text-left">
            <span className="text-xl font-black text-[#056526] tracking-tight block leading-none">
              FoodRescue <span className="text-xs font-bold text-[#9a5b13] bg-amber-100/80 px-1 py-0.5 rounded-sm ml-0.5">LK</span>
            </span>
            <span className="text-[9px] font-extrabold tracking-widest text-[#9a5b13] block mt-0.5 uppercase">
              SAVE FOOD. SHARE HOPE.
            </span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-[#056526] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right User Area */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 bg-[#f0f4f9] border border-slate-200/80 rounded-full py-1 pl-3 pr-1 shadow-2xs">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-black text-slate-900 leading-tight">
                {user?.name || 'Kavindi Perera'}
              </div>
              <div className="text-[10px] font-bold text-[#9a5b13] bg-amber-100/90 px-1.5 py-0.2 rounded-sm inline-block leading-tight mt-0.5">
                Food Provider & Student
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover border border-slate-300"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
