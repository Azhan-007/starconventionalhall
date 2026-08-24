import React from 'react';

export const VenueSection: React.FC = () => {
  return (
    <section id="venue" className="py-24 lg:py-32">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section intro */}
        <div className="max-w-xl mb-16 space-y-4">
          <p className="text-[#C49A45] text-xs tracking-[0.3em] uppercase font-medium">
            The Venue
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#242126] leading-tight">
            Designed for{' '}
            <span className="text-[#7A284B]">your celebrations.</span>
          </h2>
          <p className="text-[#716B73] text-base leading-relaxed font-light">
            Thoughtfully planned spaces created to bring comfort, 
            grandeur, and seamless flow to every occasion.
          </p>
        </div>

        {/* Editorial Grid — asymmetric, breathing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Main large image */}
          <div className="relative overflow-hidden group aspect-[4/3] lg:aspect-auto lg:row-span-2">
            <img
              src="https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1000&q=80"
              alt="Main Convention Hall Interior"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#242126]/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-[#C49A45] text-xs tracking-[0.25em] uppercase font-medium mb-1">
                Main Hall
              </p>
              <h3 className="font-serif text-2xl font-semibold text-white">
                Elegant Architecture
              </h3>
              <p className="text-white/60 text-sm mt-2 max-w-sm font-light">
                Climate-controlled main hall with elevated stage infrastructure and customizable lighting.
              </p>
            </div>
          </div>

          {/* Top-right card */}
          <div className="bg-white p-8 lg:p-10 flex flex-col justify-center border border-[#E9E2E6]">
            <p className="text-[#C49A45] text-xs tracking-[0.25em] uppercase font-medium mb-3">01</p>
            <h3 className="font-serif text-xl font-semibold text-[#242126] mb-3">
              Event Arrangements
            </h3>
            <p className="text-[#716B73] text-sm leading-relaxed font-light">
              Versatile stage setups, custom seating configurations, and 
              dedicated dining space flow tailored for your celebration.
            </p>
          </div>

          {/* Bottom-right: two side-by-side smaller cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#F5E9EE]/50 p-7 flex flex-col justify-center">
              <p className="text-[#C49A45] text-xs tracking-[0.25em] uppercase font-medium mb-3">02</p>
              <h3 className="font-serif text-lg font-semibold text-[#242126] mb-2">
                Guest Experience
              </h3>
              <p className="text-[#716B73] text-[13px] leading-relaxed font-light">
                AC bridal suites, spacious parking, and smooth guest access.
              </p>
            </div>

            <div className="bg-[#F7F0DD]/40 p-7 flex flex-col justify-center">
              <p className="text-[#C49A45] text-xs tracking-[0.25em] uppercase font-medium mb-3">03</p>
              <h3 className="font-serif text-lg font-semibold text-[#242126] mb-2">
                Flexible Planning
              </h3>
              <p className="text-[#716B73] text-[13px] leading-relaxed font-light">
                Adaptable booking options and dedicated management support.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
