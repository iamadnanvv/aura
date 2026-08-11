import React, { useState } from 'react';
import { ShoppingBag, Trash2, Heart, ArrowRight, ShieldCheck, MessageCircle, Tag, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    toggleWishlist,
    setActiveView
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  return (
    <div className="py-12 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A059] block mb-1">
            Order Review
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1C1917]">
            Shopping Bag
          </h1>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-2xl border border-[#E7E2DA] shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between"
                >
                  <div className="flex gap-4 items-center flex-1">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-xl border border-[#E7E2DA] shrink-0"
                    />
                    <div>
                      <h3 className="font-serif-luxury text-base font-bold text-[#1C1917] mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-[#78716C] mb-2">
                        Metal: {item.selectedFinish} | Size: {item.selectedSize}
                      </p>
                      <span className="text-xs font-semibold text-[#C5A059]">
                        SKU: {item.product.sku}
                      </span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                    <div className="flex items-center border border-[#E7E2DA] rounded-xl bg-[#FAF8F5]">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="px-3 py-1 font-bold text-[#1C1917]"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold text-[#1C1917]">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="px-3 py-1 font-bold text-[#1C1917]"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-serif-luxury text-lg font-bold text-[#1C1917] block">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          onClick={() => {
                            toggleWishlist(item.product);
                            removeFromCart(item.id);
                          }}
                          className="text-[11px] text-[#C5A059] hover:underline flex items-center gap-1"
                        >
                          <Heart className="w-3.5 h-3.5" /> Save to Wishlist
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[11px] text-rose-600 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Concierge Assistance Link */}
              <div className="bg-[#24201D] text-white p-6 rounded-2xl border border-[#C5A059]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-sm font-bold text-white">Have questions about your order?</h4>
                    <p className="text-xs text-[#A8A29E]">Speak with a senior jewellery consultant on WhatsApp before checking out.</p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/919876543210?text=Hello%20AURA%20Concierge,%20I%20have%20questions%20about%20my%20cart%20subtotal%20of%20₹${cartSubtotal}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-5 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0"
                >
                  Ask Concierge
                </a>
              </div>
            </div>

            {/* Right Col: Order Summary */}
            <div className="bg-white p-6 rounded-2xl border border-[#E7E2DA] shadow-sm h-fit space-y-6">
              <h3 className="font-serif-luxury text-lg font-bold text-[#1C1917] border-b border-[#E7E2DA] pb-4">
                Summary & Discounts
              </h3>

              {/* Coupon Box */}
              <div>
                <span className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider block mb-2">
                  Apply Coupon Code
                </span>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-[#DCFCE7] border border-[#86EFAC] p-3 rounded-xl text-xs text-[#166534] font-medium">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <span>Code <strong>{appliedCoupon.code}</strong> Applied</span>
                    </div>
                    <button onClick={removeCoupon} className="text-rose-700 underline font-semibold">Remove</button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="e.g. SPARKLE10"
                      className="flex-1 bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl focus:outline-none uppercase"
                    />
                    <button type="submit" className="bg-[#1C1917] text-white text-xs font-semibold px-4 py-3 rounded-xl">
                      Apply
                    </button>
                  </form>
                )}
                <p className="text-[10px] text-[#A8A29E] mt-1.5">Try <strong>SPARKLE10</strong> for 10% off or <strong>AURA2026</strong> for ₹2,500 off.</p>
              </div>

              {/* Cost Calculations */}
              <div className="space-y-3 text-xs text-[#44403C] pt-4 border-t border-[#E7E2DA]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#166534] font-semibold">
                    <span>Coupon Discount</span>
                    <span>- ₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Courier Delivery</span>
                  <span>{cartShipping === 0 ? <strong className="text-[#166534]">FREE</strong> : `₹${cartShipping}`}</span>
                </div>
                <div className="flex justify-between font-serif-luxury text-xl font-bold text-[#1C1917] pt-3 border-t border-[#E7E2DA]">
                  <span>Total Payable</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveView('checkout')}
                className="w-full bg-gradient-to-r from-[#DFBA6A] via-[#C5A059] to-[#9A7B38] text-[#141210] py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] transition-all"
              >
                <span>Proceed To Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#78716C]">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>100% Insured Delivery with Lifetime Buyback</span>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#E7E2DA] max-w-xl mx-auto">
            <ShoppingBag className="w-16 h-16 text-[#C5A059] mx-auto mb-4 opacity-40" />
            <h2 className="font-serif-luxury text-2xl font-bold text-[#1C1917] mb-2">Your Bag is Empty</h2>
            <p className="text-xs text-[#78716C] mb-8">
              Explore our fine jewellery collections to find the perfect solitaire or bridal creation.
            </p>
            <button
              onClick={() => setActiveView('shop')}
              className="bg-[#1C1917] text-[#D4AF37] px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg"
            >
              Explore Catalogue
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
