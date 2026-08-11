import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Newsletter: React.FC = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      showToast('Welcome to the AURA Inner Circle!', 'success');
      setEmail('');
    } else {
      showToast('Please enter a valid email address.', 'warning');
    }
  };

  return (
    <section className="py-24 bg-[#141210] text-white relative overflow-hidden border-t border-[#292524]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <span className="editorial-eyebrow text-[#B89B64] block mb-3 tracking-[0.3em]">
          PRIVATE INVITATIONS
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight mb-4 text-white">
          Join The Atelier <span className="italic font-light gold-text">Inner Circle.</span>
        </h2>

        <p className="text-xs sm:text-sm text-[#A8A29E] max-w-md mx-auto leading-relaxed mb-10 font-light">
          Receive priority invitations to private trunk shows, rare gemstone preview releases, and bespoke welcome vouchers.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-3 bg-[#1D1A17] border border-[#B89B64] px-6 py-4 rounded-md text-xs font-light text-[#DFA54B]">
            <CheckCircle2 className="w-4 h-4 text-[#86EFAC]" />
            <span>Thank you. Check your inbox for your ₹2,000 inaugural gift voucher.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-[#7D736A] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-[#1D1A17] border border-[#3A342F] focus:border-[#B89B64] text-white text-xs py-3.5 pl-11 pr-4 rounded-sm placeholder-[#7D736A] focus:outline-none transition-colors font-light"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#B89B64] hover:bg-[#A38652] text-[#141210] py-3.5 px-7 rounded-sm text-xs font-medium uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[10px] text-[#7D736A] mt-5 font-light">
          We honor your privacy. Unsubscribe anytime with a single click.
        </p>

      </div>
    </section>
  );
};

