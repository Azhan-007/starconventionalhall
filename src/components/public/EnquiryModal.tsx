import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import type { EventType } from '../../types';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';


export const EnquiryModal: React.FC = () => {
  const { enquiryModalOpen, closeEnquiryModal, prefilledEnquiryDate, submitEnquiry } = useStore();

  const [step, setStep] = useState<number>(1);
  const [eventType, setEventType] = useState<EventType>('Wedding');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(350);
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [requirements, setRequirements] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (prefilledEnquiryDate) {
      setPreferredDate(prefilledEnquiryDate);
    } else if (!preferredDate) {
      setPreferredDate('2026-10-15');
    }
  }, [prefilledEnquiryDate]);

  if (!enquiryModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    submitEnquiry({
      customerName,
      phone,
      email,
      eventType,
      preferredDate,
      guestCount,
      requirements,
    });

    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    closeEnquiryModal();
  };

  const inputCls = "w-full px-4 py-3.5 bg-[#FAF8F3] border border-[#E9E2E6] text-sm text-[#242126] focus:outline-none focus:border-[#7A284B] transition-colors";

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white max-w-lg w-full border border-[#E9E2E6] shadow-2xl overflow-hidden relative my-8">
        
        {/* Header */}
        <div className="bg-[#7A284B] text-white p-6 sm:p-8 relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 text-white/50 hover:text-white p-1 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <p className="text-[#C49A45] text-[10px] tracking-[0.3em] uppercase font-medium mb-2">
            Star Convention Hall • Pernambut
          </p>
          <h3 className="font-serif text-2xl font-semibold">
            {submitted ? 'Enquiry Submitted' : 'Plan Your Celebration'}
          </h3>
          <p className="text-white/50 text-xs mt-1.5">
            {submitted 
              ? 'Thank you for reaching out.' 
              : `Step ${step} of 5`}
          </p>

          {/* Progress */}
          {!submitted && (
            <div className="w-full h-[2px] bg-white/10 mt-5 overflow-hidden">
              <div
                className="h-full bg-[#C49A45] transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-14 h-14 mx-auto flex items-center justify-center bg-[#3F7D63]/10 text-[#3F7D63]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-xl font-semibold text-[#242126]">
                  Enquiry received.
                </h4>
                <p className="text-sm text-[#716B73] font-light max-w-sm mx-auto leading-relaxed">
                  Our team will contact you to discuss your event details.
                </p>
              </div>

              <div className="bg-[#FAF8F3] p-5 border border-[#E9E2E6] text-xs space-y-2.5 max-w-sm mx-auto text-left">
                {[
                  ['Event Type', eventType],
                  ['Date', preferredDate],
                  ['Contact', `${customerName} (${phone})`],
                ].map(([label, value], i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-[#E9E2E6] last:border-b-0">
                    <span className="text-[#716B73] font-light">{label}</span>
                    <span className="font-medium text-[#242126]">{value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full py-3.5 text-[12px] font-medium tracking-wider uppercase text-white bg-[#7A284B] hover:bg-[#5D1E38] transition-colors"
              >
                Done & Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <label className="text-[11px] tracking-[0.15em] uppercase text-[#9A9299] font-medium block">
                    What type of event?
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {['Wedding', 'Reception', 'Engagement', 'Nikah', 'Birthday', 'Family Celebration', 'Community Event'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setEventType(type as EventType)}
                        className={`p-3 border text-[13px] font-medium text-left transition-all ${
                          eventType === type
                            ? 'bg-[#7A284B] text-white border-[#7A284B]'
                            : 'bg-white text-[#242126] border-[#E9E2E6] hover:border-[#7A284B]/40'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <label className="text-[11px] tracking-[0.15em] uppercase text-[#9A9299] font-medium block">
                    Preferred event date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className={inputCls}
                    required
                  />
                  <p className="text-[11px] text-[#9A9299] font-light">
                    Alternate dates can be discussed after submission.
                  </p>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <label className="text-[11px] tracking-[0.15em] uppercase text-[#9A9299] font-medium block">
                    Estimated guest count
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="2000"
                    step="50"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className={inputCls}
                    required
                  />
                  <div className="flex gap-2">
                    {[150, 300, 500, 800].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setGuestCount(count)}
                        className={`flex-1 py-2 text-xs font-medium border transition-all ${
                          guestCount === count
                            ? 'bg-[#7A284B] text-white border-[#7A284B]'
                            : 'bg-white text-[#716B73] border-[#E9E2E6]'
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4 animate-fadeIn">
                  <label className="text-[11px] tracking-[0.15em] uppercase text-[#9A9299] font-medium block">
                    Contact information
                  </label>
                  <div className="space-y-3">
                    <div>
                      <span className="text-[11px] text-[#716B73] block mb-1.5 font-light">Full Name *</span>
                      <input type="text" placeholder="e.g. Tariq Ahmed" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className={inputCls} required />
                    </div>
                    <div>
                      <span className="text-[11px] text-[#716B73] block mb-1.5 font-light">Mobile Phone *</span>
                      <input type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} required />
                    </div>
                    <div>
                      <span className="text-[11px] text-[#716B73] block mb-1.5 font-light">Email (Optional)</span>
                      <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4 animate-fadeIn">
                  <label className="text-[11px] tracking-[0.15em] uppercase text-[#9A9299] font-medium block">
                    Special requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Stage decor preferences, catering needs, special arrangements..."
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className={inputCls}
                  ></textarea>
                </div>
              )}

              {/* Nav */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E9E2E6]">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2.5 text-[12px] font-medium text-[#716B73] hover:text-[#242126] transition"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                {step < 5 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-3 text-[12px] font-medium tracking-wider uppercase text-white bg-[#7A284B] hover:bg-[#5D1E38] flex items-center gap-1.5 transition-colors"
                  >
                    Next <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-7 py-3.5 text-[12px] font-medium tracking-wider uppercase text-white bg-[#7A284B] hover:bg-[#5D1E38] transition-colors"
                  >
                    Submit Enquiry
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
