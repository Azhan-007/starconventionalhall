import React from 'react';
import { useStore } from '../../store/useStore';
import type { EnquiryStatus } from '../../types';
import { 
  ArrowRight, 
  Phone
} from 'lucide-react';


const STAGES: { id: EnquiryStatus; label: string; color: string }[] = [
  { id: 'New', label: 'New Enquiries', color: 'bg-blue-500' },
  { id: 'Contacted', label: 'Contacted', color: 'bg-[#C58A35]' },
  { id: 'Quoted', label: 'Quoted', color: 'bg-purple-500' },
  { id: 'Negotiating', label: 'Negotiating', color: 'bg-amber-600' },
  { id: 'Confirmed', label: 'Confirmed', color: 'bg-[#3F7D63]' },
  { id: 'Lost', label: 'Lost', color: 'bg-gray-400' },
];

export const EnquiriesView: React.FC = () => {
  const { enquiries, updateEnquiryStatus, setNewBookingModalOpen, openEnquiryModal } = useStore();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242126]">
            Enquiry Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-[#716B73]">
            Track customer enquiries from initial contact to booking confirmation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openEnquiryModal()}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#7A284B] bg-white border border-[#7A284B]/30 hover:bg-[#F5E9EE]"
          >
            + Test Public Enquiry
          </button>
        </div>
      </div>

      {/* Kanban Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageEnquiries = enquiries.filter((e) => e.status === stage.id);

          return (
            <div
              key={stage.id}
              className="bg-[#FAF8F3] rounded-2xl p-4 border border-[#E9E2E6] flex flex-col space-y-3 min-w-[220px]"
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between border-b border-[#E9E2E6] pb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${stage.color}`}></span>
                  <span className="text-xs font-bold text-[#242126]">{stage.label}</span>
                </div>
                <span className="bg-white px-2 py-0.5 rounded-full text-[10px] font-extrabold text-[#716B73] border border-[#E9E2E6]">
                  {stageEnquiries.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3 min-h-[300px]">
                {stageEnquiries.length === 0 ? (
                  <div className="h-32 border-2 border-dashed border-[#E9E2E6] rounded-xl flex items-center justify-center text-[11px] text-[#9A9299]">
                    No enquiries
                  </div>
                ) : (
                  stageEnquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="bg-white rounded-xl p-4 border border-[#E9E2E6] shadow-xs space-y-3 hover:border-[#7A284B]/40 transition"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C49A45]">
                          {enq.eventType}
                        </span>
                        {enq.estimatedValue && (
                          <span className="text-[11px] font-bold text-[#7A284B]">
                            ₹{(enq.estimatedValue / 1000).toFixed(0)}k
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#242126]">
                          {enq.customerName}
                        </h4>
                        <p className="text-[11px] text-[#716B73] flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-[#9A9299]" />
                          <span>{enq.phone}</span>
                        </p>
                      </div>

                      <div className="text-[11px] text-[#716B73] space-y-1 bg-[#FAF8F3] p-2 rounded-lg border border-[#E9E2E6]">
                        <div className="flex justify-between">
                          <span>Pref Date:</span>
                          <span className="font-bold text-[#242126]">{enq.preferredDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Guests:</span>
                          <span className="font-bold text-[#242126]">{enq.guestCount}</span>
                        </div>
                      </div>

                      {/* Stage selection dropdown */}
                      <div className="pt-1 flex items-center justify-between gap-2">
                        <select
                          value={enq.status}
                          onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)}
                          className="text-[10px] bg-[#FAF8F3] border border-[#E9E2E6] rounded-md px-2 py-1 font-semibold text-[#242126]"
                        >
                          {STAGES.map((s) => (
                            <option key={s.id} value={s.id}>{s.label}</option>
                          ))}
                        </select>

                        {enq.status !== 'Confirmed' && enq.status !== 'Lost' && (
                          <button
                            onClick={() => setNewBookingModalOpen(true, enq)}
                            title="Convert into confirmed booking"
                            className="p-1.5 rounded-lg bg-[#7A284B] text-white hover:bg-[#5D1E38] transition shadow-xs"
                          >
                            <ArrowRight className="w-3.5 h-3.5 text-[#C49A45]" />
                          </button>
                        )}
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
