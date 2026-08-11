import React from 'react';
import { Home, Compass, Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MobileStickyBar: React.FC = () => {
  const { activeView, setActiveView, cart, wishlist, setIsCartDrawerOpen } = useStore();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#E7E2DA] px-2 py-2 flex items-center justify-around shadow-lg">
      <button
        onClick={() => {
          setActiveView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center py-1 px-3 ${
          activeView === 'home' ? 'text-[#C5A059]' : 'text-[#78716C]'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] uppercase tracking-wider font-medium mt-0.5">Home</span>
      </button>

      <button
        onClick={() => {
          setActiveView('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center py-1 px-3 ${
          activeView === 'shop' ? 'text-[#C5A059]' : 'text-[#78716C]'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span className="text-[10px] uppercase tracking-wider font-medium mt-0.5">Shop</span>
      </button>

      <button
        onClick={() => {
          setActiveView('account');
        }}
        className="flex flex-col items-center py-1 px-3 text-[#78716C] relative"
      >
        <Heart className="w-5 h-5" />
        {wishlist.length > 0 && (
          <span className="absolute top-0 right-2 w-3.5 h-3.5 bg-[#C5A059] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
        <span className="text-[10px] uppercase tracking-wider font-medium mt-0.5">Saved</span>
      </button>

      <button
        onClick={() => setIsCartDrawerOpen(true)}
        className="flex flex-col items-center py-1 px-3 text-[#78716C] relative"
      >
        <ShoppingBag className="w-5 h-5" />
        {totalCartCount > 0 && (
          <span className="absolute top-0 right-2 w-3.5 h-3.5 bg-[#1C1917] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {totalCartCount}
          </span>
        )}
        <span className="text-[10px] uppercase tracking-wider font-medium mt-0.5">Bag</span>
      </button>

      <a
        href="https://wa.me/919876543210?text=Hello%20AURA%20Concierge,%20I%20need%20assistance%20choosing%20jewellery"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center py-1 px-3 text-[#25D366]"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-[10px] uppercase tracking-wider font-medium mt-0.5">Help</span>
      </a>
    </div>
  );
};
