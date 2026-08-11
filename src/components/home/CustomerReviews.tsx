import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CustomerReviews: React.FC = () => {
  const { reviews } = useStore();

  return (
    <section className="py-20 bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="editorial-eyebrow block mb-2">
            Verified Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1817] font-normal mb-3 tracking-tight">
            Loved By Our Patrons
          </h2>
          <div className="flex justify-center items-center gap-2 text-xs font-light text-[#7D736A]">
            <div className="flex text-[#DFA54B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#DFA54B]" />
              ))}
            </div>
            <span>4.9 / 5.0 Rating from 1,200+ Verified Patrons</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="editorial-card p-6 rounded-xl flex flex-col justify-between relative"
            >
              <div>
                {/* Quote icon watermarked */}
                <Quote className="w-8 h-8 text-[#B89B64]/15 absolute top-4 right-4" />

                {/* Stars */}
                <div className="flex text-[#DFA54B] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-[#DFA54B]' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>

                <h4 className="font-serif text-base font-normal text-[#1A1817] mb-2 tracking-tight">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-[#524B45] leading-relaxed italic mb-6 font-light">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E3DC] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {rev.avatarUrl ? (
                    <img
                      src={rev.avatarUrl}
                      alt={rev.customerName}
                      className="w-8 h-8 rounded-full object-cover border border-[#B89B64]/40 shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#1A1817] text-[#DFA54B] text-xs font-medium flex items-center justify-center shrink-0">
                      {rev.customerName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h5 className="text-xs font-medium text-[#1A1817] flex items-center gap-1">
                      {rev.customerName}
                      {rev.verifiedPurchase && (
                        <CheckCircle2 className="w-3 h-3 text-[#166534]" title="Verified Buyer" />
                      )}
                    </h5>
                    <p className="text-[10px] text-[#8C827A] font-light">{rev.location}</p>
                  </div>
                </div>

                {rev.productName && (
                  <span className="text-[9px] bg-[#F7F4EF] text-[#B89B64] px-2 py-1 rounded font-medium uppercase tracking-[0.15em] hidden sm:block truncate max-w-[100px]">
                    {rev.productName}
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
