import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Users, Phone, Search } from 'lucide-react';


export const CustomersView: React.FC = () => {
  const { customers, bookings } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    (c.location && c.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedCust = customers.find((c) => c.id === selectedCustomerId);
  const custBookings = selectedCust
    ? bookings.filter((b) => b.phone === selectedCust.phone || b.customerName.toLowerCase() === selectedCust.name.toLowerCase())
    : [];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242126]">
          Customer Directory
        </h2>
        <p className="text-xs sm:text-sm text-[#716B73]">
          Manage customer relationships, historical bookings, and lifetime revenue.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 text-[#9A9299] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by name, phone, location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#E9E2E6] text-xs text-[#242126] focus:outline-none focus:border-[#7A284B]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Table / List (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E9E2E6] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F3] border-b border-[#E9E2E6] font-bold text-[#716B73] uppercase tracking-wider">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Bookings</th>
                  <th className="p-4 text-right">Total Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E2E6]">
                {filteredCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    onClick={() => setSelectedCustomerId(cust.id)}
                    className={`cursor-pointer transition ${
                      selectedCustomerId === cust.id ? 'bg-[#F5E9EE]' : 'hover:bg-[#FAF8F3]'
                    }`}
                  >
                    <td className="p-4">
                      <div className="font-bold text-[#242126] font-serif text-sm">{cust.name}</div>
                      <div className="text-[10px] text-[#716B73] font-mono">{cust.phone}</div>
                    </td>

                    <td className="p-4 text-[#716B73]">{cust.location || 'Pernambut'}</td>

                    <td className="p-4">
                      <span className="bg-[#7A284B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {cust.totalBookings} Event{cust.totalBookings > 1 ? 's' : ''}
                      </span>
                    </td>

                    <td className="p-4 text-right font-serif font-bold text-[#7A284B] text-sm">
                      ₹{cust.totalSpent.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Detail Drawer / Panel (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E9E2E6] shadow-sm space-y-6">
          {selectedCust ? (
            <div className="space-y-6">
              <div className="border-b border-[#E9E2E6] pb-4">
                <span className="text-[10px] font-bold text-[#C49A45] uppercase tracking-wider block">
                  CUSTOMER RECORD
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#242126]">{selectedCust.name}</h3>
                <p className="text-xs text-[#716B73] flex items-center gap-1.5 mt-1">
                  <Phone className="w-3.5 h-3.5 text-[#7A284B]" />
                  <span>{selectedCust.phone}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#FAF8F3] p-3.5 rounded-2xl border border-[#E9E2E6]">
                  <span className="text-[#716B73] block text-[10px]">Total Events</span>
                  <span className="font-serif font-bold text-[#7A284B] text-lg">{selectedCust.totalBookings}</span>
                </div>
                <div className="bg-[#FAF8F3] p-3.5 rounded-2xl border border-[#E9E2E6]">
                  <span className="text-[#716B73] block text-[10px]">Lifetime Value</span>
                  <span className="font-serif font-bold text-[#3F7D63] text-lg">₹{selectedCust.totalSpent.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Event History */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A284B]">
                  Event History
                </h4>

                {custBookings.length === 0 ? (
                  <p className="text-xs text-[#716B73] italic">No active bookings recorded yet.</p>
                ) : (
                  custBookings.map((b) => (
                    <div key={b.id} className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E9E2E6] text-xs space-y-1">
                      <div className="flex justify-between font-bold text-[#242126]">
                        <span>{b.eventType}</span>
                        <span className="text-[#7A284B]">₹{b.totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-[#716B73] text-[11px]">
                        <span>Date: {b.eventDate}</span>
                        <span>{b.guestCount} Guests</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center text-[#9A9299] space-y-2">
              <Users className="w-8 h-8 text-[#E9E2E6]" />
              <p className="text-xs font-medium">Select a customer from the directory to view event history.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
