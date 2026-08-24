import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import type { EventType } from '../../types';
import { ArrowRight } from 'lucide-react';

interface EventDetail {
  type: EventType;
  title: string;
  description: string;
  image: string;
}

const EVENT_TYPES: EventDetail[] = [
  {
    type: 'Wedding',
    title: 'Grand Weddings',
    description: 'Generous hall capacity for large family gatherings, traditional stage arrangements, and rituals in absolute comfort.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  },
  {
    type: 'Reception',
    title: 'Evening Receptions',
    description: 'Ambient lighting with elegant seating arrangements, welcoming foyers, and executive dining layouts.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
  },
  {
    type: 'Nikah',
    title: 'Nikah Ceremonies',
    description: 'Thoughtful spatial arrangements for serene Nikah functions followed by celebratory Dawat feasts.',
    image: 'https://images.unsplash.com/photo-1545232979-fbf34fe367c3?auto=format&fit=crop&w=800&q=80',
  },
  {
    type: 'Engagement',
    title: 'Engagements',
    description: 'Cozy stage setups and warm hospitality for engagement celebrations and close family luncheons.',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
  },
  {
    type: 'Birthday',
    title: 'Milestone Celebrations',
    description: 'Flexible open space for themed decor, entertainment, and interactive dining experiences.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    type: 'Community Event',
    title: 'Community Events',
    description: 'Professional venue setup for seminars, award ceremonies, and local assemblies.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
  },
];

export const EventTypesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { openEnquiryModal } = useStore();
  const active = EVENT_TYPES[activeIndex];

  return (
    <section id="events" className="py-24 lg:py-32 bg-white">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Header */}
        <div className="max-w-xl mb-14 space-y-4">
          <p className="text-[#C49A45] text-xs tracking-[0.3em] uppercase font-medium">
            Occasions
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#242126] leading-tight">
            Made for{' '}
            <span className="text-[#7A284B]">every occasion.</span>
          </h2>
        </div>

        {/* Tab navigation — horizontal, minimal */}
        <div className="flex items-center gap-1 mb-10 overflow-x-auto pb-1 border-b border-[#E9E2E6]">
          {EVENT_TYPES.map((item, idx) => (
            <button
              key={item.type}
              onClick={() => setActiveIndex(idx)}
              className={`px-5 py-3 text-[13px] font-medium whitespace-nowrap transition-colors relative ${
                activeIndex === idx
                  ? 'text-[#7A284B] after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px] after:bg-[#7A284B]'
                  : 'text-[#9A9299] hover:text-[#242126]'
              }`}
            >
              {item.type}
            </button>
          ))}
        </div>

        {/* Active event showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-fadeIn" key={active.type}>
          
          {/* Image */}
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={active.image}
              alt={active.title}
              className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
            />
          </div>

          {/* Text */}
          <div className="space-y-6 lg:py-8">
            <p className="text-[#C49A45] text-xs tracking-[0.25em] uppercase font-medium">
              Event Category
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#242126]">
              {active.title}
            </h3>
            <p className="text-[#716B73] text-base leading-relaxed font-light max-w-md">
              {active.description}
            </p>

            <button
              onClick={() => openEnquiryModal()}
              className="group flex items-center gap-3 px-7 py-3.5 bg-[#7A284B] hover:bg-[#5D1E38] text-white text-[12px] font-medium tracking-wider uppercase transition-colors duration-200"
            >
              Plan Your {active.type}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
