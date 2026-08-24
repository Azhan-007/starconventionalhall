import React from 'react';
import { useStore } from '../../store/useStore';
import { Calendar, AlertCircle, Users, DollarSign, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { bookings, enquiries, customers, payments, setManagementPage, setSelectedBookingForDetail } = useStore();

  const upcomingBookings = bookings
    .filter((b) => b.status === 'Confirmed' && new Date(b.eventDate) >= new Date())
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

  const pendingEnquiries = enquiries.filter((e) => e.status === 'New');
  const duePayments = payments.filter((p) => p.status === 'Due' || p.status === 'Overdue');

  const totalRevenue = payments
    .filter((p) => p.status === 'Paid' || p.status === 'Partially Paid')
    .reduce((sum, p) => sum + p.paidAmount, 0);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <div className="p-6 lg:p-8 max-w-6xl space-y-8 animate-fadeIn">
      
      {/* Greeting */}
      <div className="space-y-1">
        <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-[#242126]">{greeting}.</h2>
        <p className="text-sm text-[#716B73] font-light">
          Here is what is happening at STAR Convention Hall today.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Upcoming Events', value: upcomingBookings.length, icon: Calendar, color: '#7A284B' },
          { label: 'New Enquiries', value: pendingEnquiries.length, icon: AlertCircle, color: '#C58A35' },
          { label: 'Total Clients', value: customers.length, icon: Users, color: '#3F7D63' },
          { label: 'Collected (Demo)', value: `₹${(totalRevenue / 1000).toFixed(0)}K`, icon: DollarSign, color: '#7A284B' },
        ].map((metric, idx) => (
          <div key={idx} className="bg-white border border-[#E9E2E6] p-5 space-y-3 shadow-xs hover:border-[#E6C7D4] transition-colors">
            <div className="flex items-center justify-between">
              <p className="text-[11px] tracking-[0.15em] uppercase text-[#9A9299] font-medium">
                {metric.label}
              </p>
              <metric.icon className="w-4 h-4" style={{ color: metric.color }} />
            </div>
            <p className="font-serif text-2xl font-semibold text-[#242126]">
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Upcoming Events — 3 cols */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#242126] tracking-wide">Upcoming Confirmed Events</h3>
            <button 
              onClick={() => setManagementPage('calendar')}
              className="text-[12px] text-[#7A284B] font-medium flex items-center gap-1 hover:underline cursor-pointer"
            >
              View Calendar <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {upcomingBookings.slice(0, 5).map((booking) => {
              const date = new Date(booking.eventDate + 'T00:00');
              return (
                <div 
                  key={booking.id} 
                  onClick={() => setSelectedBookingForDetail(booking)}
                  className="bg-white border border-[#E9E2E6] p-4 flex items-center gap-4 hover:border-[#7A284B]/40 hover:shadow-xs transition-all cursor-pointer"
                >
                  {/* Date badge */}
                  <div className="w-12 h-12 bg-[#FAF0F4] border border-[#E6C7D4] flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-[#7A284B]">
                      {date.getDate()}
                    </span>
                    <span className="text-[9px] tracking-wider uppercase text-[#9A9299] font-medium">
                      {date.toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#242126] truncate">{booking.customerName}</p>
                    <p className="text-[12px] text-[#9A9299] font-light">
                      {booking.eventType} · {booking.guestCount} guests {booking.packageName ? `· ${booking.packageName}` : ''}
                    </p>
                  </div>

                  {/* Status */}
                  <span className="flex items-center gap-1 text-[11px] text-[#3F7D63] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Confirmed
                  </span>
                </div>
              );
            })}

            {upcomingBookings.length === 0 && (
              <div className="bg-white border border-[#E9E2E6] p-8 text-center">
                <p className="text-sm text-[#9A9299] font-light">No upcoming events scheduled.</p>
              </div>
            )}
          </div>
        </div>

        {/* Needs Attention — 2 cols */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold text-[#242126] tracking-wide">Needs Attention</h3>
          
          <div className="space-y-2.5">
            {/* Pending Enquiries */}
            {pendingEnquiries.map((enq) => (
              <div key={enq.id} className="bg-white border border-[#E9E2E6] p-4 space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 bg-[#C58A35]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 text-[#C58A35]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-[#242126]">{enq.customerName}</p>
                    <p className="text-[11px] text-[#9A9299] font-light">{enq.eventType} · Preferred: {enq.preferredDate}</p>
                  </div>
                </div>
                <button
                  onClick={() => setManagementPage('enquiries')}
                  className="w-full py-1.5 text-[11px] font-medium tracking-wider uppercase text-[#7A284B] border border-[#E9E2E6] hover:bg-[#FAF0F4] transition-colors cursor-pointer"
                >
                  Review Enquiry
                </button>
              </div>
            ))}

            {/* Pending Payments */}
            {duePayments.slice(0, 3).map((payment) => (
              <div key={payment.id} className="bg-white border border-[#E9E2E6] p-4 flex items-center gap-3">
                <div className="w-6 h-6 bg-[#C94A5A]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-3.5 h-3.5 text-[#C94A5A]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[#242126] truncate">{payment.customerName}</p>
                  <p className="text-[11px] text-[#9A9299] font-light">
                    {payment.bookingRef} · Due: ₹{payment.remainingBalance.toLocaleString('en-IN')}
                  </p>
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 ${
                  payment.status === 'Overdue' ? 'bg-[#C94A5A]/10 text-[#C94A5A]' : 'bg-[#C58A35]/10 text-[#C58A35]'
                }`}>
                  {payment.status}
                </span>
              </div>
            ))}

            {pendingEnquiries.length === 0 && duePayments.length === 0 && (
              <div className="bg-white border border-[#E9E2E6] p-6 text-center">
                <CheckCircle2 className="w-6 h-6 text-[#3F7D63] mx-auto mb-2" />
                <p className="text-sm text-[#9A9299] font-light">All clear — no pending items requiring review.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
