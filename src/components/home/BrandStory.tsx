import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const BrandStory: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <section className="py-24 bg-[#141210] text-[#E7E2DA] relative overflow-hidden border-y border-[#292524]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Asymmetrical Editorial Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-lg overflow-hidden border border-[#3A342F] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80"
                alt="Master Artisan Crafting Fine Jewellery"
                className="w-full h-[520px] object-cover"
              />
            </div>
            
            {/* Minimalist Floating Accent Card */}
            <div className="absolute -bottom-8 -right-4 sm:-right-6 z-20 w-2/3 bg-[#1D1A17] p-6 rounded-md border border-[#B89B64]/40 shadow-2xl hidden sm:block">
              <span className="text-[10px] font-mono tracking-widest text-[#B89B64] uppercase block mb-1">
                ATELIER BENCHMARK
              </span>
              <p className="font-serif text-lg text-white font-normal leading-snug mb-2">
                "Over 120 hours of hand-setting for every bespoke bridal suite."
              </p>
              <span className="text-[11px] text-[#A8A29E] font-light">
                Master Craftsmen — Mumbai Workshop
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Text & Manifesto */}
          <div className="lg:col-span-6 pl-0 lg:pl-6">
            <span className="editorial-eyebrow text-[#B89B64] block mb-4 tracking-[0.3em]">
              THE ARTISAN MANIFESTO
            </span>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-[1.12] mb-6 tracking-tight">
              Where Royal Heritage Meets <br />
              <span className="italic font-light gold-text">Modern Minimalism.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#D6CEC3] leading-relaxed mb-6 font-light">
              Founded on the principles of timeless craftsmanship and ethical transparency, AURA represents the apex of modern fine jewellery. Every solitaire diamond, Zambian emerald, and 22K gold alloy is meticulously selected to reflect unmatched brilliance.
            </p>

            <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed mb-10 font-light">
              From our master goldsmiths to certified gemologists, we bridge centuries of royal goldsmithing heritage with sleek, lightweight modern design silhouettes.
            </p>

            {/* Clean Numbered Manifesto Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#292524] mb-10">
              <div>
                <span className="text-xs font-mono text-[#B89B64] block mb-1">01 / INTEGRITY</span>
                <h4 className="font-serif text-base text-white font-normal mb-1">Ethically Sourced</h4>
                <p className="text-xs text-[#A8A29E] font-light leading-relaxed">Conflict-free natural diamonds and 100% recycled gold alloys.</p>
              </div>
              <div>
                <span className="text-xs font-mono text-[#B89B64] block mb-1">02 / AUTHENTICITY</span>
                <h4 className="font-serif text-base text-white font-normal mb-1">BIS Hallmarked</h4>
                <p className="text-xs text-[#A8A29E] font-light leading-relaxed">Laser-engraved government hallmark for certified purity assurance.</p>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 border-b border-[#B89B64] pb-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#DFA54B] hover:text-white hover:border-white transition-all group"
            >
              <span>Explore Our Heritage Story</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

