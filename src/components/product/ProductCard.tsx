import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductDetail, setQuickViewProduct, toggleWishlist, isInWishlist, addToCart } = useStore();
  const [isHovered, setIsHovered] = useState(false);

  const inWish = isInWishlist(product.id);
  const secondaryImage = product.images[1] || product.images[0];

  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden border border-[#E8E3DC] hover:border-[#B89B64]/60 shadow-[0_2px_12px_rgba(26,24,23,0.03)] hover:shadow-[0_12px_32px_rgba(26,24,23,0.08)] transition-all duration-400 flex flex-col justify-between relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container */}
      <div
        className="relative aspect-[4/5] bg-[#F7F4EF] overflow-hidden cursor-pointer"
        onClick={() => openProductDetail(product.id)}
      >
        <img
          src={isHovered ? secondaryImage : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span
              className={`text-[9px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm shadow-sm ${
                product.badge === 'Bestseller'
                  ? 'bg-[#1A1817] text-[#DFA54B] border border-[#B89B64]/50'
                  : product.badge === 'New'
                  ? 'bg-[#B89B64] text-white'
                  : product.badge === 'Limited'
                  ? 'bg-[#6B21A8] text-white'
                  : 'bg-[#1A1817] text-white'
              }`}
            >
              {product.badge}
            </span>
          )}
          {discountPct > 0 && (
            <span className="text-[9px] font-medium uppercase tracking-[0.15em] px-2 py-0.5 rounded-sm bg-[#1A1817]/90 text-[#86EFAC] border border-[#86EFAC]/30 backdrop-blur-sm">
              {discountPct}% OFF
            </span>
          )}
        </div>

        {/* Top-Right Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
            inWish
              ? 'bg-rose-50 text-rose-600 shadow-md'
              : 'bg-white/85 text-[#1A1817] hover:bg-white hover:text-rose-600 shadow-sm'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${inWish ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-[#1A1817] py-2.5 px-3 rounded-lg text-[10px] font-medium uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 shadow-sm backdrop-blur-sm transition-all border border-[#E8E3DC]"
          >
            <Eye className="w-3.5 h-3.5 text-[#B89B64]" />
            Quick View
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="bg-[#1A1817] hover:bg-[#2A2624] text-white p-2.5 rounded-lg shadow-sm transition-all"
            title="Add to Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#DFA54B]" />
          </button>
        </div>
      </div>

      {/* Bottom Content Info */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 cursor-pointer" onClick={() => openProductDetail(product.id)}>
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10px] text-[#7D736A] mb-1.5">
            <span className="uppercase tracking-[0.2em] font-medium text-[#B89B64]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-[#1A1817]">
              <Star className="w-3 h-3 fill-[#DFA54B] text-[#DFA54B]" />
              <span className="font-medium text-xs">{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base font-normal text-[#1A1817] group-hover:text-[#B89B64] transition-colors line-clamp-1 mb-1 tracking-tight">
            {product.name}
          </h3>

          <p className="text-xs text-[#8C827A] line-clamp-1 mb-3 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Mobile Add to Cart */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E8E3DC]">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-normal text-[#1A1817]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#9E958C] line-through font-light">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="sm:hidden p-2 rounded-md bg-[#1A1817] text-white"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#DFA54B]" />
          </button>
        </div>
      </div>
    </div>
  );
};
