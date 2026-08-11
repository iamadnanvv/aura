import React, { useState } from 'react';
import { ShieldCheck, Truck, Lock, CreditCard, QrCode, Building2, Banknote, Tag, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PaymentMethod, DeliveryAddress } from '../../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    placeOrder,
    user
  } = useStore();

  // Address State
  const [address, setAddress] = useState<DeliveryAddress>({
    fullName: user?.name || 'Ananya Roy',
    phone: user?.phone || '+91 98765 43210',
    email: user?.email || 'ananya.roy@example.com',
    street: '402, Sea Breeze Heights, Worli Sea Face',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400030',
    landmark: 'Near Worli Dairy'
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [upiId, setUpiId] = useState('ananya@okaxis');
  const [couponInput, setCouponInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.pinCode || !address.street) {
      alert('Please fill in all required shipping address fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderItems = cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        image: item.product.images[0],
        size: item.selectedSize,
        finish: item.selectedFinish,
        price: item.product.price,
        quantity: item.quantity
      }));

      placeOrder({
        items: orderItems,
        subtotal: cartSubtotal,
        discount: cartDiscount,
        shipping: cartShipping,
        total: cartTotal,
        shippingAddress: address,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'COD Authorized' : 'Paid'
      });

      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="py-12 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A059] block mb-1 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> 256-Bit Encrypted Checkout
          </span>
          <h1 className="font-serif-luxury text-3xl font-semibold text-[#1C1917]">
            Complete Your Order
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Columns: Forms */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Step 1: Customer & Address Information */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E2DA] shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-[#E7E2DA] pb-4">
                <span className="w-7 h-7 rounded-full bg-[#1C1917] text-[#D4AF37] text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="font-serif-luxury text-xl font-bold text-[#1C1917]">
                  Delivery Address & Contact
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wider block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl focus:border-[#C5A059] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wider block mb-1">
                    Mobile Number (For Courier Updates) *
                  </label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl focus:border-[#C5A059] focus:outline-none"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wider block mb-1">
                    Email Address (For Tax Invoice & Insurance) *
                  </label>
                  <input
                    type="email"
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl focus:border-[#C5A059] focus:outline-none"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wider block mb-1">
                    Flat / Building / Street Address *
                  </label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl focus:border-[#C5A059] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wider block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl focus:border-[#C5A059] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wider block mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl focus:border-[#C5A059] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wider block mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={address.pinCode}
                    onChange={(e) => setAddress({ ...address, pinCode: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl focus:border-[#C5A059] focus:outline-none font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wider block mb-1">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={address.landmark}
                    onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl focus:border-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method (Optimized for Indian Flows) */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E2DA] shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-[#E7E2DA] pb-4">
                <span className="w-7 h-7 rounded-full bg-[#1C1917] text-[#D4AF37] text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="font-serif-luxury text-xl font-bold text-[#1C1917]">
                  Select Payment Option
                </h2>
              </div>

              <div className="space-y-4">
                
                {/* Option 1: Instant UPI */}
                <label className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'UPI' ? 'border-[#C5A059] bg-[#FFFDF9] ring-2 ring-[#C5A059]/20' : 'border-[#E7E2DA] bg-[#FAF8F5]'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'UPI'}
                        onChange={() => setPaymentMethod('UPI')}
                        className="accent-[#C5A059]"
                      />
                      <QrCode className="w-5 h-5 text-[#C5A059]" />
                      <div>
                        <span className="font-bold text-xs text-[#1C1917] block">Instant UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                        <span className="text-[10px] text-[#78716C]">Fastest checkout with instant payment verification</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded">RECOMMENDED</span>
                  </div>

                  {paymentMethod === 'UPI' && (
                    <div className="mt-4 pt-4 border-t border-[#E7E2DA]">
                      <label className="text-[11px] text-[#78716C] block mb-1">Enter VPA / UPI ID or scan QR code:</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi or okaxis"
                        className="w-full bg-white border border-[#E7E2DA] text-xs p-3 rounded-xl focus:outline-none"
                      />
                    </div>
                  )}
                </label>

                {/* Option 2: Credit / Debit Cards */}
                <label className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'CARDS' ? 'border-[#C5A059] bg-[#FFFDF9] ring-2 ring-[#C5A059]/20' : 'border-[#E7E2DA] bg-[#FAF8F5]'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'CARDS'}
                      onChange={() => setPaymentMethod('CARDS')}
                      className="accent-[#C5A059]"
                    />
                    <CreditCard className="w-5 h-5 text-[#C5A059]" />
                    <div>
                      <span className="font-bold text-xs text-[#1C1917] block">Credit or Debit Card</span>
                      <span className="text-[10px] text-[#78716C]">Visa, Mastercard, RuPay & Diners Club</span>
                    </div>
                  </div>
                </label>

                {/* Option 3: Net Banking */}
                <label className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'NET_BANKING' ? 'border-[#C5A059] bg-[#FFFDF9] ring-2 ring-[#C5A059]/20' : 'border-[#E7E2DA] bg-[#FAF8F5]'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'NET_BANKING'}
                      onChange={() => setPaymentMethod('NET_BANKING')}
                      className="accent-[#C5A059]"
                    />
                    <Building2 className="w-5 h-5 text-[#C5A059]" />
                    <div>
                      <span className="font-bold text-xs text-[#1C1917] block">Net Banking</span>
                      <span className="text-[10px] text-[#78716C]">All major Indian banks (HDFC, SBI, ICICI, Axis, Kotak)</span>
                    </div>
                  </div>
                </label>

                {/* Option 4: Cash on Delivery */}
                <label className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'COD' ? 'border-[#C5A059] bg-[#FFFDF9] ring-2 ring-[#C5A059]/20' : 'border-[#E7E2DA] bg-[#FAF8F5]'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="accent-[#C5A059]"
                    />
                    <Banknote className="w-5 h-5 text-[#C5A059]" />
                    <div>
                      <span className="font-bold text-xs text-[#1C1917] block">Cash On Delivery (COD)</span>
                      <span className="text-[10px] text-[#78716C]">Pay cash to courier upon inspecting sealed box</span>
                    </div>
                  </div>
                </label>

              </div>
            </div>

          </div>

          {/* Right Col: Order Summary */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E2DA] shadow-sm h-fit space-y-6">
            <h3 className="font-serif-luxury text-xl font-bold text-[#1C1917] border-b border-[#E7E2DA] pb-4">
              Order Summary ({cart.length} items)
            </h3>

            {/* Cart Item Previews */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover border border-[#E7E2DA]"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-[#1C1917] truncate block">{item.product.name}</span>
                    <span className="text-[10px] text-[#78716C]">Qty: {item.quantity} | {item.selectedSize}</span>
                  </div>
                  <span className="font-bold text-[#1C1917]">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            {/* Coupon Application */}
            <div className="pt-4 border-t border-[#E7E2DA]">
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-[#DCFCE7] p-2.5 rounded-xl text-xs text-[#166534] font-semibold">
                  <span>Coupon {appliedCoupon.code} Applied</span>
                  <button onClick={removeCoupon} className="underline text-rose-700">Remove</button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-2.5 rounded-xl uppercase focus:outline-none"
                  />
                  <button type="submit" className="bg-[#1C1917] text-white text-xs font-semibold px-4 rounded-xl">
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-[#44403C] pt-4 border-t border-[#E7E2DA]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#166534] font-semibold">
                  <span>Discount</span>
                  <span>- ₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Courier</span>
                <span className="text-[#166534] font-semibold">FREE</span>
              </div>
              <div className="flex justify-between font-serif-luxury text-2xl font-bold text-[#1C1917] pt-3 border-t border-[#E7E2DA]">
                <span>Total Amount</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#DFBA6A] via-[#C5A059] to-[#9A7B38] text-[#141210] py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Securing Order...</span>
              ) : (
                <>
                  <span>Place Order Now</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#A8A29E]">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>100% Insured Delivery with Lifetime Buyback</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
