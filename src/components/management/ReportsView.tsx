import React from 'react';
import { useStore } from '../../store/useStore';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RePieChart, 
  Pie, 
  Cell 
} from 'recharts';


export const ReportsView: React.FC = () => {
  const { bookings, payments } = useStore();

  const totalContracted = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalCollected = payments.reduce((sum, p) => sum + p.paidAmount, 0);
  const totalOutstanding = payments.reduce((sum, p) => sum + p.remainingBalance, 0);

  // Revenue & Cashflow chart data
  const revenueData = [
    { name: 'Collected Advance', amount: totalCollected },
    { name: 'Outstanding Balance', amount: totalOutstanding },
  ];

  // Event Type Distribution Data
  const typeCounts: Record<string, number> = {};
  bookings.forEach((b) => {
    typeCounts[b.eventType] = (typeCounts[b.eventType] || 0) + 1;
  });

  const pieData = Object.keys(typeCounts).map((key) => ({
    name: key,
    value: typeCounts[key],
  }));

  const COLORS = ['#7A284B', '#C49A45', '#3F7D63', '#C58A35', '#5D1E38'];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242126]">
          Venue Revenue & Event Analytics
        </h2>
        <p className="text-xs sm:text-sm text-[#716B73]">
          High-level operational overview of booking revenue and event category distribution.
        </p>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-3xl border border-[#E9E2E6] shadow-sm space-y-2">
          <span className="text-[11px] font-bold text-[#716B73] uppercase tracking-wider block">Total Bookings Value</span>
          <p className="font-serif text-3xl font-bold text-[#7A284B]">₹{totalContracted.toLocaleString('en-IN')}</p>
          <span className="text-xs text-[#716B73]">Agreed contract volume</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E9E2E6] shadow-sm space-y-2">
          <span className="text-[11px] font-bold text-[#3F7D63] uppercase tracking-wider block">Realized Revenue</span>
          <p className="font-serif text-3xl font-bold text-[#3F7D63]">₹{totalCollected.toLocaleString('en-IN')}</p>
          <span className="text-xs text-[#3F7D63]">Advances & cleared payments</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E9E2E6] shadow-sm space-y-2">
          <span className="text-[11px] font-bold text-[#C58A35] uppercase tracking-wider block">Pending Receivables</span>
          <p className="font-serif text-3xl font-bold text-[#C58A35]">₹{totalOutstanding.toLocaleString('en-IN')}</p>
          <span className="text-xs text-[#716B73]">Due prior to function dates</span>
        </div>

      </div>

      {/* 2 Charts (Max 2-3 as requested) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Chart 1: Revenue vs Outstanding Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#E9E2E6] shadow-sm space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#242126]">
              Financial Realization Status
            </h3>
            <span className="text-xs text-[#716B73]">INR (₹)</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#716B73" fontSize={12} />
                <YAxis stroke="#716B73" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Amount']} />
                <Bar dataKey="amount" fill="#7A284B" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Event Type Distribution Donut (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E9E2E6] shadow-sm space-y-4 flex flex-col justify-between">
          <h3 className="font-serif text-lg font-bold text-[#242126]">
            Event Categories Breakdown
          </h3>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                >
                  {pieData.map((_, index) => (

                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
