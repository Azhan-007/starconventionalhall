import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Search, Eye, Plus } from 'lucide-react';


export const BookingsView: React.FC = () => {
  const { bookings, setSelectedBookingForDetail, setNewBookingModalOpen } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings.filter((b) =>
    b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.bookingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.phone.includes(searchTerm)
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242126]">
            Confirmed Bookings
          </h2>
          <p className="text-xs sm:text-sm text-[#716B73]">
            Manage upcoming confirmed function schedules and customer agreements.
          </p>
        </div>

        <button
          onClick={() => setNewBookingModalOpen(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-[#7A284B] hover:bg-[#5D1E38] shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-[#C49A45]" />
          <span>New Booking</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 text-[#9A9299] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by customer, phone, ref..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#E9E2E6] text-xs text-[#242126] focus:outline-none focus:border-[#7A284B]"
        />
      </div>

      {/* Grid of Booking Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookings.map((b) => (
          <div
            key={b.id}
            onClick={() => setSelectedBookingForDetail(b)}
            className="bg-white rounded-3xl p-6 border border-[#E9E2E6] shadow-sm hover:shadow-md hover:border-[#7A284B]/40 transition cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C49A45] bg-[#F7F0DD] px-2.5 py-1 rounded-full border border-[#C49A45]/30">
                  {b.eventType}
                </span>
                <span className="text-[10px] font-bold text-[#3F7D63] bg-[#3F7D63]/10 px-2 py-0.5 rounded-full">
                  {b.status}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#242126]">
                  {b.customerName}
                </h3>
                <p className="text-xs text-[#716B73] font-mono mt-0.5">Ref: {b.bookingRef}</p>
              </div>

              <div className="bg-[#FAF8F3] p-3 rounded-2xl border border-[#E9E2E6] space-y-1.5 text-xs text-[#716B73]">
                <div className="flex justify-between">
                  <span>Function Date:</span>
                  <span className="font-bold text-[#242126]">{b.eventDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Expected Guests:</span>
                  <span className="font-bold text-[#242126]">{b.guestCount} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span>Package:</span>
                  <span className="font-bold text-[#7A284B]">{b.packageName || 'Custom Setup'}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E9E2E6] flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-[#716B73] block">Contract Amount</span>
                <span className="font-serif font-bold text-[#7A284B] text-sm">₹{b.totalAmount.toLocaleString('en-IN')}</span>
              </div>

              <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#7A284B] bg-[#F5E9EE] hover:bg-[#7A284B] hover:text-white transition flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
