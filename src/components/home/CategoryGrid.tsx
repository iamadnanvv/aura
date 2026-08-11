import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/products';
import { useStore } from '../../context/StoreContext';
import { CategorySlug } from '../../types';

export const CategoryGrid: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useStore();

  const handleCategoryClick = (slug: CategorySlug) => {
    setSelectedCategory(slug);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-[#E8E3DC] gap-4">
          <div>
            <span className="editorial-eyebrow text-[#B89B64] block mb-2">
              CURATED ESSENTIALS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1817] font-normal tracking-tight">
              Explore By Jewellery Type
            </h2>
          </div>
          <p className="text-xs text-[#7D736A] max-w-sm font-light leading-relaxed">
            From everyday minimalist gold accents to high jewellery statement suites, explore our master-crafted categories.
          </p>
        </div>

        {/* Categories Grid - Human Editorial Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat, idx) => {
            const formattedNum = `0${idx + 1}`;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className="group relative bg-[#1A1817] overflow-hidden cursor-pointer border border-[#E8E3DC] transition-all duration-500 flex flex-col justify-between aspect-[4/5] rounded-lg shadow-[0_2px_12px_rgba(26,24,23,0.04)] hover:shadow-[0_16px_36px_rgba(26,24,23,0.12)]"
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-90"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/90 via-[#141210]/30 to-transparent" />

                {/* Top Numbering */}
                <div className="relative z-10 p-6 flex justify-between items-start">
                  <span className="text-[11px] font-mono tracking-widest text-white/70 bg-[#1A1817]/60 backdrop-blur-md px-2.5 py-1 border border-white/10 rounded-sm">
                    {formattedNum}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#DFA54B] bg-[#1A1817]/60 backdrop-blur-md px-2.5 py-1 border border-[#B89B64]/30 rounded-sm">
                    {cat.itemCount} Items
                  </span>
                </div>

                {/* Bottom Content Info */}
                <div className="relative z-10 p-6 sm:p-8">
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2 group-hover:text-[#DFA54B] transition-colors tracking-tight">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#D6CEC3] line-clamp-2 font-light leading-relaxed mb-4">
                    {cat.description}
                  </p>
                  
                  <div className="inline-flex items-center text-[11px] font-medium text-[#DFA54B] tracking-[0.2em] uppercase pt-2 border-t border-white/15 w-full justify-between group-hover:border-[#B89B64]">
                    <span>Discover Category</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

