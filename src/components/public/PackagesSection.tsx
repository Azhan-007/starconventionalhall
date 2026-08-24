import React from 'react';
import { useStore } from '../../store/useStore';
import { Send, Check, Plus } from 'lucide-react';

export const PackagesSection: React.FC = () => {
  const { packages, openEnquiryModal } = useStore();

  return (
    <section id="packages" className="py-24 lg:py-32 bg-white">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <p className="text-[#C49A45] text-xs tracking-[0.3em] uppercase font-medium">
            Packages
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#242126] leading-tight">
            Curated Experiences.
          </h2>
          <p className="text-[#716B73] text-base font-light leading-relaxed">
            Flexible packages designed to match your celebration scale. All pricing 
            shown is for demonstration purposes only.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, idx) => {
            const isHighlighted = pkg.isFeatured || idx === 1;
            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col border transition-all duration-300 hover:shadow-lg ${
                  isHighlighted
                    ? 'bg-[#7A284B] text-white border-[#7A284B] shadow-md'
                    : 'bg-white text-[#242126] border-[#E9E2E6]'
                }`}
              >
                {/* Popular badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#C49A45] text-white text-[11px] tracking-[0.2em] uppercase font-medium shadow-sm">
                    {pkg.badge}
                  </div>
                )}

                <div className="p-8 lg:p-10 flex flex-col flex-1">
                  {/* Name & tagline */}
                  <p className={`text-xs tracking-[0.2em] uppercase font-medium mb-2 ${
                    isHighlighted ? 'text-[#C49A45]' : 'text-[#C49A45]'
                  }`}>
                    {pkg.name}
                  </p>
                  <p className={`text-sm font-light mb-6 ${
                    isHighlighted ? 'text-white/70' : 'text-[#716B73]'
                  }`}>
                    {pkg.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-1">
                    <span className={`text-[11px] tracking-widest uppercase ${
                      isHighlighted ? 'text-white/50' : 'text-[#9A9299]'
                    }`}>
                      EST. DEMO
                    </span>
                  </div>
                  <div className="flex items-baseline gap-0.5 mb-1">
                    <span className="font-serif text-3xl font-semibold">
                      ₹{pkg.demoPriceEstimate.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className={`text-[13px] font-light mb-8 ${
                    isHighlighted ? 'text-white/50' : 'text-[#9A9299]'
                  }`}>
                    Capacity: {pkg.demoGuestRange.replace(/\(Demo\)/gi, '').trim()} (Demo)
                  </p>

                  {/* Divider */}
                  <div className={`border-t mb-6 ${
                    isHighlighted ? 'border-white/15' : 'border-[#E9E2E6]'
                  }`}></div>

                  {/* Features */}
                  <p className={`text-[11px] tracking-[0.15em] uppercase font-medium mb-4 ${
                    isHighlighted ? 'text-white/60' : 'text-[#9A9299]'
                  }`}>
                    Included Features
                  </p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {(pkg.includedServices || []).map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm font-light">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          isHighlighted ? 'text-[#C49A45]' : 'text-[#7A284B]'
                        }`} />
                        <span className={isHighlighted ? 'text-white/85' : 'text-[#242126]'}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Extras */}
                  {pkg.optionalExtras && pkg.optionalExtras.length > 0 && (
                    <>
                      <div className={`border-t mb-5 ${
                        isHighlighted ? 'border-white/15' : 'border-[#E9E2E6]'
                      }`}></div>
                      <p className={`text-[11px] tracking-[0.15em] uppercase font-medium mb-3 ${
                        isHighlighted ? 'text-white/40' : 'text-[#9A9299]'
                      }`}>
                        Optional Extras Available
                      </p>
                      <ul className="space-y-2 mb-8">
                        {pkg.optionalExtras.map((extra, eIdx) => (
                          <li key={eIdx} className={`flex items-start gap-3 text-[13px] font-light ${
                            isHighlighted ? 'text-white/50' : 'text-[#9A9299]'
                          }`}>
                            <Plus className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                            <span>{extra}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {/* CTA */}
                  <button
                    onClick={() => openEnquiryModal()}
                    className={`flex items-center justify-center gap-2 w-full py-3.5 text-[12px] font-medium tracking-wider uppercase transition-colors duration-200 cursor-pointer ${
                      isHighlighted
                        ? 'bg-white text-[#7A284B] hover:bg-white/90 font-semibold'
                        : 'bg-[#7A284B] text-white hover:bg-[#5D1E38]'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    Inquire About Package
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
