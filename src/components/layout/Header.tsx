import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, Sparkles, LayoutDashboard } from 'lucide-react';
import { useStore, ViewType } from '../../context/StoreContext';
import { CategorySlug } from '../../types';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    setSelectedCategory,
    setIsSearchOpen,
    setIsCartDrawerOpen,
    cart,
    wishlist
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const handleCategoryNav = (catSlug: CategorySlug | 'all') => {
    setSelectedCategory(catSlug);
    setActiveView('shop');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { label: string; view?: ViewType; category?: CategorySlug | 'all' }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Shop All', view: 'shop', category: 'all' },
    { label: 'Rings', view: 'shop', category: 'rings' },
    { label: 'Necklaces', view: 'shop', category: 'necklaces' },
    { label: 'Earrings', view: 'shop', category: 'earrings' },
    { label: 'Bridal', view: 'shop', category: 'bridal' },
    { label: 'Collections', view: 'shop' },
    { label: 'About Us', view: 'about' },
    { label: 'Contact', view: 'contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7E2DA] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1C1917] hover:text-[#C5A059] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left cursor-pointer" onClick={() => setActiveView('home')}>
            <div className="inline-block">
              <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold tracking-[0.25em] text-[#1C1917] uppercase block">
                AURA
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[#C5A059] uppercase block font-medium -mt-1">
                Modern Jewellery
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive =
                item.view === activeView &&
                (!item.category || item.category === 'all');

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.category) {
                      handleCategoryNav(item.category);
                    } else if (item.view) {
                      setActiveView(item.view);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`text-xs font-medium tracking-widest uppercase transition-colors relative py-2 ${
                    isActive ? 'text-[#C5A059] font-semibold' : 'text-[#44403C] hover:text-[#C5A059]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#292524] hover:text-[#C5A059] transition-colors rounded-full hover:bg-[#F2ECE4]"
              title="Search Jewellery"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account */}
            <button
              onClick={() => setActiveView('account')}
              className={`p-2 transition-colors rounded-full hover:bg-[#F2ECE4] ${
                activeView === 'account' ? 'text-[#C5A059]' : 'text-[#292524] hover:text-[#C5A059]'
              }`}
              title="Customer Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => {
                setActiveView('account');
              }}
              className="p-2 text-[#292524] hover:text-[#C5A059] transition-colors relative rounded-full hover:bg-[#F2ECE4]"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C5A059] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Bag */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-2 text-[#1C1917] hover:text-[#C5A059] transition-colors relative rounded-full hover:bg-[#F2ECE4]"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#1C1917] text-[#FAF8F5] text-[10px] font-bold rounded-full flex items-center justify-center border border-[#C5A059]">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Admin Switch Quick Button */}
            <button
              onClick={() => setActiveView('admin')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wider uppercase border transition-all ${
                activeView === 'admin'
                  ? 'bg-[#1C1917] text-[#D4AF37] border-[#C5A059]'
                  : 'bg-white text-[#44403C] border-[#D6CEC3] hover:border-[#C5A059] hover:text-[#1C1917]'
              }`}
              title="Store Management Admin"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[112px] z-50 bg-[#FAF8F5] border-t border-[#E7E2DA] overflow-y-auto px-6 py-6 animate-fadeIn">
          <div className="flex flex-col space-y-4 pb-12">
            <div className="text-[11px] uppercase tracking-widest text-[#A8A29E] font-bold">Menu</div>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.category) {
                    handleCategoryNav(item.category);
                  } else if (item.view) {
                    setActiveView(item.view);
                    setMobileMenuOpen(false);
                  }
                }}
                className="text-left py-2 text-lg font-serif-luxury text-[#1C1917] hover:text-[#C5A059] transition-colors border-b border-[#F0ECE6]"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-6 border-t border-[#E7E2DA] flex flex-col gap-3">
              <button
                onClick={() => {
                  setActiveView('admin');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between px-4 py-3 bg-[#1C1917] text-white rounded-lg text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-[#C5A059]" /> Store Admin Console
                </span>
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
