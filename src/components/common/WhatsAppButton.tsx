import React, { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 flex flex-col items-end">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 bg-white p-4 rounded-2xl shadow-2xl border border-[#E7E2DA] max-w-xs w-72 animate-slideUp">
          <div className="flex items-center justify-between border-b border-[#F0ECE6] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm font-bold text-[#1C1917]">AURA Concierge</h4>
                <p className="text-[10px] text-[#166534] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span> Online Now
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#A8A29E] hover:text-[#1C1917]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#44403C] mb-4 leading-relaxed">
            Need help selecting a ring size, custom engraving, or assistance with your order? Chat live with our senior jewellery consultant.
          </p>

          <a
            href="https://wa.me/919876543210?text=Hello%20AURA%20Atelier,%20I%20would%20like%20assistance%20with%20jewellery%20selection."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            Start WhatsApp Chat
          </a>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center relative group"
        aria-label="WhatsApp Jewellery Concierge"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#D4AF37] rounded-full border-2 border-white animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#D4AF37] rounded-full border-2 border-white"></span>
      </button>
    </div>
  );
};
