import React from 'react';
import { ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {

  const scrollToAvailability = () => {
    const el = document.getElementById('availability');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToVenue = () => {
    const el = document.getElementById('venue');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Full-width cinematic image with warm overlay */}
      <div className="relative min-h-[92vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85"
            alt="Elegant venue interior"
            className="w-full h-full object-cover"
          />
          {/* Warm cinematic overlay — NOT pure black */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2A1119]/90 via-[#2A1119]/70 to-[#2A1119]/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A1119]/60 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-32 lg:py-40">
          <div className="max-w-3xl space-y-8">
            
            {/* Eyebrow — minimal, elegant */}
            <p className="text-[#C49A45] text-xs tracking-[0.35em] uppercase font-medium">
              Celebrations &nbsp;·&nbsp; Events &nbsp;·&nbsp; Memorable Moments
            </p>

            {/* Headline — large, serif, calm */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-semibold text-white leading-[1.15] tracking-[-0.01em]">
              Where Your Special{' '}
              <br className="hidden sm:inline" />
              Moments Come{' '}
              <span className="text-[#D4AA5C]">Together.</span>
            </h1>

            {/* Supporting text — light, not too wordy */}
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-lg font-light">
              A welcoming venue for weddings, receptions, celebrations 
              and memorable gatherings in Pernambut, Tamil Nadu.
            </p>

            {/* Buttons — spacious, premium feel */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
              <button
                onClick={scrollToAvailability}
                className="group flex items-center gap-3 px-8 py-4 bg-[#C49A45] hover:bg-[#B38A3A] text-white text-sm font-medium tracking-wider uppercase rounded-none transition-all duration-200"
              >
                Check Availability
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={scrollToVenue}
                className="px-8 py-4 border border-white/30 hover:border-white/60 text-white text-sm font-medium tracking-wider uppercase rounded-none transition-all duration-200 hover:bg-white/5"
              >
                Explore Venue
              </button>
            </div>

          </div>
        </div>

        {/* Bottom fade into ivory */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF8F3] to-transparent"></div>
      </div>
    </section>
  );
};
