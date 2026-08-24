import React from 'react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#242126] text-white/60">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-white tracking-wide">
              STAR <span className="text-[#C49A45]">CONVENTION</span>
            </h3>
            <p className="text-sm font-light leading-relaxed max-w-xs">
              A premier venue for weddings, receptions, and celebrations in Pernambut, Tamil Nadu.
            </p>
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 font-medium pt-2">
              This is a concept demo
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 font-medium">
              Quick Links
            </p>
            <div className="space-y-2.5">
              {['Venue', 'Events', 'Gallery', 'Packages', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const el = document.getElementById(item.toLowerCase());
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block text-sm font-light hover:text-white transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 font-medium">
              Location
            </p>
            <p className="text-sm font-light leading-relaxed">
              STAR Convention Hall<br />
              Pernambut, Tamil Nadu<br />
              (Demo address placeholder)
            </p>
            <p className="text-sm font-light">
              demo@starconventionhall.in<br />
              +91 XXXXX XXXXX (Demo)
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/30 font-light">
            © 2026 STAR Convention Hall — Client Demo
          </p>
          <p className="text-[12px] text-white/20 font-light">
            This is a concept demo application. No real business data.
          </p>
        </div>
      </div>
    </footer>
  );
};
