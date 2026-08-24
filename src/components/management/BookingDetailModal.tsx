import React from 'react';
import { useStore } from '../../store/useStore';
import { X } from 'lucide-react';


export const BookingDetailModal: React.FC = () => {
  const { selectedBookingForDetail, setSelectedBookingForDetail, recordPayment } = useStore();

  if (!selectedBookingForDetail) return null;

  const b = selectedBookingForDetail;
  const remainingBalance = b.totalAmount - b.advancePaid;

  const timelineSteps = [
    { step: 1, label: 'Enquiry Received' },
    { step: 2, label: 'Quote Issued' },
    { step: 3, label: 'Advance Paid' },
    { step: 4, label: 'Confirmed' },
    { step: 5, label: 'Event Preparation' },
    { step: 6, label: 'Event Day' },
    { step: 7, label: 'Completed' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-[#E9E2E6] shadow-2xl overflow-hidden relative my-8">
        
        {/* Header */}
        <div className="bg-[#5D1E38] text-white p-6 sm:p-8 relative">
          <button
            onClick={() => setSelectedBookingForDetail(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">
            <span className="bg-[#C49A45] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full">
              REF: {b.bookingRef}
            </span>
            <span className="bg-white/20 text-[#F7F0DD] text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border border-white/20">
              {b.status}
            </span>
          </div>

          <h3 className="font-serif text-3xl font-bold mt-3">
            {b.customerName}
          </h3>
          <p className="text-rose-100/80 text-sm mt-1">
            {b.eventType} • {b.eventDate} • {b.guestCount} Expected Guests
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Interactive Timeline Tracker */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A284B]">
              Booking Lifecycle Timeline
            </h4>

            <div className="grid grid-cols-7 gap-1 bg-[#FAF8F3] p-3 rounded-2xl border border-[#E9E2E6]">
              {timelineSteps.map((item) => {
                const isPassed = b.timelineStep >= item.step;
                const isCurrent = b.timelineStep === item.step;

                return (
                  <div key={item.step} className="flex flex-col items-center text-center space-y-1">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-[#7A284B] text-white ring-4 ring-[#F5E9EE]'
                        : isPassed
                        ? 'bg-[#3F7D63] text-white'
                        : 'bg-[#E9E2E6] text-[#716B73]'
                    }`}>
                      {isPassed ? '✓' : item.step}
                    </div>
                    <span className={`text-[9px] font-semibold leading-tight hidden sm:block ${
                      isCurrent ? 'text-[#7A284B]' : 'text-[#716B73]'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Customer & Event Spec */}
            <div className="bg-[#FAF8F3] p-5 rounded-2xl border border-[#E9E2E6] space-y-3 text-xs">
              <span className="font-bold text-[#7A284B] uppercase tracking-wider block border-b border-[#E9E2E6] pb-2">
                Event Specifications
              </span>
              
              <div className="flex justify-between">
                <span className="text-[#716B73]">Customer Name:</span>
                <span className="font-bold text-[#242126]">{b.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#716B73]">Contact Phone:</span>
                <span className="font-bold text-[#242126]">{b.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#716B73]">Function Date:</span>
                <span className="font-bold text-[#242126]">{b.eventDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#716B73]">Guest Count:</span>
                <span className="font-bold text-[#242126]">{b.guestCount} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#716B73]">Arrangement Package:</span>
                <span className="font-bold text-[#7A284B]">{b.packageName || 'Custom Setup'}</span>
              </div>
            </div>

            {/* Financial Ledger Summary */}
            <div className="bg-[#FAF8F3] p-5 rounded-2xl border border-[#E9E2E6] space-y-3 text-xs">
              <span className="font-bold text-[#C49A45] uppercase tracking-wider block border-b border-[#E9E2E6] pb-2">
                Financial Breakdown
              </span>

              <div className="flex justify-between">
                <span className="text-[#716B73]">Total Amount Agreed:</span>
                <span className="font-serif font-bold text-[#242126] text-sm">₹{b.totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#716B73]">Advance Paid:</span>
                <span className="font-bold text-[#3F7D63]">₹{b.advancePaid.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E9E2E6]">
                <span className="font-bold text-[#242126]">Remaining Balance:</span>
                <span className="font-serif font-bold text-[#C94A5A] text-base">₹{remainingBalance.toLocaleString('en-IN')}</span>
              </div>

              {remainingBalance > 0 && (
                <button
                  onClick={() => {
                    recordPayment(b.id, remainingBalance);
                  }}
                  className="w-full mt-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#3F7D63] hover:bg-emerald-800 shadow-xs"
                >
                  Record Full Balance Payment (₹{remainingBalance.toLocaleString('en-IN')})
                </button>
              )}
            </div>

          </div>

          {/* Setup Notes */}
          {b.setupNotes && (
            <div className="p-4 rounded-2xl bg-[#F5E9EE] border border-[#7A284B]/20 space-y-1 text-xs">
              <span className="font-bold text-[#7A284B] block">Setup & Arrangement Instructions:</span>
              <p className="text-[#242126] leading-relaxed">{b.setupNotes}</p>
            </div>
          )}

          {/* Footer Close */}
          <div className="pt-4 border-t border-[#E9E2E6] flex justify-end">
            <button
              onClick={() => setSelectedBookingForDetail(null)}
              className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#716B73] bg-[#FAF8F3] hover:bg-[#E9E2E6]"
            >
              Close Workspace
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
