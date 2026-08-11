import React, { useState } from 'react';
import { LayoutDashboard, Plus, Trash2, Edit3, Package, Tag, Star, Users, CheckCircle, RefreshCw, Sparkles, DollarSign } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, CategorySlug, Coupon, OrderStatus } from '../../types';

export const AdminPage: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    reviews,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons' | 'reviews'>('overview');

  // New Product Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProd, setEditingProd] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<CategorySlug>('rings');
  const [price, setPrice] = useState('49999');
  const [originalPrice, setOriginalPrice] = useState('59999');
  const [material, setMaterial] = useState<any>('18K Yellow Gold');
  const [gemstone, setGemstone] = useState<any>('VVS Diamond');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80');
  const [description, setDescription] = useState('');

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [couponVal, setCouponVal] = useState('15');
  const [couponMin, setCouponMin] = useState('25000');

  // Stats calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const activeProductCount = products.length;

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    if (editingProd) {
      updateProduct({
        ...editingProd,
        name,
        subtitle: subtitle || name,
        category,
        categoryName: category.charAt(0).toUpperCase() + category.slice(1),
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        material,
        gemstone,
        description: description || 'Handcrafted fine jewellery design.',
        images: [imageUrl]
      });
      setEditingProd(null);
    } else {
      const newP: Product = {
        id: `aura-custom-${Date.now()}`,
        name,
        subtitle: subtitle || name,
        category,
        categoryName: category.charAt(0).toUpperCase() + category.slice(1),
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        rating: 5.0,
        reviewCount: 1,
        images: [imageUrl],
        badge: 'New',
        description: description || 'Exquisite handcrafted new addition.',
        material,
        gemstone,
        sizes: ['5', '6', '7', '8'],
        finishOptions: ['18K Yellow Gold', '18K White Gold'],
        inStock: true,
        specifications: {
          purity: material,
          grossWeight: '4.50 g',
          certification: 'BIS Hallmarked'
        },
        tags: [category, 'new'],
        sku: `AUR-${category.toUpperCase().slice(0, 3)}-${Math.floor(100 + Math.random() * 900)}`
      };
      addProduct(newP);
    }

    setIsAddModalOpen(false);
    resetForm();
  };

  const startEdit = (p: Product) => {
    setEditingProd(p);
    setName(p.name);
    setSubtitle(p.subtitle);
    setCategory(p.category);
    setPrice(p.price.toString());
    setOriginalPrice(p.originalPrice?.toString() || '');
    setMaterial(p.material);
    setGemstone(p.gemstone);
    setImageUrl(p.images[0]);
    setDescription(p.description);
    setIsAddModalOpen(true);
  };

  const resetForm = () => {
    setName('');
    setSubtitle('');
    setPrice('49999');
    setOriginalPrice('59999');
    setDescription('');
    setEditingProd(null);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      addCoupon({
        code: couponCode.trim().toUpperCase(),
        description: `Get ${couponVal}% off on orders above ₹${Number(couponMin).toLocaleString('en-IN')}`,
        discountType: 'percentage',
        discountValue: Number(couponVal),
        minPurchase: Number(couponMin)
      });
      setCouponCode('');
    }
  };

  return (
    <div className="py-12 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="bg-[#1C1917] text-white p-6 sm:p-8 rounded-3xl border border-[#3A342F] shadow-xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#C5A059] rounded-2xl text-white font-bold">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] block">
                Store Operations Management
              </span>
              <h1 className="font-serif-luxury text-2xl font-bold text-white">
                AURA Store Admin Console
              </h1>
            </div>
          </div>

          <button
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="bg-gradient-to-r from-[#DFBA6A] via-[#C5A059] to-[#9A7B38] text-[#141210] py-3 px-6 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" /> Add New Product
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#E7E2DA] no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shrink-0 ${
              activeTab === 'overview'
                ? 'bg-[#1C1917] text-[#D4AF37] border border-[#C5A059]'
                : 'bg-white text-[#44403C] border border-[#E7E2DA]'
            }`}
          >
            Store Overview
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shrink-0 ${
              activeTab === 'products'
                ? 'bg-[#1C1917] text-[#D4AF37] border border-[#C5A059]'
                : 'bg-white text-[#44403C] border border-[#E7E2DA]'
            }`}
          >
            Products Catalog ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shrink-0 ${
              activeTab === 'orders'
                ? 'bg-[#1C1917] text-[#D4AF37] border border-[#C5A059]'
                : 'bg-white text-[#44403C] border border-[#E7E2DA]'
            }`}
          >
            Orders & Shipments ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shrink-0 ${
              activeTab === 'coupons'
                ? 'bg-[#1C1917] text-[#D4AF37] border border-[#C5A059]'
                : 'bg-white text-[#44403C] border border-[#E7E2DA]'
            }`}
          >
            Coupons ({coupons.length})
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shrink-0 ${
              activeTab === 'reviews'
                ? 'bg-[#1C1917] text-[#D4AF37] border border-[#C5A059]'
                : 'bg-white text-[#44403C] border border-[#E7E2DA]'
            }`}
          >
            Reviews Moderation ({reviews.length})
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-[#E7E2DA] shadow-sm">
                <span className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-wider block mb-1">Total Gross Revenue</span>
                <span className="font-serif-luxury text-3xl font-bold text-[#1C1917]">₹{totalRevenue.toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-[#E7E2DA] shadow-sm">
                <span className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-wider block mb-1">Total Customer Orders</span>
                <span className="font-serif-luxury text-3xl font-bold text-[#1C1917]">{totalOrdersCount} Orders</span>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-[#E7E2DA] shadow-sm">
                <span className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-wider block mb-1">Active Catalogue Items</span>
                <span className="font-serif-luxury text-3xl font-bold text-[#1C1917]">{activeProductCount} Items</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Products List */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl border border-[#E7E2DA] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#E7E2DA] flex items-center justify-between">
              <h3 className="font-serif-luxury text-lg font-bold text-[#1C1917]">Manage Catalogue Products</h3>
              <button
                onClick={() => {
                  resetForm();
                  setIsAddModalOpen(true);
                }}
                className="bg-[#1C1917] text-[#D4AF37] px-4 py-2 rounded-xl text-xs font-semibold uppercase"
              >
                + Add Product
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAF8F5] text-[#1C1917] uppercase tracking-wider border-b border-[#E7E2DA]">
                    <th className="p-4">Item</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Metal & Stone</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Badge</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E2DA]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover border border-[#E7E2DA]" />
                        <div>
                          <strong className="text-[#1C1917] block">{p.name}</strong>
                          <span className="text-[10px] text-[#78716C]">SKU: {p.sku}</span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-[#1C1917] uppercase">{p.categoryName}</td>
                      <td className="p-4 text-[#78716C]">{p.material} • {p.gemstone}</td>
                      <td className="p-4 font-bold text-[#1C1917]">₹{p.price.toLocaleString('en-IN')}</td>
                      <td className="p-4">
                        <span className="bg-[#1C1917] text-[#D4AF37] text-[10px] px-2 py-1 rounded font-bold uppercase">
                          {p.badge || 'Standard'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button onClick={() => startEdit(p)} className="p-2 text-[#C5A059] hover:bg-[#FAF8F5] rounded-lg">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteProduct(p.id)} className="p-2 text-rose-600 hover:bg-[#FAF8F5] rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white p-6 rounded-3xl border border-[#E7E2DA] shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 border-b border-[#E7E2DA] pb-4">
                  <div>
                    <h3 className="font-serif-luxury text-base font-bold text-[#1C1917]">
                      Order #{ord.orderNumber} ({ord.items.length} items)
                    </h3>
                    <p className="text-xs text-[#78716C]">Customer: {ord.shippingAddress.fullName} ({ord.shippingAddress.phone})</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#1C1917]">Status:</span>
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      className="bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-2 rounded-xl font-bold"
                    >
                      <option value="Placed">Placed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs text-[#44403C]">
                  <strong>Delivery To:</strong> {ord.shippingAddress.street}, {ord.shippingAddress.city} - {ord.shippingAddress.pinCode}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Coupons */}
        {activeTab === 'coupons' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-[#E7E2DA] shadow-sm">
              <h3 className="font-serif-luxury text-lg font-bold text-[#1C1917] mb-4">Create New Discount Coupon</h3>
              <form onSubmit={handleCreateCoupon} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">Coupon Code</label>
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. LUXE15"
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl uppercase"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">Discount Percentage (%)</label>
                  <input
                    type="number"
                    value={couponVal}
                    onChange={(e) => setCouponVal(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">Minimum Order Value (₹)</label>
                  <input
                    type="number"
                    value={couponMin}
                    onChange={(e) => setCouponMin(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl"
                    required
                  />
                </div>
                <button type="submit" className="bg-[#1C1917] text-[#D4AF37] px-6 py-3 rounded-xl text-xs font-bold uppercase">
                  Create Active Coupon
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E7E2DA] shadow-sm">
              <h3 className="font-serif-luxury text-lg font-bold text-[#1C1917] mb-4">Active Store Coupons</h3>
              <div className="space-y-3">
                {coupons.map((c, i) => (
                  <div key={i} className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E7E2DA] flex justify-between items-center text-xs">
                    <div>
                      <strong className="text-[#1C1917] text-sm block font-serif-luxury">{c.code}</strong>
                      <span className="text-[#78716C]">{c.description}</span>
                    </div>
                    <span className="bg-[#DCFCE7] text-[#166534] px-2.5 py-1 rounded font-bold">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl p-6 sm:p-8 rounded-3xl border border-[#E7E2DA] shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif-luxury text-xl font-bold text-[#1C1917] mb-4">
              {editingProd ? 'Edit Product' : 'Add New Product To Catalogue'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#1C1917] uppercase block mb-1">Product Title *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E7E2DA] p-3 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#1C1917] uppercase block mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategorySlug)}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] p-3 rounded-xl uppercase font-semibold"
                  >
                    <option value="rings">Rings</option>
                    <option value="necklaces">Necklaces</option>
                    <option value="earrings">Earrings</option>
                    <option value="bracelets">Bracelets</option>
                    <option value="bangles">Bangles</option>
                    <option value="bridal">Bridal</option>
                    <option value="personalized">Personalized</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#1C1917] uppercase block mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] p-3 rounded-xl font-bold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#1C1917] uppercase block mb-1">Unsplash Image URL *</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E7E2DA] p-3 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#1C1917] uppercase block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E7E2DA] p-3 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E7E2DA]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-3 rounded-xl border border-[#E7E2DA] text-[#78716C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1C1917] text-[#D4AF37] px-6 py-3 rounded-xl font-bold uppercase"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
