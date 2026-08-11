import React from 'react';
import { CheckCircle2, ShieldCheck, Truck, ArrowRight, Printer, Sparkles, MapPin, Package } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const OrderSuccessPage: React.FC = () => {
  const { currentOrder, setActiveView } = useStore();

  if (!currentOrder) {
    return (
      <div className="py-20 text-center bg-[#FAF8F5]">
        <h2 className="font-serif-luxury text-2xl font-bold text-[#1C1917] mb-4">No Recent Order Found</h2>
        <button onClick={() => setActiveView('home')} className="bg-[#1C1917] text-[#D4AF37] px-6 py-3 rounded-full text-xs font-semibold uppercase">
          Return Home
        </button>
      </div>
    );
  }

  const order = currentOrder;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 bg-[#FAF8F5] min-h-screen animate-fadeIn">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Banner */}
        <div className="bg-white p-8 rounded-3xl border border-[#E7E2DA] shadow-sm text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center text-[#166534] mx-auto mb-4 shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A059] block mb-1">
            Order Confirmed
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-[#1C1917] mb-2">
            Thank You For Your Order!
          </h1>
          <p className="text-xs text-[#78716C] max-w-md mx-auto">
            We have received your order <strong className="text-[#1C1917]">{order.orderNumber}</strong> and sent an email confirmation with your tax invoice.
          </p>
        </div>

        {/* Live Order Timeline Tracker */}
        <div className="bg-[#1C1917] text-white p-6 sm:p-8 rounded-3xl border border-[#3A342F] shadow-xl mb-8">
          <div className="flex items-center justify-between border-b border-[#332E2A] pb-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
              <Package className="w-4 h-4" />
              <span>AWB Airway Bill: {order.trackingNumber}</span>
            </div>
            <span className="text-xs bg-[#C5A059] text-white px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              {order.status}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#C5A059] text-white text-xs font-bold flex items-center justify-center mb-2">
                ✓
              </div>
              <span className="text-xs font-bold text-white">Order Placed</span>
              <span className="text-[10px] text-[#A8A29E]">{order.date}</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#3A342F] border border-[#C5A059] text-[#C5A059] text-xs font-bold flex items-center justify-center mb-2">
                2
              </div>
              <span className="text-xs font-bold text-[#D6CEC3]">Artisan Checked</span>
              <span className="text-[10px] text-[#A8A29E]">In Progress</span>
            </div>

            <div className="flex flex-col items-center opacity-60">
              <div className="w-8 h-8 rounded-full bg-[#24201D] text-[#A8A29E] text-xs font-bold flex items-center justify-center mb-2">
                3
              </div>
              <span className="text-xs font-medium text-[#A8A29E]">Insured Courier</span>
              <span className="text-[10px] text-[#78716C]">Pending</span>
            </div>

            <div className="flex flex-col items-center opacity-60">
              <div className="w-8 h-8 rounded-full bg-[#24201D] text-[#A8A29E] text-xs font-bold flex items-center justify-center mb-2">
                4
              </div>
              <span className="text-xs font-medium text-[#A8A29E]">Delivered</span>
              <span className="text-[10px] text-[#78716C]">{order.estimatedDelivery}</span>
            </div>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E2DA] shadow-sm mb-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-4">
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#1C1917]">Tax Invoice & Order Details</h3>
              <p className="text-xs text-[#78716C]">Order ID: {order.orderNumber}</p>
            </div>
            <button
              onClick={handlePrint}
              className="p-2.5 bg-[#FAF8F5] border border-[#E7E2DA] hover:border-[#C5A059] rounded-xl text-xs font-semibold text-[#1C1917] flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-[#C5A059]" /> Print Invoice
            </button>
          </div>

          {/* Shipping Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#44403C]">
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E7E2DA]">
              <span className="font-bold text-[#1C1917] uppercase tracking-wider block mb-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" /> Shipping Address
              </span>
              <p className="font-bold text-[#1C1917]">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pinCode}</p>
              <p>Phone: {order.shippingAddress.phone}</p>
            </div>

            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E7E2DA]">
              <span className="font-bold text-[#1C1917] uppercase tracking-wider block mb-2 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#C5A059]" /> Payment & Delivery
              </span>
              <p><strong className="text-[#1C1917]">Payment Method:</strong> {order.paymentMethod}</p>
              <p><strong className="text-[#1C1917]">Status:</strong> {order.paymentStatus}</p>
              <p><strong className="text-[#1C1917]">Est. Delivery:</strong> {order.estimatedDelivery}</p>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3 pt-4 border-t border-[#E7E2DA]">
            {order.items.map((it, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img src={it.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-[#E7E2DA]" />
                  <div>
                    <span className="font-bold text-[#1C1917] block">{it.name}</span>
                    <span className="text-[10px] text-[#78716C]">Metal: {it.finish} | Size: {it.size} | Qty: {it.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-[#1C1917]">₹{(it.price * it.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="pt-4 border-t border-[#E7E2DA] space-y-2 text-xs text-[#44403C]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#166534] font-semibold">
                <span>Discount</span>
                <span>- ₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between font-serif-luxury text-xl font-bold text-[#1C1917] pt-2 border-t border-[#E7E2DA]">
              <span>Total Paid</span>
              <span>₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setActiveView('account')}
            className="bg-[#1C1917] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider"
          >
            View Order History In Account
          </button>
          <button
            onClick={() => setActiveView('shop')}
            className="bg-[#C5A059] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
