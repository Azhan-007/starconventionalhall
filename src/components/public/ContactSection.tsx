import React from 'react';
import { useStore } from '../../store/useStore';
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { openEnquiryModal } = useStore();

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Info */}
          <div className="space-y-10">
            <div className="space-y-4">
              <p className="text-[#C49A45] text-xs tracking-[0.3em] uppercase font-medium">
                Get in Touch
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#242126] leading-tight">
                Let's plan your event.
              </h2>
              <p className="text-[#716B73] text-base font-light leading-relaxed max-w-md">
                Connect with our team for venue visits, package enquiries, and event planning consultations.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-6">
              {[
                { icon: MapPin, label: 'Address', value: 'STAR Convention Hall\nPernambut, Tamil Nadu\n(Demo — Exact address placeholder)' },
                { icon: Phone, label: 'Phone', value: '+91 XXXXX XXXXX (Demo)' },
                { icon: Mail, label: 'Email', value: 'demo@starconventionhall.in' },
                { icon: Clock, label: 'Working Hours', value: 'Mon – Sun, 9:00 AM – 9:00 PM' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#F5E9EE] flex-shrink-0">
                    <item.icon className="w-4.5 h-4.5 text-[#7A284B]" />
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-[#9A9299] font-medium mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm text-[#242126] font-light whitespace-pre-line leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CTA Card */}
          <div className="flex flex-col justify-center">
            <div className="bg-[#7A284B] p-10 lg:p-14 text-center space-y-6">
              <div className="w-14 h-14 mx-auto flex items-center justify-center border border-white/20">
                <Send className="w-6 h-6 text-[#C49A45]" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-white">
                Ready to Book?
              </h3>
              <p className="text-white/60 text-sm font-light leading-relaxed max-w-sm mx-auto">
                Send us an enquiry with your preferred date, event type, and guest count. 
                Our team will respond with a detailed quote.
              </p>
              <button
                onClick={() => openEnquiryModal()}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#C49A45] hover:bg-[#B38A3A] text-white text-[12px] font-medium tracking-wider uppercase transition-colors duration-200 mx-auto"
              >
                Send Enquiry
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <p className="text-white/30 text-[11px] tracking-widest uppercase font-medium pt-2">
                Concept Demo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
