import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      showToast('Message sent! Our senior concierge will contact you shortly.', 'success');
    }
  };

  return (
    <div className="py-16 bg-[#FAF8F5] min-h-screen animate-fadeIn">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A059] block mb-2">
            Atelier Assistance
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-light text-[#1C1917] mb-3">
            Contact <span className="italic font-normal gold-text">AURA Concierge</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C]">
            Schedule a virtual video appointment or get assistance with custom bridal orders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Info Cards */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#E7E2DA] shadow-sm flex items-start gap-4">
              <div className="p-3 bg-[#FAF8F5] rounded-2xl text-[#C5A059] border border-[#E7E2DA] shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-base font-bold text-[#1C1917] mb-1">Flagship Atelier & Boutique</h3>
                <p className="text-xs text-[#78716C] leading-relaxed">
                  AURA House, Turner Road, Bandra West,<br />
                  Mumbai, Maharashtra - 400050, India
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E7E2DA] shadow-sm flex items-start gap-4">
              <div className="p-3 bg-[#FAF8F5] rounded-2xl text-[#C5A059] border border-[#E7E2DA] shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-base font-bold text-[#1C1917] mb-1">Direct Phone & WhatsApp</h3>
                <p className="text-xs text-[#78716C] mb-1">+91 98765 43210 / +91 (022) 2640-8899</p>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#25D366] font-bold underline flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Chat on WhatsApp Now
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E7E2DA] shadow-sm flex items-start gap-4">
              <div className="p-3 bg-[#FAF8F5] rounded-2xl text-[#C5A059] border border-[#E7E2DA] shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-base font-bold text-[#1C1917] mb-1">Bespoke Inquiries Email</h3>
                <p className="text-xs text-[#78716C]">concierge@aurajewellery.com</p>
              </div>
            </div>

            <div className="bg-[#1C1917] text-white p-6 rounded-3xl border border-[#3A342F] flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <div className="text-xs">
                <strong className="text-[#D4AF37] block font-serif-luxury">Boutique Visiting Hours:</strong>
                <span className="text-[#A8A29E]">Monday – Sunday: 11:00 AM – 8:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* Right Column: Message Form */}
          <div className="bg-white p-8 rounded-3xl border border-[#E7E2DA] shadow-sm">
            <h2 className="font-serif-luxury text-xl font-bold text-[#1C1917] mb-2">Send Us A Message</h2>
            <p className="text-xs text-[#78716C] mb-6">Inquire about ring sizes, custom engraving, or bespoke sets.</p>

            {submitted ? (
              <div className="bg-[#DCFCE7] p-6 rounded-2xl text-xs text-[#166534] text-center">
                <Sparkles className="w-8 h-8 text-[#166534] mx-auto mb-2" />
                <h3 className="font-bold text-sm mb-1">Message Received!</h3>
                <p>Our senior concierge will get back to you within 2 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wider block mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wider block mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wider block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wider block mb-1">Your Message / Inquiry *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] text-xs p-3 rounded-xl focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1C1917] text-[#D4AF37] py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" /> Send Inquiry
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
