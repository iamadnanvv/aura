import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroSection } from '../home/HeroSection';
import { CategoryGrid } from '../home/CategoryGrid';
import { BrandStory } from '../home/BrandStory';
import { WhyChooseUs } from '../home/WhyChooseUs';
import { CustomerReviews } from '../home/CustomerReviews';
import { InstagramGallery } from '../home/InstagramGallery';
import { Newsletter } from '../home/Newsletter';
import { ProductCard } from '../product/ProductCard';
import { useStore } from '../../context/StoreContext';

export const HomePage: React.FC = () => {
  const { products, setActiveView, setSelectedCategory } = useStore();

  const newArrivals = products.filter((p) => p.isNewArrival || p.badge === 'New').slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestseller || p.badge === 'Bestseller').slice(0, 4);

  return (
    <div className="animate-fadeIn">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Categories */}
      <CategoryGrid />

      {/* 3. New Arrivals */}
      <section className="py-24 bg-[#FAF8F5] border-t border-[#E8E3DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 pb-6 border-b border-[#E8E3DC]">
            <div>
              <span className="editorial-eyebrow text-[#B89B64] block mb-2">
                FRESH FROM THE ATELIER
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1817] font-normal tracking-tight">
                New Additions
              </h2>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('all');
                setActiveView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#1A1817] hover:text-[#B89B64] transition-colors border-b border-[#1A1817] hover:border-[#B89B64] pb-1 self-start sm:self-auto group"
            >
              <span>View All New Additions</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Luxury Brand Story */}
      <BrandStory />

      {/* 5. Best Sellers */}
      <section className="py-24 bg-[#F7F4EF] border-t border-[#E8E3DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 pb-6 border-b border-[#E8E3DC]">
            <div>
              <span className="editorial-eyebrow text-[#B89B64] block mb-2">
                ATELIER FAVOURITES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1817] font-normal tracking-tight">
                Signature Best Sellers
              </h2>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('all');
                setActiveView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#1A1817] hover:text-[#B89B64] transition-colors border-b border-[#1A1817] hover:border-[#B89B64] pb-1 self-start sm:self-auto group"
            >
              <span>Explore All Bestsellers</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Editorial Collection Banner */}
      <section className="relative py-28 bg-[#141210] text-white overflow-hidden my-12 border-y border-[#292524]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2000&q=80"
            alt="Royal Emerald Collection"
            className="w-full h-full object-cover object-center opacity-35 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141210] via-[#141210]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start max-w-xl">
          <span className="editorial-eyebrow text-[#B89B64] block mb-3 tracking-[0.3em]">
            FEATURED HIGH JEWELLERY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.12] mb-4 text-white tracking-tight">
            The Royal Emerald & Diamond Suite
          </h2>
          <p className="text-xs sm:text-sm text-[#D6CEC3] leading-relaxed mb-8 font-light">
            Hand-selected Zambian emeralds framed in brilliant VVS halo settings. Designed for grand galas, milestones, and heirloom collections.
          </p>

          <button
            onClick={() => {
              setSelectedCategory('necklaces');
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#B89B64] hover:bg-[#A38652] text-[#141210] py-4 px-8 rounded-sm text-xs font-medium uppercase tracking-[0.2em] transition-all flex items-center gap-2"
          >
            <span>Discover Emerald Suite</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 7. Why Choose Us */}
      <WhyChooseUs />

      {/* 8. Customer Reviews */}
      <CustomerReviews />

      {/* 9. Instagram Gallery */}
      <InstagramGallery />

      {/* 10. Newsletter */}
      <Newsletter />
    </div>
  );
};

