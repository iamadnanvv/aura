import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const HeroSection: React.FC = () => {
  const { setActiveView, setSelectedCategory } = useStore();

  return (
    <section className="relative bg-[#141210] text-white min-h-[82vh] flex items-center overflow-hidden">
      {/* Background Editorial Image with Subtle Warm Grading */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Jewellery Editorial"
          className="w-full h-full object-cover object-center opacity-40 scale-100 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141210] via-[#141210]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-2xl">
          {/* Authentic Editorial Subtitle */}
          <span className="editorial-eyebrow text-[#B89B64] block mb-5 tracking-[0.3em]">
            ATELIER 2026 — FESTIVE COLLECTION
          </span>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.08] text-white mb-6">
            Jewellery Created to <br />
            <span className="italic font-light gold-text">Outlast Generations.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-[#D6CEC3] leading-relaxed mb-10 max-w-lg font-light">
            Handcrafted with uncompromising precision, ethically sourced natural gemstones, and 18K/22K BIS Hallmarked solid gold. Designed to celebrate life's most sacred milestones.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setActiveView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#B89B64] hover:bg-[#A38652] text-[#141210] py-4 px-8 rounded-sm text-xs font-medium uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg transition-all duration-300"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setSelectedCategory('bridal');
                setActiveView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-transparent hover:bg-white/10 text-white border border-[#D6CEC3]/40 hover:border-white py-4 px-8 rounded-sm text-xs font-medium uppercase tracking-[0.2em] flex items-center justify-center transition-all duration-300"
            >
              Bridal Trunk Show
            </button>
          </div>

          {/* Editorial Trust Highlights Line */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-[11px] text-[#A8A29E] font-light tracking-wide">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89B64]" />
              BIS 916 Pure Hallmarked Gold
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89B64]" />
              SGL & IGI Certified Diamonds
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89B64]" />
              Insured Doorstep Delivery
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

