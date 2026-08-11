import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Search, Sparkles, RefreshCw } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import { CategorySlug, MaterialType, GemstoneType } from '../../types';
import { CATEGORIES } from '../../data/products';

export const ShopPage: React.FC = () => {
  const { products, selectedCategory, setSelectedCategory } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [selectedGemstone, setSelectedGemstone] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(400000);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'bestselling'>('featured');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category Filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search
      if (
        searchQuery.trim() &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false;
      }
      // Material
      if (selectedMaterial !== 'all' && !p.material.includes(selectedMaterial)) {
        return false;
      }
      // Gemstone
      if (selectedGemstone !== 'all' && !p.gemstone.includes(selectedGemstone)) {
        return false;
      }
      // Price
      if (p.price > priceRange) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'bestselling') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, selectedMaterial, selectedGemstone, priceRange, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedMaterial('all');
    setSelectedGemstone('all');
    setPriceRange(400000);
    setSortBy('featured');
  };

  return (
    <div className="py-10 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8 text-center sm:text-left">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A059] block mb-1">
            Fine Jewellery Catalogue
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#1C1917] font-semibold">
            {selectedCategory === 'all'
              ? 'All Fine Jewellery'
              : CATEGORIES.find((c) => c.slug === selectedCategory)?.name || 'Catalogue'}
          </h1>
          <p className="text-xs text-[#78716C] mt-1 max-w-xl">
            {selectedCategory === 'all'
              ? 'Explore our complete collection of 100% BIS Hallmarked gold, solitaire diamonds, and rare gemstones.'
              : CATEGORIES.find((c) => c.slug === selectedCategory)?.description}
          </p>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#E7E2DA] no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-[#1C1917] text-[#D4AF37] border border-[#C5A059]'
                : 'bg-white text-[#44403C] border border-[#E7E2DA] hover:border-[#C5A059]'
            }`}
          >
            All Jewellery ({products.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.category === cat.slug).length;
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#1C1917] text-[#D4AF37] border border-[#C5A059]'
                    : 'bg-white text-[#44403C] border border-[#E7E2DA] hover:border-[#C5A059]'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Controls Bar (Search, Mobile Filter Drawer Toggle, Sort Dropdown) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-[#E7E2DA] shadow-sm">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, tag, stone..."
              className="w-full bg-[#FAF8F5] border border-[#E7E2DA] focus:border-[#C5A059] text-xs text-[#1C1917] py-2.5 pl-9 pr-3 rounded-xl focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            {/* Mobile Filter Drawer Button */}
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#FAF8F5] border border-[#E7E2DA] rounded-xl text-xs font-semibold text-[#1C1917]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#78716C] hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FAF8F5] border border-[#E7E2DA] focus:border-[#C5A059] text-xs font-medium text-[#1C1917] py-2.5 px-3 rounded-xl focus:outline-none"
              >
                <option value="featured">Featured Curations</option>
                <option value="bestselling">Best Selling</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Main Catalogue Layout (Desktop Sidebar Filters + Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Sidebar Filters */}
          <div className="hidden lg:block space-y-6 bg-white p-6 rounded-2xl border border-[#E7E2DA] h-fit">
            <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-4">
              <span className="font-serif-luxury text-base font-bold text-[#1C1917] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" /> Refine Selection
              </span>
              <button
                onClick={resetFilters}
                className="text-[11px] text-[#C5A059] hover:underline flex items-center gap-1 font-medium"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-[#1C1917] mb-2">
                <span>Max Price:</span>
                <span className="font-bold text-[#C5A059]">₹{priceRange.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="400000"
                step="5000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#A8A29E] mt-1">
                <span>₹10k</span>
                <span>₹400k+</span>
              </div>
            </div>

            {/* Metal Filter */}
            <div className="pt-4 border-t border-[#E7E2DA]">
              <span className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider block mb-3">
                Precious Metal
              </span>
              <div className="space-y-2 text-xs">
                {['all', '18K Yellow Gold', '18K Rose Gold', '18K White Gold', '22K Yellow Gold', 'Platinum'].map((metal) => (
                  <label key={metal} className="flex items-center gap-2 cursor-pointer text-[#44403C] hover:text-[#1C1917]">
                    <input
                      type="radio"
                      name="metal"
                      checked={selectedMaterial === metal}
                      onChange={() => setSelectedMaterial(metal)}
                      className="accent-[#C5A059]"
                    />
                    <span>{metal === 'all' ? 'All Metals' : metal}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gemstone Filter */}
            <div className="pt-4 border-t border-[#E7E2DA]">
              <span className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider block mb-3">
                Gemstone
              </span>
              <div className="space-y-2 text-xs">
                {['all', 'VVS Diamond', 'Zambian Emerald', 'Ceylon Sapphire', 'Burmese Ruby', 'Freshwater Pearl', 'Moissanite'].map((stone) => (
                  <label key={stone} className="flex items-center gap-2 cursor-pointer text-[#44403C] hover:text-[#1C1917]">
                    <input
                      type="radio"
                      name="gemstone"
                      checked={selectedGemstone === stone}
                      onChange={() => setSelectedGemstone(stone)}
                      className="accent-[#C5A059]"
                    />
                    <span>{stone === 'all' ? 'All Gemstones' : stone}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column Product Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 text-xs text-[#78716C]">
              Showing <strong className="text-[#1C1917]">{filteredProducts.length}</strong> creations
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#E7E2DA]">
                <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto mb-3" />
                <h3 className="font-serif-luxury text-xl font-bold text-[#1C1917] mb-2">No Jewellery Found</h3>
                <p className="text-xs text-[#78716C] mb-6">
                  No products matched your current filters. Try resetting your search parameters.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#1C1917] text-white py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-[#FAF8F5] w-full max-w-xs h-full p-6 overflow-y-auto flex flex-col justify-between animate-slideLeft">
            <div>
              <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-4 mb-6">
                <span className="font-serif-luxury text-lg font-bold text-[#1C1917]">Refine Jewellery</span>
                <button onClick={() => setIsFilterDrawerOpen(false)} className="p-2 text-[#78716C]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs font-medium text-[#1C1917] mb-2">
                  <span>Max Price:</span>
                  <span className="font-bold text-[#C5A059]">₹{priceRange.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="400000"
                  step="5000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#C5A059]"
                />
              </div>

              {/* Metal */}
              <div className="mb-6 pt-4 border-t border-[#E7E2DA]">
                <span className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider block mb-3">Precious Metal</span>
                <div className="space-y-2 text-xs">
                  {['all', '18K Yellow Gold', '18K Rose Gold', '18K White Gold', '22K Yellow Gold', 'Platinum'].map((metal) => (
                    <label key={metal} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mobileMetal"
                        checked={selectedMaterial === metal}
                        onChange={() => setSelectedMaterial(metal)}
                        className="accent-[#C5A059]"
                      />
                      <span>{metal === 'all' ? 'All Metals' : metal}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsFilterDrawerOpen(false)}
              className="w-full bg-[#1C1917] text-[#D4AF37] py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-lg"
            >
              Apply Filters ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
