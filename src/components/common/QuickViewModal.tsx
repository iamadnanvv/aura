import React, { useState } from 'react';
import { X, Star, ShieldCheck, Heart, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openProductDetail
  } = useStore();

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFinish, setSelectedFinish] = useState('');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWish = isInWishlist(product.id);

  const activeSize = selectedSize || product.sizes[0] || 'Standard';
  const activeFinish = selectedFinish || product.finishOptions[0] || product.material;

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1917]/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FAF8F5] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-[#E7E2DA] relative flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white text-[#1C1917] rounded-full shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Images */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-white border-r border-[#E7E2DA]">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-[#FAF8F5] mb-4">
            <img
              src={product.images[selectedImgIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-[#1C1917] text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#C5A059]">
                {product.badge}
              </span>
            )}
          </div>

          {/* Image Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImgIdx(idx)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                  selectedImgIdx === idx ? 'border-[#C5A059] ring-2 ring-[#C5A059]/20' : 'border-[#E7E2DA] opacity-70'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details & Controls */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating) ? 'fill-[#D4AF37]' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-[#78716C] font-medium">
                {product.rating} ({product.reviewCount} Reviews)
              </span>
            </div>

            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1C1917] mb-1">
              {product.name}
            </h2>
            <p className="text-xs text-[#78716C] mb-4">{product.subtitle}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-[#E7E2DA]">
              <span className="text-2xl font-serif-luxury font-bold text-[#1C1917]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-[#A8A29E] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-semibold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>

            <p className="text-xs text-[#44403C] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Finish Options */}
            {product.finishOptions.length > 0 && (
              <div className="mb-5">
                <span className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider block mb-2">
                  Metal Finish: <span className="font-normal text-[#78716C]">{activeFinish}</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.finishOptions.map((finish) => (
                    <button
                      key={finish}
                      onClick={() => setSelectedFinish(finish)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        activeFinish === finish
                          ? 'bg-[#1C1917] text-white border-[#1C1917]'
                          : 'bg-white text-[#44403C] border-[#E7E2DA] hover:border-[#C5A059]'
                      }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Options */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <span className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider block mb-2">
                  Size: <span className="font-normal text-[#78716C]">{activeSize}</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        activeSize === sz
                          ? 'bg-[#C5A059] text-white border-[#C5A059]'
                          : 'bg-white text-[#44403C] border-[#E7E2DA] hover:border-[#C5A059]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-[#E7E2DA]">
            <div className="flex gap-3">
              <button
                onClick={() => {
                  addToCart(product, activeSize, activeFinish);
                  setQuickViewProduct(null);
                }}
                className="flex-1 bg-[#1C1917] hover:bg-[#332E2A] text-white py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                Add To Bag
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-xl border transition-all ${
                  inWish
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-[#E7E2DA] text-[#1C1917] hover:border-[#C5A059]'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWish ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => {
                const pid = product.id;
                setQuickViewProduct(null);
                openProductDetail(pid);
              }}
              className="w-full text-center py-2 text-xs font-semibold uppercase tracking-wider text-[#C5A059] hover:text-[#9A7B38] flex items-center justify-center gap-1.5 transition-colors"
            >
              View Full Product Specifications <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#A8A29E] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>100% BIS Hallmarked & Insured Delivery</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
