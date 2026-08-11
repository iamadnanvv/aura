import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Tag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
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
    setActiveView
  } = useStore();

  const [couponCode, setCouponCode] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="bg-[#FAF8F5] w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l border-[#E7E2DA] animate-slideLeft">
        
        {/* Drawer Header */}
        <div className="p-6 bg-white border-b border-[#E7E2DA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-serif-luxury text-lg font-bold text-[#1C1917]">Your Shopping Bag</h3>
            <span className="text-xs bg-[#1C1917] text-[#D4AF37] px-2 py-0.5 rounded-full font-bold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-2 text-[#78716C] hover:text-[#1C1917] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body Items List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-2xl border border-[#E7E2DA] flex gap-4 relative group"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-xl border border-[#E7E2DA] shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif-luxury text-sm font-bold text-[#1C1917] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-[#78716C]">
                      Metal: {item.selectedFinish} | Size: {item.selectedSize}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#E7E2DA] rounded-lg bg-[#FAF8F5]">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-xs font-bold text-[#1C1917]"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-[#1C1917]">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-xs font-bold text-[#1C1917]"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-serif-luxury text-sm font-bold text-[#1C1917]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-[#A8A29E] hover:text-rose-600 transition-colors p-1"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <ShoppingBag className="w-12 h-12 text-[#C5A059] mx-auto mb-3 opacity-40" />
              <p className="font-serif-luxury text-lg font-bold text-[#1C1917] mb-1">Your Bag is Empty</p>
              <p className="text-xs text-[#78716C] mb-6">Discover our fine jewellery collections to add brilliance.</p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setActiveView('shop');
                }}
                className="bg-[#1C1917] text-[#D4AF37] px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#E7E2DA] space-y-4">
            
            {/* Coupon Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-[#DCFCE7] border border-[#86EFAC] p-2.5 rounded-xl text-xs text-[#166534] font-medium">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> Applied!</span>
                  </div>
                  <button onClick={removeCoupon} className="text-rose-700 underline font-semibold">Remove</button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon (e.g. SPARKLE10)"
                    className="flex-1 bg-[#FAF8F5] border border-[#E7E2DA] text-xs px-3 py-2 rounded-xl focus:outline-none uppercase"
                  />
                  <button type="submit" className="bg-[#1C1917] text-white text-xs font-semibold px-4 py-2 rounded-xl">
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#44403C]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#166534]">
                  <span>Discount</span>
                  <span>- ₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Courier Delivery</span>
                <span>{cartShipping === 0 ? <strong className="text-[#166534]">FREE</strong> : `₹${cartShipping}`}</span>
              </div>
              <div className="flex justify-between font-serif-luxury text-base font-bold text-[#1C1917] pt-2 border-t border-[#E7E2DA]">
                <span>Total Amount</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartDrawerOpen(false);
                setActiveView('checkout');
              }}
              className="w-full bg-gradient-to-r from-[#DFBA6A] via-[#C5A059] to-[#9A7B38] text-[#141210] py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] transition-all"
            >
              <span>Proceed To Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#A8A29E]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Encrypted Checkout with BIS Guarantee</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
