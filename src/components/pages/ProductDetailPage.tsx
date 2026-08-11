import React, { useState } from 'react';
import { Star, ShieldCheck, Truck, RotateCcw, Heart, ShoppingBag, Award, Sparkles, Check, ChevronDown, MapPin, ZoomIn, MessageCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActiveView,
    recentlyViewed,
    reviews,
    addReview,
    showToast
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedFinish, setSelectedFinish] = useState(product.finishOptions[0] || product.material);
  const [quantity, setQuantity] = useState(1);

  // PIN Code Delivery Estimator
  const [pinCode, setPinCode] = useState('400001');
  const [isCheckingPin, setIsCheckingPin] = useState(false);
  const [pinEstimate, setPinEstimate] = useState('Aug 14, 2026 (Free Insured Air Courier)');

  // Ring Size Guide Modal
  const [isRingGuideOpen, setIsRingGuideOpen] = useState(false);

  // Zoom Modal
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Accordions
  const [openAccordion, setOpenAccordion] = useState<'specs' | 'care' | 'shipping'>('specs');

  // Review Form state
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const inWish = isInWishlist(product.id);

  const handlePinCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode.length === 6) {
      setIsCheckingPin(true);
      setTimeout(() => {
        setIsCheckingPin(false);
        setPinEstimate(`Estimated Insured Delivery to PIN ${pinCode} in 2-3 Days.`);
      }, 600);
    } else {
      showToast('Please enter a valid 6-digit Indian PIN code', 'warning');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewName && newReviewTitle && newReviewComment) {
      addReview({
        id: `rev-${Date.now()}`,
        productId: product.id,
        productName: product.name,
        customerName: newReviewName,
        location: 'Verified Buyer',
        rating: newReviewRating,
        title: newReviewTitle,
        comment: newReviewComment,
        date: new Date().toISOString().split('T')[0],
        verifiedPurchase: true
      });
      setNewReviewName('');
      setNewReviewTitle('');
      setNewReviewComment('');
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="py-10 bg-[#FAF8F5] animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#78716C] mb-8">
          <button onClick={() => setActiveView('home')} className="hover:text-[#1C1917]">Home</button>
          <span>/</span>
          <button onClick={() => setActiveView('shop')} className="hover:text-[#1C1917] uppercase">{product.categoryName}</button>
          <span>/</span>
          <span className="text-[#1C1917] font-semibold truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </div>

        {/* Main Product Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 bg-white p-6 sm:p-10 rounded-3xl border border-[#E7E2DA] shadow-sm mb-16">
          
          {/* Left Column: Image Gallery */}
          <div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF8F5] mb-4 border border-[#E7E2DA] group cursor-zoom-in" onClick={() => setIsZoomOpen(true)}>
              <img
                src={product.images[selectedImgIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#1C1917] text-[#D4AF37] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#C5A059]">
                  {product.badge}
                </span>
              )}
              <button className="absolute bottom-4 right-4 bg-white/90 p-2.5 rounded-full text-[#1C1917] shadow-md hover:bg-white transition-all">
                <ZoomIn className="w-5 h-5 text-[#C5A059]" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIdx(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImgIdx === idx ? 'border-[#C5A059] ring-2 ring-[#C5A059]/20 scale-105' : 'border-[#E7E2DA] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Details & Order Box */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Reviews rating badge */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-[#D4AF37]' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#1C1917]">
                  {product.rating} ({product.reviewCount} Verified Reviews)
                </span>
              </div>

              <h1 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#1C1917] mb-2 leading-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#78716C] mb-6">{product.subtitle}</p>

              {/* Price Display */}
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E7E2DA] mb-6 flex flex-wrap items-baseline gap-4">
                <span className="font-serif-luxury text-3xl font-bold text-[#1C1917]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-base text-[#A8A29E] line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-[#166534] bg-[#DCFCE7] px-2.5 py-1 rounded-md border border-[#86EFAC]">
                      Save {discountPct}% (₹{(product.originalPrice - product.price).toLocaleString('en-IN')})
                    </span>
                  </>
                )}
                <span className="w-full text-[11px] text-[#78716C]">Inclusive of all taxes & BIS Hallmarking charges.</span>
              </div>

              {/* Finish Selector */}
              {product.finishOptions.length > 0 && (
                <div className="mb-6">
                  <span className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider block mb-2">
                    Metal Finish: <span className="text-[#C5A059] font-bold">{selectedFinish}</span>
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {product.finishOptions.map((finish) => (
                      <button
                        key={finish}
                        onClick={() => setSelectedFinish(finish)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                          selectedFinish === finish
                            ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-md'
                            : 'bg-white text-[#44403C] border-[#E7E2DA] hover:border-[#C5A059]'
                        }`}
                      >
                        {finish}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                      Selected Size: <span className="text-[#C5A059] font-bold">{selectedSize}</span>
                    </span>
                    <button
                      onClick={() => setIsRingGuideOpen(true)}
                      className="text-[11px] text-[#C5A059] hover:underline font-semibold"
                    >
                      Ring Size Helper
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                          selectedSize === sz
                            ? 'bg-[#C5A059] text-white border-[#C5A059] shadow-md'
                            : 'bg-white text-[#44403C] border-[#E7E2DA] hover:border-[#C5A059]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center border border-[#E7E2DA] rounded-xl bg-[#FAF8F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-1.5 text-base font-bold text-[#1C1917] hover:bg-[#E7E2DA]"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold text-[#1C1917]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-1.5 text-base font-bold text-[#1C1917] hover:bg-[#E7E2DA]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-8">
                <div className="flex gap-3">
                  <button
                    onClick={() => addToCart(product, selectedSize, selectedFinish, quantity)}
                    className="flex-1 bg-[#1C1917] hover:bg-[#332E2A] text-white py-4 px-6 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] transition-all"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                    Add To Shopping Bag
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-4 rounded-2xl border transition-all ${
                      inWish
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-white border-[#E7E2DA] text-[#1C1917] hover:border-[#C5A059]'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${inWish ? 'fill-rose-600' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(product, selectedSize, selectedFinish, quantity);
                    setActiveView('checkout');
                  }}
                  className="w-full bg-gradient-to-r from-[#DFBA6A] via-[#C5A059] to-[#9A7B38] text-[#141210] py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] shadow-md hover:scale-[1.01] transition-all"
                >
                  Buy Now With Instant Checkout
                </button>
              </div>

              {/* PIN Code Delivery Estimator */}
              <div className="bg-[#F7F3ED] p-4 rounded-2xl border border-[#E7E2DA] mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917] mb-2">
                  <MapPin className="w-4 h-4 text-[#C5A059]" />
                  <span>Check Delivery Date In Your PIN Code</span>
                </div>
                <form onSubmit={handlePinCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="Enter 6-digit PIN"
                    className="flex-1 bg-white border border-[#E7E2DA] text-xs px-3 py-2 rounded-xl focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#1C1917] text-white text-xs font-semibold px-4 py-2 rounded-xl"
                  >
                    {isCheckingPin ? 'Checking...' : 'Check'}
                  </button>
                </form>
                {pinEstimate && (
                  <p className="text-[11px] text-[#166534] font-medium mt-2 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> {pinEstimate}
                  </p>
                )}
              </div>

            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-2 pt-6 border-t border-[#E7E2DA] text-center text-[10px] text-[#78716C]">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] mb-1" />
                <span>BIS Hallmarked Pure Gold</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-[#C5A059] mb-1" />
                <span>Insured Doorstep Delivery</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-[#C5A059] mb-1" />
                <span>15-Day Moneyback Return</span>
              </div>
            </div>

          </div>

        </div>

        {/* Specifications Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7E2DA] shadow-sm mb-16">
          <h3 className="font-serif-luxury text-2xl font-bold text-[#1C1917] mb-6">
            Detailed Specifications & Certificate
          </h3>

          <div className="space-y-4">
            <div className="border border-[#E7E2DA] rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'specs' ? ('' as any) : 'specs')}
                className="w-full p-4 bg-[#FAF8F5] flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#1C1917]"
              >
                <span>Purity, Metal & Diamond Specifications</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'specs' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'specs' && (
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#44403C]">
                  <div><strong className="text-[#1C1917]">SKU:</strong> {product.sku}</div>
                  <div><strong className="text-[#1C1917]">Gold Purity:</strong> {product.specifications.purity}</div>
                  <div><strong className="text-[#1C1917]">Gross Weight:</strong> {product.specifications.grossWeight}</div>
                  {product.specifications.diamondCarat && (
                    <div><strong className="text-[#1C1917]">Diamond Carat:</strong> {product.specifications.diamondCarat}</div>
                  )}
                  {product.specifications.diamondClarity && (
                    <div><strong className="text-[#1C1917]">Clarity & Color:</strong> {product.specifications.diamondClarity}</div>
                  )}
                  <div><strong className="text-[#1C1917]">Certification:</strong> {product.specifications.certification}</div>
                </div>
              )}
            </div>

            <div className="border border-[#E7E2DA] rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'care' ? ('' as any) : 'care')}
                className="w-full p-4 bg-[#FAF8F5] flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#1C1917]"
              >
                <span>Jewellery Care & Cleaning Instructions</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'care' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'care' && (
                <div className="p-6 text-xs text-[#44403C] leading-relaxed space-y-2">
                  <p>• Avoid contact with harsh chemicals, perfumes, or hairsprays.</p>
                  <p>• Store in your custom velvet AURA box when not in use.</p>
                  <p>• Clean gently with warm soapy water and a soft-bristled brush.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7E2DA] shadow-sm mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#1C1917]">
                Customer Reviews
              </h3>
              <p className="text-xs text-[#78716C]">Read experiences from verified buyers of this piece.</p>
            </div>
          </div>

          {/* Add Review Form */}
          <form onSubmit={handleReviewSubmit} className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E7E2DA] mb-8">
            <h4 className="font-serif-luxury text-base font-bold text-[#1C1917] mb-4">Write A Review</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Your Name *"
                value={newReviewName}
                onChange={(e) => setNewReviewName(e.target.value)}
                className="bg-white border border-[#E7E2DA] text-xs p-3 rounded-xl focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Review Headline *"
                value={newReviewTitle}
                onChange={(e) => setNewReviewTitle(e.target.value)}
                className="bg-white border border-[#E7E2DA] text-xs p-3 rounded-xl focus:outline-none"
                required
              />
            </div>
            <textarea
              placeholder="Share your thoughts about quality, packaging, and fit..."
              value={newReviewComment}
              onChange={(e) => setNewReviewComment(e.target.value)}
              className="w-full bg-white border border-[#E7E2DA] text-xs p-3 rounded-xl focus:outline-none h-24 mb-4"
              required
            />
            <button
              type="submit"
              className="bg-[#1C1917] text-[#D4AF37] px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider"
            >
              Submit Verified Review
            </button>
          </form>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.slice(0, 3).map((r) => (
              <div key={r.id} className="p-4 border-b border-[#F0ECE6]">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < r.rating ? 'fill-[#D4AF37]' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#A8A29E]">{r.date}</span>
                </div>
                <h5 className="font-serif-luxury text-sm font-bold text-[#1C1917] mb-1">{r.title}</h5>
                <p className="text-xs text-[#44403C] leading-relaxed mb-2">{r.comment}</p>
                <span className="text-[10px] text-[#78716C] font-semibold">{r.customerName} ({r.location})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h3 className="font-serif-luxury text-2xl font-bold text-[#1C1917] mb-6">
              You May Also Admire
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Ring Size Guide Modal */}
      {isRingGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md p-6 rounded-3xl border border-[#E7E2DA] relative">
            <button onClick={() => setIsRingGuideOpen(false)} className="absolute top-4 right-4 text-[#1C1917]">✕</button>
            <h3 className="font-serif-luxury text-xl font-bold text-[#1C1917] mb-2">Ring Size Guide</h3>
            <p className="text-xs text-[#78716C] mb-4">Measure inner diameter of your existing ring in mm:</p>
            <div className="text-xs space-y-2 border-t border-[#E7E2DA] pt-3">
              <div className="flex justify-between"><span>Size 5:</span> <span>15.7 mm</span></div>
              <div className="flex justify-between font-semibold text-[#C5A059]"><span>Size 6:</span> <span>16.5 mm (Most Popular)</span></div>
              <div className="flex justify-between"><span>Size 7:</span> <span>17.3 mm</span></div>
              <div className="flex justify-between"><span>Size 8:</span> <span>18.2 mm</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setIsZoomOpen(false)}>
          <img
            src={product.images[selectedImgIdx] || product.images[0]}
            alt={product.name}
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
          />
        </div>
      )}
    </div>
  );
};
