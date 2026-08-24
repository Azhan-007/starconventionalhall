import React, { useState } from 'react';
import { useStore } from '../../store/useStore';

import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  X, 
  Plus, 
  Sparkles,
  ArrowRight
} from 'lucide-react';


export const CalendarView: React.FC = () => {
  const { 
    bookings, 
    enquiries, 
    selectedDateForCalendar, 
    setSelectedDateForCalendar, 
    setSelectedBookingForDetail,
    setNewBookingModalOpen
  } = useStore();

  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 8, 1)); // September 2026
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  // Month navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  const goToday = () => {
    setCurrentDate(new Date(2026, 8, 18));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  // Generate calendar grid days
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create array of days
  const calendarGrid = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarGrid.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarGrid.push({
      dayNumber: d,
      dateString: formattedDate,
    });
  }

  // Selected date events
  const selectedDateEvents = selectedDateForCalendar
    ? {
        bookings: bookings.filter((b) => b.eventDate === selectedDateForCalendar),
        enquiries: enquiries.filter((e) => e.preferredDate === selectedDateForCalendar),
      }
    : null;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto relative">
      
      {/* Top Controls Header */}
      <div className="bg-white rounded-3xl p-6 border border-[#E9E2E6] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Month Title & Nav */}
        <div className="flex items-center gap-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242126] min-w-[220px]">
            {monthName}
          </h2>

          <div className="flex items-center gap-1 bg-[#FAF8F3] p-1 rounded-xl border border-[#E9E2E6]">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg text-[#242126] hover:bg-white transition"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goToday}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#7A284B] hover:bg-white transition"
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg text-[#242126] hover:bg-white transition"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legend & View Switcher */}
        <div className="flex items-center gap-6">
          
          {/* Status Legend */}
          <div className="hidden md:flex items-center gap-4 text-xs font-medium text-[#716B73]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#7A284B]"></span>
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#C49A45]"></span>
              <span>Enquiry</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span>Available</span>
            </div>
          </div>

          {/* Month / Week View Toggle */}
          <div className="bg-[#FAF8F3] p-1 rounded-xl border border-[#E9E2E6] flex items-center">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'month' ? 'bg-[#7A284B] text-white shadow-xs' : 'text-[#716B73]'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'week' ? 'bg-[#7A284B] text-white shadow-xs' : 'text-[#716B73]'
              }`}
            >
              Week
            </button>
          </div>

        </div>

      </div>

      {/* Main Calendar Scheduling Grid */}
      <div className="bg-white rounded-3xl border border-[#E9E2E6] shadow-sm overflow-hidden">
        
        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b border-[#E9E2E6] bg-[#FAF8F3] text-center text-xs font-bold uppercase tracking-wider text-[#716B73] py-3">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-[#E9E2E6]">
          {calendarGrid.map((item, index) => {
            if (!item) {
              return <div key={`empty-${index}`} className="bg-[#FAF8F3]/50 min-h-[110px] sm:min-h-[130px]" />;
            }

            // Find matching bookings & enquiries for date
            const dateBookings = bookings.filter((b) => b.eventDate === item.dateString);
            const dateEnquiries = enquiries.filter((e) => e.preferredDate === item.dateString);
            const isSelected = selectedDateForCalendar === item.dateString;
            const isToday = item.dateString === '2026-09-18';

            return (
              <div
                key={item.dateString}
                onClick={() => setSelectedDateForCalendar(item.dateString)}
                className={`min-h-[110px] sm:min-h-[130px] p-2.5 transition-all cursor-pointer flex flex-col justify-between hover:bg-[#FAF8F3] ${
                  isSelected ? 'ring-2 ring-[#7A284B] bg-[#F5E9EE]/30' : ''
                }`}
              >
                {/* Day number header */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center ${
                    isToday
                      ? 'bg-[#7A284B] text-white shadow-xs'
                      : 'text-[#242126]'
                  }`}>
                    {item.dayNumber}
                  </span>

                  {dateBookings.length === 0 && dateEnquiries.length === 0 && (
                    <span className="text-[10px] text-emerald-600 font-semibold opacity-0 hover:opacity-100 transition-opacity">
                      Available
                    </span>
                  )}
                </div>

                {/* Event Tags */}
                <div className="space-y-1.5 my-1">
                  {dateBookings.map((b) => (
                    <div
                      key={b.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBookingForDetail(b);
                      }}
                      className="bg-[#F5E9EE] border border-[#7A284B]/30 p-1.5 rounded-lg text-left shadow-xs hover:bg-[#7A284B] hover:text-white group transition-colors"
                    >
                      <span className="text-[10px] font-extrabold uppercase text-[#7A284B] group-hover:text-[#F7F0DD] block truncate">
                        {b.eventType}
                      </span>
                      <span className="text-xs font-bold text-[#242126] group-hover:text-white block truncate leading-tight">
                        {b.customerName}
                      </span>
                      <span className="text-[9px] text-[#716B73] group-hover:text-rose-100 block truncate">
                        {b.guestCount} guests
                      </span>
                    </div>
                  ))}

                  {dateEnquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="bg-[#F7F0DD] border border-[#C49A45]/40 p-1.5 rounded-lg text-left shadow-xs"
                    >
                      <span className="text-[10px] font-extrabold uppercase text-[#C49A45] block truncate">
                        ENQUIRY • {enq.eventType}
                      </span>
                      <span className="text-xs font-bold text-[#242126] block truncate">
                        {enq.customerName}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer slot indicator */}
                <div className="text-[10px] text-[#9A9299] font-medium text-right">
                  {dateBookings.length > 0
                    ? '1 Event Booked'
                    : dateEnquiries.length > 0
                    ? `${dateEnquiries.length} Enquiry`
                    : 'Open'}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Side Panel Drawer for Selected Date */}
      {selectedDateForCalendar && selectedDateEvents && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white shadow-2xl border-l border-[#E9E2E6] p-6 space-y-6 overflow-y-auto animate-slideLeft">
          
          <div className="flex items-center justify-between border-b border-[#E9E2E6] pb-4">
            <div>
              <span className="text-xs font-bold text-[#C49A45] uppercase tracking-wider block">
                DATE DETAILS
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#242126]">
                {selectedDateForCalendar}
              </h3>
            </div>

            <button
              onClick={() => setSelectedDateForCalendar(null)}
              className="p-2 rounded-full hover:bg-[#FAF8F3] text-[#716B73]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bookings section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A284B] flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4" />
              <span>Confirmed Bookings ({selectedDateEvents.bookings.length})</span>
            </h4>

            {selectedDateEvents.bookings.length === 0 ? (
              <p className="text-xs text-[#716B73] italic">No confirmed bookings on this date.</p>
            ) : (
              selectedDateEvents.bookings.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBookingForDetail(b)}
                  className="p-4 rounded-2xl bg-[#F5E9EE] border border-[#7A284B]/30 space-y-2 cursor-pointer hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase text-[#7A284B]">
                      {b.eventType}
                    </span>
                    <span className="bg-[#3F7D63] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {b.status}
                    </span>
                  </div>

                  <h5 className="font-serif text-lg font-bold text-[#242126]">
                    {b.customerName}
                  </h5>

                  <div className="grid grid-cols-2 gap-2 text-xs text-[#716B73]">
                    <div>Guests: <span className="font-bold text-[#242126]">{b.guestCount}</span></div>
                    <div>Total: <span className="font-bold text-[#7A284B]">₹{b.totalAmount.toLocaleString('en-IN')}</span></div>
                    <div>Payment: <span className="font-semibold text-[#3F7D63]">{b.paymentStatus}</span></div>
                    <div>Phone: <span className="font-mono text-[#242126]">{b.phone}</span></div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Enquiries section */}
          <div className="space-y-3 pt-4 border-t border-[#E9E2E6]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C49A45] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Customer Enquiries ({selectedDateEvents.enquiries.length})</span>
            </h4>

            {selectedDateEvents.enquiries.length === 0 ? (
              <p className="text-xs text-[#716B73] italic">No enquiries recorded for this date.</p>
            ) : (
              selectedDateEvents.enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-4 rounded-2xl bg-[#F7F0DD] border border-[#C49A45]/40 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase text-[#C49A45]">
                      {enq.eventType}
                    </span>
                    <span className="bg-[#C58A35] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {enq.status}
                    </span>
                  </div>

                  <h5 className="font-serif text-base font-bold text-[#242126]">
                    {enq.customerName}
                  </h5>

                  <p className="text-xs text-[#716B73]">
                    Phone: {enq.phone} • {enq.guestCount} Guests
                  </p>

                  <button
                    onClick={() => {
                      setNewBookingModalOpen(true, enq);
                    }}
                    className="w-full mt-2 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#7A284B] hover:bg-[#5D1E38] shadow-xs flex items-center justify-center gap-1"
                  >
                    <span>Convert to Booking</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C49A45]" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Quick Create Button */}
          <div className="pt-4 border-t border-[#E9E2E6]">
            <button
              onClick={() => setNewBookingModalOpen(true)}
              className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#7A284B] hover:bg-[#5D1E38] shadow-md flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#C49A45]" />
              <span>Add Booking for {selectedDateForCalendar}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
