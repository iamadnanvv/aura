import React, { useState } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CategorySlug } from '../../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, openProductDetail, setSelectedCategory, setActiveView } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isSearchOpen) return null;

  const filteredProducts = searchTerm.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.gemstone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const trendingTags = ['Solitaire', 'Emerald', 'Bridal Set', 'Tennis Bracelet', 'Rose Gold', 'South Sea Pearl'];

  const handleCategoryShortcut = (cat: CategorySlug) => {
    setSelectedCategory(cat);
    setActiveView('shop');
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1917]/80 backdrop-blur-md flex items-start justify-center pt-12 sm:pt-20 px-4 animate-fadeIn">
      <div className="bg-[#FAF8F5] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-[#E7E2DA] flex flex-col max-h-[85vh]">
        
        {/* Search Header Input */}
        <div className="p-4 sm:p-6 border-b border-[#E7E2DA] flex items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-[#C5A059]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search rings, emeralds, diamond necklaces..."
              className="w-full bg-transparent text-base sm:text-lg font-serif-luxury text-[#1C1917] placeholder-[#A8A29E] focus:outline-none"
              autoFocus
            />
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-[#78716C] hover:text-[#1C1917] rounded-full hover:bg-[#F4EFEB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {searchTerm.trim() === '' ? (
            <div>
              {/* Trending Searches */}
              <div className="mb-6">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A8A29E] block mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" /> Trending Search Keywords
                </span>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchTerm(tag)}
                      className="px-3.5 py-1.5 bg-[#F4EFEB] hover:bg-[#C5A059] hover:text-white text-[#44403C] rounded-full text-xs font-medium transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Categories */}
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A8A29E] block mb-3">
                  Browse by Category
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => handleCategoryShortcut('rings')}
                    className="p-3 text-left bg-white hover:border-[#C5A059] border border-[#E7E2DA] rounded-xl text-xs font-medium text-[#1C1917] flex justify-between items-center transition-all group"
                  >
                    <span>Rings</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => handleCategoryShortcut('necklaces')}
                    className="p-3 text-left bg-white hover:border-[#C5A059] border border-[#E7E2DA] rounded-xl text-xs font-medium text-[#1C1917] flex justify-between items-center transition-all group"
                  >
                    <span>Necklaces</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => handleCategoryShortcut('earrings')}
                    className="p-3 text-left bg-white hover:border-[#C5A059] border border-[#E7E2DA] rounded-xl text-xs font-medium text-[#1C1917] flex justify-between items-center transition-all group"
                  >
                    <span>Earrings</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => handleCategoryShortcut('bracelets')}
                    className="p-3 text-left bg-white hover:border-[#C5A059] border border-[#E7E2DA] rounded-xl text-xs font-medium text-[#1C1917] flex justify-between items-center transition-all group"
                  >
                    <span>Bracelets</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => handleCategoryShortcut('bridal')}
                    className="p-3 text-left bg-white hover:border-[#C5A059] border border-[#E7E2DA] rounded-xl text-xs font-medium text-[#1C1917] flex justify-between items-center transition-all group"
                  >
                    <span>Bridal Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => handleCategoryShortcut('personalized')}
                    className="p-3 text-left bg-white hover:border-[#C5A059] border border-[#E7E2DA] rounded-xl text-xs font-medium text-[#1C1917] flex justify-between items-center transition-all group"
                  >
                    <span>Personalized</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A8A29E] block">
                Found {filteredProducts.length} Results
              </span>
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    openProductDetail(p.id);
                    setIsSearchOpen(false);
                  }}
                  className="flex items-center gap-4 p-3 bg-white hover:bg-[#F9F6F0] rounded-xl border border-[#E7E2DA] cursor-pointer transition-colors"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded-lg border border-[#E7E2DA] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif-luxury text-sm font-semibold text-[#1C1917] truncate">
                      {p.name}
                    </h4>
                    <p className="text-xs text-[#78716C] truncate">{p.subtitle}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold text-[#1C1917]">
                        ₹{p.price.toLocaleString('en-IN')}
                      </span>
                      {p.originalPrice && (
                        <span className="text-[10px] text-[#A8A29E] line-through">
                          ₹{p.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C5A059] shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="font-serif-luxury text-lg text-[#1C1917] mb-1">No pieces found matching "{searchTerm}"</p>
              <p className="text-xs text-[#78716C]">Try searching for 'Solitaire', 'Emerald', 'Gold Ring', or 'Bridal'</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
