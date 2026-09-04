import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Main Layout Navigation Bar.
 * @returns {JSX.Element}
 */
export function Navbar() {
  const location = useLocation();

  const navItems = [
    { label: 'Find Food', path: '/' },
    { label: 'Post Surplus Food', path: '/post-food' },
    { label: 'My Dashboard', path: '/dashboard' },
    { label: 'Collection', path: '/collection' },
    { label: 'Impact', path: '/impact' },
    { label: 'Admin Portal', path: '/admin' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
            FoodShare-LK
          </span>
        </Link>
        <nav className="flex items-center space-x-1 sm:space-x-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
