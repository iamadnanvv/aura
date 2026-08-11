import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Award, Instagram, Facebook, Mail, MessageCircle, PhoneCall, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CategorySlug } from '../../types';

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategory } = useStore();

  const handleCategoryNav = (catSlug: CategorySlug | 'all') => {
    setSelectedCategory(catSlug);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141210] text-[#E7E2DA] pt-16 pb-8 border-t border-[#292524]">
      {/* Brand Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pb-12 border-b border-[#292524]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#24201D] border border-[#3A342F] flex items-center justify-center text-[#C5A059] mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-serif-luxury text-base font-semibold text-white mb-1">BIS Hallmarked Gold</h4>
            <p className="text-xs text-[#A8A29E] max-w-[200px]">100% Certified pure gold and conflict-free natural diamonds.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#24201D] border border-[#3A342F] flex items-center justify-center text-[#C5A059] mb-3">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-serif-luxury text-base font-semibold text-white mb-1">Insured Free Shipping</h4>
            <p className="text-xs text-[#A8A29E] max-w-[200px]">Tamper-proof insured courier delivery to your doorstep.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#24201D] border border-[#3A342F] flex items-center justify-center text-[#C5A059] mb-3">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="font-serif-luxury text-base font-semibold text-white mb-1">15-Day Easy Returns</h4>
            <p className="text-xs text-[#A8A29E] max-w-[200px]">Hassle-free 100% money back exchange policy.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#24201D] border border-[#3A342F] flex items-center justify-center text-[#C5A059] mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif-luxury text-base font-semibold text-white mb-1">Lifetime Buyback</h4>
            <p className="text-xs text-[#A8A29E] max-w-[200px]">Transparent lifetime buyback and exchange guarantee.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <div className="mb-4 cursor-pointer" onClick={() => setActiveView('home')}>
              <span className="font-serif-luxury text-2xl font-bold tracking-[0.25em] text-white uppercase block">
                AURA
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase block font-medium -mt-1">
                Modern Jewellery
              </span>
            </div>
            <p className="text-xs text-[#A8A29E] leading-relaxed mb-6 max-w-sm">
              Handcrafted fine jewellery for life’s grandest milestones and daily luxury. Designed with modern elegance, ethically sourced gemstones, and timeless artistry.
            </p>
            <div className="flex items-center space-x-3 text-xs text-[#C5A059]">
              <Sparkles className="w-4 h-4" />
              <span>Flagship Atelier: Bandra West, Mumbai, India</span>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h3 className="font-serif-luxury text-sm font-semibold tracking-wider text-white uppercase mb-4 border-b border-[#292524] pb-2">
              Shop
            </h3>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              <li>
                <button onClick={() => handleCategoryNav('all')} className="hover:text-[#C5A059] transition-colors">
                  All Jewellery
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('rings')} className="hover:text-[#C5A059] transition-colors">
                  Rings
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('necklaces')} className="hover:text-[#C5A059] transition-colors">
                  Necklaces
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('earrings')} className="hover:text-[#C5A059] transition-colors">
                  Earrings
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('bracelets')} className="hover:text-[#C5A059] transition-colors">
                  Bracelets
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('bridal')} className="hover:text-[#C5A059] transition-colors">
                  Bridal Collection
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('all')} className="hover:text-[#C5A059] transition-colors">
                  New Arrivals
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Care */}
          <div>
            <h3 className="font-serif-luxury text-sm font-semibold tracking-wider text-white uppercase mb-4 border-b border-[#292524] pb-2">
              Customer Care
            </h3>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              <li>
                <button onClick={() => setActiveView('contact')} className="hover:text-[#C5A059] transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('contact')} className="hover:text-[#C5A059] transition-colors">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('contact')} className="hover:text-[#C5A059] transition-colors">
                  Returns & Exchange
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('account')} className="hover:text-[#C5A059] transition-colors">
                  Order Tracking
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('about')} className="hover:text-[#C5A059] transition-colors">
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Connect */}
          <div>
            <h3 className="font-serif-luxury text-sm font-semibold tracking-wider text-white uppercase mb-4 border-b border-[#292524] pb-2">
              Company & Connect
            </h3>
            <ul className="space-y-2.5 text-xs text-[#A8A29E] mb-6">
              <li>
                <button onClick={() => setActiveView('about')} className="hover:text-[#C5A059] transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('about')} className="hover:text-[#C5A059] transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: All customer data is handled with strict confidentiality under encrypted standards."); }} className="hover:text-[#C5A059] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms & Conditions: All products are 100% authentic and BIS Hallmarked."); }} className="hover:text-[#C5A059] transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>

            <div className="flex items-center space-x-3 text-[#A8A29E]">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#24201D] hover:bg-[#C5A059] hover:text-white rounded-full transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#24201D] hover:bg-[#C5A059] hover:text-white rounded-full transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#24201D] hover:bg-[#25D366] hover:text-white rounded-full transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="mailto:concierge@aurajewellery.com" className="p-2 bg-[#24201D] hover:bg-[#C5A059] hover:text-white rounded-full transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Bottom with Exact Attribution */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#292524] text-center text-xs text-[#78716C] flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© 2026 AURA Modern Jewellery. All Rights Reserved.</p>
        
        {/* Exact attribution required */}
        <p className="text-xs text-[#A8A29E]">
          E-commerce developed and managed by{' '}
          <a
            href="https://onlinestorepartner.page.gd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C5A059] font-semibold hover:underline underline-offset-2 transition-colors"
          >
            Online Store Partner
          </a>
        </p>

        <div className="flex items-center space-x-4 text-[10px] uppercase text-[#A8A29E] tracking-wider">
          <span>UPI</span>
          <span>•</span>
          <span>VISA</span>
          <span>•</span>
          <span>Mastercard</span>
          <span>•</span>
          <span>RuPay</span>
          <span>•</span>
          <span>Net Banking</span>
        </div>
      </div>
    </footer>
  );
};
