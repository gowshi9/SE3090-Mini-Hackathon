import React from 'react';

/**
 * Main Layout Footer Component matching FoodRescue LK UI Reference.
 * @returns {JSX.Element}
 */
export function Footer() {
  return (
    <footer className="bg-slate-100 text-slate-600 border-t border-slate-200 pt-8 pb-6 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <p className="font-bold text-slate-800 text-sm">
              FoodRescue LK <span className="text-slate-400 font-normal">• Mutual Aid Network</span>
            </p>
            <p className="text-slate-500 mt-0.5">
              Sri Lanka University Software Engineering Hackathon Project
            </p>
          </div>
          <div className="flex items-center space-x-6 text-slate-600 font-medium">
            <a href="#about" className="hover:text-emerald-700 transition-colors">About</a>
            <a href="#how" className="hover:text-emerald-700 transition-colors">How It Works</a>
            <a href="#impact" className="hover:text-emerald-700 transition-colors">Impact</a>
            <a href="#contact" className="hover:text-emerald-700 transition-colors">Contact</a>
          </div>
        </div>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <p>© 2024 FoodRescue LK. Save Food, Share Hope.</p>
          <p className="font-bold uppercase tracking-wider text-slate-500">CIVIC TECH SRI LANKA</p>
        </div>
      </div>
    </footer>
  );
}

