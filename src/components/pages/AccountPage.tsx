import React, { useState } from 'react';
import { User, Package, Heart, MapPin, LogOut, CheckCircle2, Truck, ExternalLink, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';

export const AccountPage: React.FC = () => {
  const { user, updateUserAccount, orders, wishlist, setActiveView } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile' | 'addresses'>('orders');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [nameInput, setNameInput] = useState(user?.name || 'Ananya Roy');
  const [emailInput, setEmailInput] = useState(user?.email || 'ananya.roy@example.com');
  const [phoneInput, setPhoneInput] = useState(user?.phone || '+91 98765 43210');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserAccount({
      name: nameInput,
      email: emailInput,
      phone: phoneInput
    });
    setIsEditingProfile(false);
  };

  return (
    <div className="py-12 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Account Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E2DA] shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#1C1917] text-[#D4AF37] text-xl font-bold flex items-center justify-center font-serif-luxury shadow-md">
              {user?.name.charAt(0) || 'A'}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A059] block mb-0.5">
                Valued Patron
              </span>
              <h1 className="font-serif-luxury text-2xl font-bold text-[#1C1917]">
                Welcome, {user?.name || 'Patron'}
              </h1>
              <p className="text-xs text-[#78716C]">{user?.email} • {user?.phone}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveView('shop')}
              className="px-5 py-2.5 bg-[#1C1917] text-[#D4AF37] rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              Browse Catalogue
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#E7E2DA] no-scrollbar">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'orders'
                ? 'bg-[#1C1917] text-[#D4AF37] border border-[#C5A059]'
                : 'bg-white text-[#44403C] border border-[#E7E2DA] hover:border-[#C5A059]'
            }`}
          >
            <Package className="w-4 h-4" /> Order History ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'wishlist'
                ? 'bg-[#1C1917] text-[#D4AF37] border border-[#C5A059]'
                : 'bg-white text-[#44403C] border border-[#E7E2DA] hover:border-[#C5A059]'
            }`}
          >
            <Heart className="w-4 h-4" /> Wishlist ({wishlist.length})
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'profile'
                ? 'bg-[#1C1917] text-[#D4AF37] border border-[#C5A059]'
                : 'bg-white text-[#44403C] border border-[#E7E2DA] hover:border-[#C5A059]'
            }`}
          >
            <User className="w-4 h-4" /> Personal Profile
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'addresses'
                ? 'bg-[#1C1917] text-[#D4AF37] border border-[#C5A059]'
                : 'bg-white text-[#44403C] border border-[#E7E2DA] hover:border-[#C5A059]'
            }`}
          >
            <MapPin className="w-4 h-4" /> Saved Addresses
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length > 0 ? (
              orders.map((ord) => (
                <div key={ord.id} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E2DA] shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7E2DA] gap-2 mb-6">
                    <div>
                      <span className="font-serif-luxury text-lg font-bold text-[#1C1917]">
                        Order #{ord.orderNumber}
                      </span>
                      <p className="text-xs text-[#78716C]">Placed on {ord.date} • {ord.items.length} Items</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                        ord.status === 'Delivered'
                          ? 'bg-[#DCFCE7] text-[#166534]'
                          : 'bg-[#FEF3C7] text-[#92400E]'
                      }`}>
                        {ord.status}
                      </span>
                      <span className="font-serif-luxury text-base font-bold text-[#1C1917]">
                        ₹{ord.total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-3 mb-6">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-4 text-xs">
                        <img src={it.image} alt="" className="w-14 h-14 object-cover rounded-xl border border-[#E7E2DA]" />
                        <div className="flex-1">
                          <h4 className="font-bold text-[#1C1917]">{it.name}</h4>
                          <p className="text-[11px] text-[#78716C]">Metal: {it.finish} | Size: {it.size} | Qty: {it.quantity}</p>
                        </div>
                        <span className="font-bold text-[#1C1917]">₹{(it.price * it.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#E7E2DA] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#C5A059]" />
                      <span>Tracking: <strong className="text-[#1C1917]">{ord.trackingNumber}</strong></span>
                    </div>
                    <button
                      onClick={() => alert(`Tracking updates for AWB ${ord.trackingNumber}: Package processed at Bluedart Express Hub. Expected delivery by ${ord.estimatedDelivery}.`)}
                      className="text-xs font-semibold text-[#C5A059] hover:underline flex items-center gap-1"
                    >
                      Track Live Shipment <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E7E2DA]">
                <Package className="w-12 h-12 text-[#C5A059] mx-auto mb-3 opacity-40" />
                <h3 className="font-serif-luxury text-xl font-bold text-[#1C1917] mb-2">No Past Orders</h3>
                <p className="text-xs text-[#78716C] mb-6">When you order fine jewellery, your order history will appear here.</p>
                <button onClick={() => setActiveView('shop')} className="bg-[#1C1917] text-[#D4AF37] px-6 py-3 rounded-full text-xs font-semibold uppercase">
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Wishlist Grid */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlist.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E7E2DA]">
                <Heart className="w-12 h-12 text-rose-400 mx-auto mb-3 opacity-40" />
                <h3 className="font-serif-luxury text-xl font-bold text-[#1C1917] mb-2">Your Wishlist is Empty</h3>
                <p className="text-xs text-[#78716C] mb-6">Save your favorite rings, necklaces, and emeralds here.</p>
                <button onClick={() => setActiveView('shop')} className="bg-[#1C1917] text-[#D4AF37] px-6 py-3 rounded-full text-xs font-semibold uppercase">
                  Explore Designs
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Profile Form */}
        {activeTab === 'profile' && (
          <div className="bg-white p-8 rounded-3xl border border-[#E7E2DA] shadow-sm max-w-2xl">
            <h3 className="font-serif-luxury text-xl font-bold text-[#1C1917] mb-6">Personal Profile Information</h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#1C1917] block mb-1">Full Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#1C1917] block mb-1">Email Address</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#1C1917] block mb-1">Mobile Phone Number</label>
                <input
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl focus:outline-none"
                  required
                />
              </div>
              <button type="submit" className="bg-[#1C1917] text-[#D4AF37] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider">
                Save Profile Changes
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="bg-white p-8 rounded-3xl border border-[#E7E2DA] shadow-sm max-w-2xl">
            <h3 className="font-serif-luxury text-xl font-bold text-[#1C1917] mb-6">Saved Delivery Addresses</h3>
            {user?.savedAddresses.map((addr, idx) => (
              <div key={idx} className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E7E2DA] text-xs text-[#44403C] mb-4">
                <span className="font-bold text-[#1C1917] block mb-1">{addr.fullName} (Primary Address)</span>
                <p>{addr.street}</p>
                <p>{addr.city}, {addr.state} - {addr.pinCode}</p>
                <p>Phone: {addr.phone}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
