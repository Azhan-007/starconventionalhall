import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', title: 'Grand Stage Architecture', category: 'Stage', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g2', title: 'Executive Dining Hall', category: 'Dining', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80' },
  { id: 'g3', title: 'Welcome Foyer', category: 'Foyer', image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80' },
  { id: 'g4', title: 'Evening Illumination', category: 'Lighting', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g5', title: 'Bridal Suite', category: 'Suite', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80' },
  { id: 'g6', title: 'Red Carpet Entrance', category: 'Entrance', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80' },
];

export const GallerySection: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-[#FAF8F3]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-4">
            <p className="text-[#C49A45] text-xs tracking-[0.3em] uppercase font-medium">
              Gallery
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#242126] leading-tight">
              Visual Showcase.
            </h2>
            <p className="text-[#716B73] text-base font-light max-w-md">
              Sample spatial arrangements, lighting concepts, and dining layouts.
            </p>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_ITEMS.map((item, idx) => {
            // Vary heights for visual interest
            const tall = idx === 0 || idx === 3;
            return (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className={`relative overflow-hidden cursor-pointer group ${
                  tall ? 'row-span-2 aspect-[3/4]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white/60 text-[11px] tracking-widest uppercase">{item.category}</p>
                  <p className="text-white text-sm font-medium mt-0.5">{item.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 animate-fadeIn">
          <button onClick={() => setLightboxIndex(null)} className="absolute top-6 right-6 text-white/60 hover:text-white p-2">
            <X className="w-6 h-6" />
          </button>
          <button onClick={() => setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)} className="absolute left-6 text-white/60 hover:text-white p-3">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button onClick={() => setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length)} className="absolute right-6 text-white/60 hover:text-white p-3">
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="max-w-5xl max-h-[85vh] text-center">
            <img
              src={GALLERY_ITEMS[lightboxIndex].image}
              alt={GALLERY_ITEMS[lightboxIndex].title}
              className="max-h-[75vh] w-auto mx-auto object-contain"
            />
            <p className="text-white/80 text-sm mt-4 font-medium">{GALLERY_ITEMS[lightboxIndex].title}</p>
          </div>
        </div>
      )}
    </section>
  );
};
