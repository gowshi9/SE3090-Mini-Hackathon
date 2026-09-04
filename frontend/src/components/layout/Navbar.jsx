import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, User, Sparkles, Leaf } from 'lucide-react';
import { useAuth } from '../../features/auth/context/AuthContext';

/**
 * Main Layout Navigation Bar.
 * @returns {JSX.Element}
 */
export function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { label: 'Find Food', path: '/' },
    { label: 'Post Surplus Food', path: '/post-food' },
    { label: 'My Dashboard', path: '/dashboard' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            FoodShare-LK
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-600/90 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Auth Area */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 bg-slate-800/80 border border-slate-700/60 rounded-full py-1 pl-1 pr-3 text-left">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-emerald-400"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-emerald-700 flex items-center justify-center text-xs font-bold text-white">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                )}
                <div className="hidden sm:block">
                  <div className="text-xs font-bold text-white leading-tight flex items-center gap-1">
                    <span>{user.name}</span>
                    {user.isVerified && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    )}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-medium leading-none">
                    {user.roleLabel || 'Member'}
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                title="Log Out"
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-xs sm:text-sm font-bold text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-lg transition-all"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-3.5 py-1.5 text-xs sm:text-sm font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm hover:shadow transition-all"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
