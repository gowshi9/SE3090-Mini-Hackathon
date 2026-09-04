import React from 'react';
import { MapPin, Navigation, Compass, ShieldCheck } from 'lucide-react';

export function RecipientReachCard({ location = "Jaffna Town" }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-amber-700" />
          <h3 className="font-bold text-slate-900 text-sm">Recipient Reach</h3>
        </div>
        <span className="text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md">
          ~4.2 km Radius
        </span>
      </div>

      {/* Stylized Visual Map Card */}
      <div className="relative rounded-xl overflow-hidden border border-slate-200 h-36 bg-gradient-to-br from-teal-50 via-emerald-100 to-sky-100 flex flex-col justify-between p-3.5 shadow-inner">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:12px_12px]"></div>
        
        {/* Hub Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
            <span>{location} Hub</span>
          </div>
          <span className="bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            6 Drivers Active
          </span>
        </div>

        {/* Pulse center marker */}
        <div className="relative z-10 self-center my-auto flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-emerald-500/30 animate-ping absolute"></div>
          <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
            📍
          </div>
        </div>

        <div className="relative z-10 text-[10px] text-slate-600 font-semibold text-right">
          GPS Calibrated Regional Node
        </div>
      </div>

      <p className="text-[11px] text-slate-600 leading-relaxed">
        Posting this batch immediately queues an automated notification to local care homes, university canteens, and registered community relief shelters in <strong className="text-slate-800">{location}</strong>.
      </p>
    </div>
  );
}
