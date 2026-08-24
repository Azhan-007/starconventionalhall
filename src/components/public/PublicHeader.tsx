import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Menu, X } from 'lucide-react';

export const PublicHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openEnquiryModal } = useStore();

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-[37px] left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-black/5">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="font-serif text-lg font-semibold tracking-wide text-[#242126] group-hover:text-[#7A284B] transition-colors">
            STAR <span className="text-[#7A284B]">CONVENTION</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-[#716B73] tracking-wide">
          {['Home', 'Venue', 'Events', 'Gallery', 'Packages', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase())}
              className="hover:text-[#242126] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#7A284B] hover:after:w-full after:transition-all"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => scrollToSection('availability')}
            className="px-5 py-2 text-[12px] font-medium tracking-wider uppercase text-[#716B73] hover:text-[#242126] transition-colors"
          >
            Check Availability
          </button>
          <button
            onClick={() => openEnquiryModal()}
            className="px-6 py-2.5 text-[12px] font-medium tracking-wider uppercase text-white bg-[#7A284B] hover:bg-[#5D1E38] transition-colors"
          >
            Send Enquiry
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#242126]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E9E2E6] px-6 py-6 space-y-1 shadow-lg animate-fadeIn">
          {['Home', 'Venue', 'Events', 'Gallery', 'Packages', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase())}
              className="block w-full text-left py-3 text-sm font-medium text-[#242126] border-b border-[#E9E2E6] last:border-b-0"
            >
              {item}
            </button>
          ))}
          <div className="pt-4 space-y-3">
            <button
              onClick={() => { setMobileMenuOpen(false); openEnquiryModal(); }}
              className="w-full py-3 text-[12px] font-medium tracking-wider uppercase text-white bg-[#7A284B]"
            >
              Send Enquiry
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
