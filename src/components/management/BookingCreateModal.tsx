import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import type { EventType } from '../../types';
import { X, AlertCircle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';


export const BookingCreateModal: React.FC = () => {
  const { 
    newBookingModalOpen, 
    setNewBookingModalOpen, 
    selectedEnquiryForConversion, 
    bookings, 
    packages, 
    convertEnquiryToBooking 
  } = useStore();

  const [step, setStep] = useState<number>(1);
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [eventType, setEventType] = useState<EventType>('Wedding');
  const [eventDate, setEventDate] = useState<string>('2026-10-18');
  const [guestCount, setGuestCount] = useState<number>(400);
  const [packageName, setPackageName] = useState<string>('Signature Celebration');
  const [totalAmount, setTotalAmount] = useState<number>(85000);
  const [advancePaid, setAdvancePaid] = useState<number>(30000);
  const [setupNotes, setSetupNotes] = useState<string>('');

  useEffect(() => {
    if (selectedEnquiryForConversion) {
      setCustomerName(selectedEnquiryForConversion.customerName);
      setPhone(selectedEnquiryForConversion.phone);
      setEventType(selectedEnquiryForConversion.eventType);
      setEventDate(selectedEnquiryForConversion.preferredDate);
      setGuestCount(selectedEnquiryForConversion.guestCount);
      if (selectedEnquiryForConversion.requirements) {
        setSetupNotes(selectedEnquiryForConversion.requirements);
      }
    }
  }, [selectedEnquiryForConversion]);

  if (!newBookingModalOpen) return null;

  // Check date availability
  const isDateBooked = bookings.some((b) => b.eventDate === eventDate && b.status !== 'Cancelled');

  const handlePackageSelect = (pkgName: string, price: number) => {
    setPackageName(pkgName);
    setTotalAmount(price);
    setAdvancePaid(Math.round(price * 0.4));
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !eventDate) return;

    convertEnquiryToBooking({
      enquiryId: selectedEnquiryForConversion?.id,
      customerName,
      phone,
      eventType,
      eventDate,
      guestCount,
      packageName,
      totalAmount,
      advancePaid,
      setupNotes,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-[#E9E2E6] shadow-2xl overflow-hidden relative my-8">
        
        {/* Header */}
        <div className="bg-[#5D1E38] text-white p-6 sm:p-8 relative">
          <button
            onClick={() => setNewBookingModalOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C49A45]/20 text-[#F7F0DD] text-[10px] font-extrabold tracking-widest uppercase mb-2 border border-[#C49A45]/30">
            <Sparkles className="w-3 h-3 text-[#C49A45]" />
            <span>GUIDED BOOKING WIZARD</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            {selectedEnquiryForConversion ? `Convert Enquiry: ${selectedEnquiryForConversion.customerName}` : 'Create New Booking'}
          </h3>
          <p className="text-rose-100/80 text-xs sm:text-sm mt-1">
            Step {step} of 4: Fill in event details and payment terms.
          </p>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/20 rounded-full mt-6 overflow-hidden">
            <div
              className="h-full bg-[#C49A45] transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Step 1: Customer & Event Type */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A284B] block">
                Step 1: Customer & Event Type
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-[#716B73] block mb-1">Customer / Family Name *</span>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ayesha & Rahman"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E9E2E6] text-sm text-[#242126] focus:outline-none focus:border-[#7A284B]"
                    required
                  />
                </div>

                <div>
                  <span className="text-xs text-[#716B73] block mb-1">Contact Phone *</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E9E2E6] text-sm text-[#242126] focus:outline-none focus:border-[#7A284B]"
                    required
                  />
                </div>
              </div>

              <div>
                <span className="text-xs text-[#716B73] block mb-1.5">Event Type</span>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as EventType)}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E9E2E6] text-sm font-semibold text-[#242126] focus:outline-none focus:border-[#7A284B]"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Reception">Reception</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Nikah">Nikah Ceremony</option>
                  <option value="Birthday">Birthday Party</option>
                  <option value="Family Celebration">Family Celebration</option>
                  <option value="Community Event">Community Event</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Date & Availability Check */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A284B] block">
                Step 2: Event Date & Venue Availability
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-[#716B73] block mb-1">Function Date *</span>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E9E2E6] text-sm text-[#242126] focus:outline-none focus:border-[#7A284B]"
                    required
                  />
                </div>

                <div>
                  <span className="text-xs text-[#716B73] block mb-1">Guest Count *</span>
                  <input
                    type="number"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E9E2E6] text-sm text-[#242126] focus:outline-none focus:border-[#7A284B]"
                    required
                  />
                </div>
              </div>

              {/* Availability Banner */}
              {isDateBooked ? (
                <div className="p-4 rounded-2xl bg-[#F7F0DD] border border-[#C49A45]/50 flex items-center gap-3 text-xs text-[#242126]">
                  <AlertCircle className="w-5 h-5 text-[#C58A35] flex-shrink-0" />
                  <div>
                    <span className="font-bold text-[#C58A35] block">DATE CONFLICT DETECTED</span>
                    <span>Another booking is registered on {eventDate}. You can override or adjust date.</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#F5E9EE] border border-[#7A284B]/30 flex items-center gap-3 text-xs text-[#242126]">
                  <CheckCircle2 className="w-5 h-5 text-[#3F7D63] flex-shrink-0" />
                  <div>
                    <span className="font-bold text-[#3F7D63] block">DATE AVAILABLE</span>
                    <span>STAR Convention Hall calendar is open on {eventDate}.</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Package & Pricing */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A284B] block">
                Step 3: Select Package & Pricing Estimate
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => handlePackageSelect(pkg.name, pkg.demoPriceEstimate)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      packageName === pkg.name
                        ? 'bg-[#7A284B] text-white border-[#7A284B] shadow-md'
                        : 'bg-[#FAF8F3] text-[#242126] border-[#E9E2E6] hover:border-[#7A284B]'
                    }`}
                  >
                    <span className={`text-[10px] font-bold uppercase block ${
                      packageName === pkg.name ? 'text-[#F7F0DD]' : 'text-[#7A284B]'
                    }`}>
                      {pkg.name}
                    </span>
                    <span className="font-serif text-lg font-bold block mt-1">
                      ₹{pkg.demoPriceEstimate.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-xs text-[#716B73] block mb-1">Total Agreed Amount (₹)</span>
                  <input
                    type="number"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E9E2E6] text-sm font-bold text-[#7A284B]"
                  />
                </div>

                <div>
                  <span className="text-xs text-[#716B73] block mb-1">Advance Payment Received (₹)</span>
                  <input
                    type="number"
                    value={advancePaid}
                    onChange={(e) => setAdvancePaid(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E9E2E6] text-sm font-bold text-[#3F7D63]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A284B] block">
                Step 4: Review & Confirm Booking Entry
              </span>

              <div className="bg-[#FAF8F3] p-5 rounded-2xl border border-[#E9E2E6] text-xs space-y-3">
                <div className="flex justify-between border-b border-[#E9E2E6] pb-2">
                  <span className="text-[#716B73]">Customer:</span>
                  <span className="font-bold text-[#242126]">{customerName} ({phone})</span>
                </div>
                <div className="flex justify-between border-b border-[#E9E2E6] pb-2">
                  <span className="text-[#716B73]">Event Type & Date:</span>
                  <span className="font-bold text-[#7A284B]">{eventType} on {eventDate}</span>
                </div>
                <div className="flex justify-between border-b border-[#E9E2E6] pb-2">
                  <span className="text-[#716B73]">Guest Count:</span>
                  <span className="font-bold text-[#242126]">{guestCount} Guests</span>
                </div>
                <div className="flex justify-between border-b border-[#E9E2E6] pb-2">
                  <span className="text-[#716B73]">Package Selected:</span>
                  <span className="font-bold text-[#242126]">{packageName}</span>
                </div>
                <div className="flex justify-between border-b border-[#E9E2E6] pb-2">
                  <span className="text-[#716B73]">Total Contract Value:</span>
                  <span className="font-bold text-[#7A284B] text-sm">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#716B73]">Advance Paid / Remaining:</span>
                  <span className="font-bold text-[#3F7D63]">
                    ₹{advancePaid.toLocaleString('en-IN')} / ₹{(totalAmount - advancePaid).toLocaleString('en-IN')} remaining
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs text-[#716B73] block mb-1">Setup Notes / Special Requests</span>
                <textarea
                  rows={2}
                  value={setupNotes}
                  onChange={(e) => setSetupNotes(e.target.value)}
                  placeholder="Stage decor notes, AC suite timing..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E9E2E6] text-xs text-[#242126]"
                ></textarea>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E9E2E6]">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#716B73] hover:text-[#242126]"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-[#7A284B] hover:bg-[#5D1E38] shadow-md flex items-center gap-1"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirm}
                className="px-7 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-[#7A284B] hover:bg-[#5D1E38] shadow-lg shadow-[#7A284B]/20"
              >
                Confirm & Add Booking
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
