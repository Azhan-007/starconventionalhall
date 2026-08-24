import React from 'react';
import { useStore } from '../../store/useStore';
import { Calendar, Plus, MapPin } from 'lucide-react';

export const ManagementTopBar: React.FC = () => {
  const { managementPage, setNewBookingModalOpen } = useStore();

  const titles: Record<string, string> = {
    dashboard: 'Dashboard',
    calendar: 'Calendar',
    enquiries: 'Enquiries',
    bookings: 'Bookings',
    customers: 'Customers',
    events: 'Event Workspace',
    payments: 'Payments',
    reports: 'Reports',
    settings: 'Settings',
  };

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <header className="h-14 bg-white border-b border-[#E9E2E6] flex items-center justify-between px-6">
      <div>
        <h1 className="text-sm font-semibold text-[#242126] tracking-wide">
          {titles[managementPage] || managementPage}
        </h1>
        <p className="text-[11px] text-[#9A9299] font-light flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          STAR Convention Hall, Pernambut
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[12px] text-[#716B73] font-light flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {dateStr}
        </span>
        <button
          onClick={() => setNewBookingModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-[11px] font-medium tracking-wider uppercase text-white bg-[#7A284B] hover:bg-[#5D1E38] transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          New Booking
        </button>
      </div>
    </header>
  );
};
