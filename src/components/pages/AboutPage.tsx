import React from 'react';
import { Award, ShieldCheck, Gem, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <div className="py-16 bg-[#FAF8F5] animate-fadeIn">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A059] block mb-2">
            Heirloom Legacy
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-light text-[#1C1917] mb-4">
            The Story Behind <span className="italic font-normal gold-text">AURA Atelier</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
            Where generations of goldsmithing mastery converge with contemporary architectural design.
          </p>
        </div>

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden mb-16 border border-[#E7E2DA] shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=80"
            alt="Master Jeweller Crafting Solitaire"
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Story Text */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E7E2DA] shadow-sm mb-16 space-y-6 text-xs sm:text-sm text-[#44403C] leading-relaxed">
          <h2 className="font-serif-luxury text-2xl font-bold text-[#1C1917]">
            Crafting Timeless Moments Since 1998
          </h2>
          <p>
            At AURA Modern Jewellery, we believe fine jewellery is more than precious metal and crystalline light — it is an emotional sanctuary, a keeper of promises, and a legacy passed from one generation to the next.
          </p>
          <p>
            Every piece in our boutique is individually hand-cut and micro-set in 18K/22K BIS Hallmarked solid gold. We source our natural Zambian emeralds, Ceylon sapphires, and VVS solitaire diamonds through conflict-free certified ethical channels.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-[#E7E2DA] text-center">
            <Award className="w-8 h-8 text-[#C5A059] mx-auto mb-3" />
            <h3 className="font-serif-luxury text-base font-bold text-[#1C1917] mb-2">BIS 916 Hallmark</h3>
            <p className="text-xs text-[#78716C]">100% government-certified laser purity hallmarking on all gold.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E7E2DA] text-center">
            <Gem className="w-8 h-8 text-[#C5A059] mx-auto mb-3" />
            <h3 className="font-serif-luxury text-base font-bold text-[#1C1917] mb-2">SGL & IGI Diamonds</h3>
            <p className="text-xs text-[#78716C]">Independently evaluated for cut, color, clarity, and carat weight.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E7E2DA] text-center">
            <ShieldCheck className="w-8 h-8 text-[#C5A059] mx-auto mb-3" />
            <h3 className="font-serif-luxury text-base font-bold text-[#1C1917] mb-2">Lifetime Buyback</h3>
            <p className="text-xs text-[#78716C]">Guaranteed transparent lifetime exchange and buyback policy.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#1C1917] text-white p-10 rounded-3xl text-center">
          <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
          <h2 className="font-serif-luxury text-2xl font-bold mb-3">Explore Our Signature Creations</h2>
          <button
            onClick={() => setActiveView('shop')}
            className="bg-gradient-to-r from-[#DFBA6A] via-[#C5A059] to-[#9A7B38] text-[#141210] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider"
          >
            Shop Catalogue
          </button>
        </div>

      </div>
    </div>
  );
};
