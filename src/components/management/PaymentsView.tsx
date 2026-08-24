import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Search } from 'lucide-react';


export const PaymentsView: React.FC = () => {
  const { payments, recordPayment } = useStore();

  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredPayments = payments.filter((p) => {
    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    const matchesSearch = p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.bookingRef.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalCollected = payments.reduce((sum, p) => sum + p.paidAmount, 0);
  const totalOutstanding = payments.reduce((sum, p) => sum + p.remainingBalance, 0);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Financial Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-[#5D1E38] text-white p-6 rounded-3xl space-y-2 border border-[#7A284B] shadow-md">
          <span className="text-[11px] font-bold text-[#F7F0DD] uppercase tracking-wider block">Total Outstanding Balance</span>
          <p className="font-serif text-3xl font-bold text-white">₹{totalOutstanding.toLocaleString('en-IN')}</p>
          <span className="text-xs text-rose-200/80">Pending collection before event dates</span>
        </div>

        <div className="bg-white p-6 rounded-3xl space-y-2 border border-[#E9E2E6] shadow-sm">
          <span className="text-[11px] font-bold text-[#3F7D63] uppercase tracking-wider block">Total Advance Collected</span>
          <p className="font-serif text-3xl font-bold text-[#3F7D63]">₹{totalCollected.toLocaleString('en-IN')}</p>
          <span className="text-xs text-[#716B73]">Received across confirmed events</span>
        </div>

        <div className="bg-white p-6 rounded-3xl space-y-2 border border-[#E9E2E6] shadow-sm">
          <span className="text-[11px] font-bold text-[#716B73] uppercase tracking-wider block">Active Contracts</span>
          <p className="font-serif text-3xl font-bold text-[#242126]">{payments.length}</p>
          <span className="text-xs text-[#716B73]">Registered bookings</span>
        </div>

      </div>

      {/* Controls & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E9E2E6] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#9A9299] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customer or ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF8F3] border border-[#E9E2E6] text-xs text-[#242126] focus:outline-none focus:border-[#7A284B]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'Paid', 'Partially Paid', 'Due', 'Overdue'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                filterStatus === st
                  ? 'bg-[#7A284B] text-white shadow-xs'
                  : 'bg-[#FAF8F3] text-[#716B73] border border-[#E9E2E6] hover:text-[#7A284B]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-[#E9E2E6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            
            <thead className="bg-[#FAF8F3] border-b border-[#E9E2E6] font-bold text-[#716B73] uppercase tracking-wider">
              <tr>
                <th className="p-4">Ref & Customer</th>
                <th className="p-4">Event Type</th>
                <th className="p-4">Total Agreed</th>
                <th className="p-4">Paid Amount</th>
                <th className="p-4 text-right">Remaining Balance</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E9E2E6]">
              {filteredPayments.map((pay) => {
                return (

                  <tr key={pay.id} className="hover:bg-[#FAF8F3]/60 transition">
                    
                    <td className="p-4">
                      <div className="font-bold text-[#242126] font-serif text-sm">{pay.customerName}</div>
                      <div className="text-[10px] text-[#716B73] font-mono">{pay.bookingRef}</div>
                    </td>

                    <td className="p-4 font-semibold text-[#7A284B]">{pay.eventType}</td>

                    <td className="p-4 font-bold text-[#242126]">₹{pay.totalAmount.toLocaleString('en-IN')}</td>

                    <td className="p-4 text-[#3F7D63] font-bold">₹{pay.paidAmount.toLocaleString('en-IN')}</td>

                    <td className="p-4 text-right">
                      <span className={`font-serif font-bold text-sm ${
                        pay.remainingBalance > 0 ? 'text-[#C94A5A]' : 'text-emerald-700'
                      }`}>
                        ₹{pay.remainingBalance.toLocaleString('en-IN')}
                      </span>
                    </td>

                    <td className="p-4 text-[#716B73] font-mono">{pay.dueDate}</td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        pay.status === 'Paid'
                          ? 'bg-[#3F7D63]/15 text-[#3F7D63]'
                          : pay.status === 'Partially Paid'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {pay.status}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      {pay.remainingBalance > 0 ? (
                        <button
                          onClick={() => recordPayment(pay.id, pay.remainingBalance)}
                          className="px-3 py-1.5 rounded-lg bg-[#7A284B] text-white hover:bg-[#5D1E38] text-[10px] font-bold uppercase tracking-wider shadow-xs"
                        >
                          Record Payment
                        </button>
                      ) : (
                        <span className="text-[10px] text-[#3F7D63] font-bold">Cleared</span>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};
