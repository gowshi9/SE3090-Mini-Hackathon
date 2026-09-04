import React from 'react';

/**
 * Main Layout Footer Component matching design reference screenshots.
 * @returns {JSX.Element}
 */
export function Footer() {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-xs font-medium">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div>
            <span className="font-extrabold text-slate-900 text-sm">FoodRescue LK</span>
            <span className="text-slate-400 mx-1.5">•</span>
            <span>Mutual Aid Network</span>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Sri Lanka University Software Engineering Hackathon Project
            </div>
          </div>

          <div className="flex items-center gap-5 text-slate-700 font-semibold">
            <a href="#about" className="hover:text-emerald-700 transition-colors">About</a>
            <a href="#how-it-works" className="hover:text-emerald-700 transition-colors">How It Works</a>
            <a href="#impact" className="hover:text-emerald-700 transition-colors">Impact</a>
            <a href="#contact" className="hover:text-emerald-700 transition-colors">Contact</a>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} FoodRescue LK. Save Food. Share Hope.
          </div>
          <div className="font-mono tracking-widest text-[10px] text-slate-600 uppercase font-bold">
            CIVIC TECH SRI LANKA
          </div>
        </div>
      </div>
    </footer>
  );
}
