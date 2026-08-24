import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, XCircle } from 'lucide-react';

export const AvailabilityChecker: React.FC = () => {
  const { bookings } = useStore();
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDay = (m: number, y: number) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDay(month, year);

  const getDateString = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getStatusForDate = (dateStr: string) => {
    const booking = bookings.find((b) => b.eventDate === dateStr);
    if (booking) {
      return booking.status === 'Confirmed' ? 'booked' : 'tentative';
    }
    return 'available';
  };

  const goToPrev = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };

  const goToNext = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const selectedStatus = selectedDate ? getStatusForDate(selectedDate) : null;

  return (
    <section id="availability" className="py-24 lg:py-32 bg-[#FAF8F3]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left: Info */}
          <div className="space-y-6 lg:pt-4">
            <p className="text-[#C49A45] text-xs tracking-[0.3em] uppercase font-medium">
              Availability
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#242126] leading-tight">
              Check available dates.
            </h2>
            <p className="text-[#716B73] text-base leading-relaxed font-light max-w-md">
              Browse the calendar to find open dates for your event. 
              Dates shown use demo sample data for demonstration.
            </p>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 pt-4">
              <span className="flex items-center gap-2 text-[13px] font-light text-[#716B73]">
                <span className="w-3 h-3 rounded-full bg-[#3F7D63]"></span>
                Available
              </span>
              <span className="flex items-center gap-2 text-[13px] font-light text-[#716B73]">
                <span className="w-3 h-3 rounded-full bg-[#C58A35]"></span>
                Tentative
              </span>
              <span className="flex items-center gap-2 text-[13px] font-light text-[#716B73]">
                <span className="w-3 h-3 rounded-full bg-[#C94A5A]"></span>
                Booked
              </span>
            </div>

            {/* Selected date info */}
            {selectedDate && (
              <div className="bg-white border border-[#E9E2E6] p-6 space-y-3 animate-fadeIn">
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#9A9299] font-medium">
                  Selected Date
                </p>
                <p className="font-serif text-xl font-semibold text-[#242126]">
                  {new Date(selectedDate + 'T00:00').toLocaleDateString('en-IN', { 
                    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
                  })}
                </p>
                <div className="flex items-center gap-2">
                  {selectedStatus === 'available' && (
                    <span className="flex items-center gap-1.5 text-sm text-[#3F7D63] font-medium">
                      <CheckCircle2 className="w-4 h-4" /> Available for booking
                    </span>
                  )}
                  {selectedStatus === 'tentative' && (
                    <span className="flex items-center gap-1.5 text-sm text-[#C58A35] font-medium">
                      <Clock className="w-4 h-4" /> Tentatively held
                    </span>
                  )}
                  {selectedStatus === 'booked' && (
                    <span className="flex items-center gap-1.5 text-sm text-[#C94A5A] font-medium">
                      <XCircle className="w-4 h-4" /> Date is booked
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right: Calendar */}
          <div className="bg-white border border-[#E9E2E6] p-6 lg:p-8">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={goToPrev} className="p-2 hover:bg-[#F5E9EE] rounded-full transition-colors">
                <ChevronLeft className="w-5 h-5 text-[#716B73]" />
              </button>
              <h3 className="font-serif text-lg font-semibold text-[#242126]">
                {monthNames[month]} {year}
              </h3>
              <button onClick={goToNext} className="p-2 hover:bg-[#F5E9EE] rounded-full transition-colors">
                <ChevronRight className="w-5 h-5 text-[#716B73]" />
              </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <div key={d} className="text-center text-[11px] tracking-wider text-[#9A9299] font-medium uppercase py-2">
                  {d}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }, (_, i) => (
                <div key={`empty-${i}`}></div>
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const dateStr = getDateString(day);
                const status = getStatusForDate(dateStr);
                const isToday = dateStr === today.toISOString().slice(0, 10);
                const isSelected = selectedDate === dateStr;
                const isPast = new Date(dateStr) < new Date(today.toISOString().slice(0, 10));

                return (
                  <button
                    key={day}
                    onClick={() => !isPast && setSelectedDate(dateStr)}
                    disabled={isPast}
                    className={`aspect-square flex items-center justify-center text-sm font-medium transition-all duration-150 relative ${
                      isPast 
                        ? 'text-[#E9E2E6] cursor-not-allowed' 
                        : isSelected
                          ? 'bg-[#7A284B] text-white'
                          : 'hover:bg-[#F5E9EE] text-[#242126]'
                    }`}
                  >
                    {day}
                    {!isPast && status !== 'available' && (
                      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                        status === 'booked' ? 'bg-[#C94A5A]' : 'bg-[#C58A35]'
                      } ${isSelected ? 'bg-white' : ''}`}></span>
                    )}
                    {isToday && !isSelected && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#7A284B]"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
