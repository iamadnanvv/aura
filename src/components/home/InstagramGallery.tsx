import React from 'react';
import { Instagram, Heart, Sparkles } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../../data/products';

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-20 bg-[#141210] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A059] block mb-1">
            Social Lookbook
          </span>
          <h2 className="font-serif-luxury text-3xl font-semibold text-white">
            Follow <span className="italic gold-text font-normal">@aura.jewellery</span>
          </h2>
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C5A059] text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:bg-[#C5A059] hover:text-white transition-all"
        >
          <Instagram className="w-4 h-4" />
          <span>Join Us On Instagram</span>
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {INSTAGRAM_POSTS.map((post) => (
          <a
            key={post.id}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border border-[#292524] shadow-md"
          >
            <img
              src={post.image}
              alt="Instagram lifestyle jewellery post"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-[#141210]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
              <Instagram className="w-6 h-6 text-[#D4AF37] self-end" />
              <div>
                <p className="text-xs text-white line-clamp-2 mb-2 font-serif-luxury">
                  {post.caption}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold">
                  <Heart className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
