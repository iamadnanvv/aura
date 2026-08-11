import React from 'react';
import { Award, ShieldCheck, Lock, Truck, RotateCcw, Headphones } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const guarantees = [
    {
      num: '01',
      icon: Award,
      title: 'Master Craftsmanship',
      description: 'Hand-forged by veteran goldsmiths with over 20+ years of dedicated artisan heritage.'
    },
    {
      num: '02',
      icon: ShieldCheck,
      title: '100% Certified Purity',
      description: 'Every gemstone and gold piece carries official SGL, IGI, or BIS Hallmark certification.'
    },
    {
      num: '03',
      icon: Lock,
      title: 'Encrypted Security',
      description: 'Protected payments via UPI, Cards, Net Banking, and insured Cash on Delivery.'
    },
    {
      num: '04',
      icon: Truck,
      title: 'Insured Logistics',
      description: 'Tamper-evident, fully insured express transit directly to your doorstep.'
    },
    {
      num: '05',
      icon: RotateCcw,
      title: '15-Day Exchange',
      description: 'Transparent 100% money back return or exchange with white-glove home pickup.'
    },
    {
      num: '06',
      icon: Headphones,
      title: 'Private Concierge',
      description: 'Personal ring size consulting, virtual video try-ons, and dedicated WhatsApp support.'
    }
  ];

  return (
    <section className="py-24 bg-[#F7F4EF] border-y border-[#E8E3DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="editorial-eyebrow block mb-2 text-[#B89B64]">
            OUR STANDARDS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1817] font-normal mb-3 tracking-tight">
            The AURA Quality Promise
          </h2>
          <p className="text-xs text-[#7D736A] max-w-md mx-auto font-light leading-relaxed">
            Every creation is held to uncompromising benchmarks of purity, artistry, and ethical stewardship.
          </p>
        </div>

        {/* Clean Column Grid with Hairline Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-start p-6 bg-white border border-[#E8E3DC] rounded-lg shadow-[0_2px_12px_rgba(26,24,23,0.02)] hover:border-[#B89B64]/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between w-full mb-6 pb-4 border-b border-[#E8E3DC]">
                  <span className="text-xs font-mono text-[#B89B64] font-medium">
                    {item.num}
                  </span>
                  <Icon className="w-4 h-4 text-[#B89B64]" />
                </div>

                <h3 className="font-serif text-lg font-normal text-[#1A1817] mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-[#7D736A] leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

