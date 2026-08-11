import React, { useState } from 'react';
import { Sparkles, X, ShieldCheck, Truck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#1C1917] text-[#FAF8F5] text-xs py-2 px-4 relative z-50 border-b border-[#332E2A]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-6 text-[11px] tracking-wider uppercase text-[#D4AF37]">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% BIS Hallmarked & Certified Gold
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Truck className="w-3.5 h-3.5" /> Free Insured Delivery Across India
          </span>
        </div>

        <div className="flex-1 text-center font-medium tracking-wide text-amber-100 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
          <span>FESTIVE CELEBRATION: Extra 10% OFF with code <strong className="text-[#D4AF37] font-semibold underline underline-offset-2">SPARKLE10</strong></span>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-[#A8A29E] hover:text-white p-1 transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
