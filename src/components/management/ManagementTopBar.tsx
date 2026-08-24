import React from 'react';
import { useStore } from '../../store/useStore';
import { Calendar, Plus, MapPin, Menu } from 'lucide-react';

export const ManagementTopBar: React.FC = () => {
  const { managementPage, setNewBookingModalOpen, setSidebarMobileOpen } = useStore();

  const titles: Record<string, string> = {
    dashboard: 'Dashboard',
    calendar: 'Calendar Desk',
    enquiries: 'Enquiry Pipeline',
    bookings: 'Bookings List',
    customers: 'Customer Directory',
    events: 'Event Workspace',
    payments: 'Payment Ledger',
    reports: 'Revenue & Reports',
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
    <header className="h-14 bg-white border-b border-[#E9E2E6] flex items-center justify-between px-3 sm:px-6 shrink-0">
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarMobileOpen(true)}
          className="lg:hidden p-1.5 -ml-1 text-[#242126] hover:bg-[#FAF0F4] rounded-sm transition-colors cursor-pointer"
          title="Open Navigation Menu"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5 text-[#7A284B]" />
        </button>

        <div className="min-w-0">
          <h1 className="text-sm font-semibold text-[#242126] tracking-wide truncate">
            {titles[managementPage] || managementPage}
          </h1>
          <p className="text-[10px] sm:text-[11px] text-[#9A9299] font-light flex items-center gap-1 truncate hidden sm:flex">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            STAR Convention Hall, Pernambut
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
        <span className="text-[11px] sm:text-[12px] text-[#716B73] font-light hidden md:flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {dateStr}
        </span>
        <button
          onClick={() => setNewBookingModalOpen(true)}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-medium tracking-wider uppercase text-white bg-[#7A284B] hover:bg-[#5D1E38] transition-colors cursor-pointer shadow-xs whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">New Booking</span>
          <span className="xs:hidden">Booking</span>
        </button>
      </div>
    </header>
  );
};
