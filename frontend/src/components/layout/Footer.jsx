import React from 'react';

/**
 * Main Layout Footer Component.
 * @returns {JSX.Element}
 */
export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} FoodShare-LK (SE3090 Mini Hackathon). All rights reserved.
        </p>
        <p className="text-xs text-slate-500">
          Empowering communities to reduce food waste & support those in need.
        </p>
      </div>
    </footer>
  );
}
