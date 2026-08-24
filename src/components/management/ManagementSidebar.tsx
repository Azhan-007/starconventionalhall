import React from 'react';
import { useStore } from '../../store/useStore';
import type { ManagementPage } from '../../types';
import { 
  LayoutDashboard, Calendar, MessageSquare, BookOpen, Users, 
  DollarSign, BarChart3, Settings, Zap, Star, X
} from 'lucide-react';

interface NavItem {
  id: ManagementPage;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export const ManagementSidebar: React.FC = () => {
  const { 
    managementPage, 
    setManagementPage, 
    enquiries, 
    payments, 
    sidebarMobileOpen, 
    setSidebarMobileOpen 
  } = useStore();

  const pendingEnquiries = enquiries.filter((e) => e.status === 'New').length;
  const pendingPayments = payments.filter((p) => p.status === 'Due' || p.status === 'Overdue').length;

  const sections: { title: string; items: NavItem[] }[] = [
    {
      title: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'calendar', label: 'Calendar Desk', icon: <Calendar className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Bookings & Clients',
      items: [
        { id: 'enquiries', label: 'Enquiry Pipeline', icon: <MessageSquare className="w-4 h-4" />, badge: pendingEnquiries || undefined },
        { id: 'bookings', label: 'Bookings List', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'customers', label: 'Customer Directory', icon: <Users className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Operations',
      items: [
        { id: 'events', label: 'Event Workspace', icon: <Zap className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Financials',
      items: [
        { id: 'payments', label: 'Payment Ledger', icon: <DollarSign className="w-4 h-4" />, badge: pendingPayments || undefined },
        { id: 'reports', label: 'Revenue & Reports', icon: <BarChart3 className="w-4 h-4" /> },
      ],
    },
    {
      title: 'System',
      items: [
        { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
      ],
    },
  ];

  const handleNavClick = (pageId: ManagementPage) => {
    setManagementPage(pageId);
    setSidebarMobileOpen(false);
  };

  const renderNavContent = () => (
    <>
      {/* Brand Header */}
      <div className="px-6 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#7A284B] flex items-center justify-center shadow-xs">
            <Star className="w-4 h-4 text-[#C49A45] fill-[#C49A45]/30" />
          </div>
          <div className="leading-tight">
            <p className="text-[13px] font-bold text-[#242126] tracking-wider uppercase">STAR HALL</p>
            <p className="text-[10px] text-[#9A9299] font-medium tracking-wide">Event Management</p>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={() => setSidebarMobileOpen(false)}
          className="lg:hidden p-1.5 text-[#9A9299] hover:text-[#242126] hover:bg-[#FAF0F4] rounded-sm transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 space-y-5">
        {sections.map((section, sIdx) => (
          <div key={sIdx}>
            {section.title && (
              <p className="text-[10px] tracking-[0.18em] uppercase text-[#9A9299] font-semibold px-3 mb-1.5">
                {section.title}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = managementPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-[13px] font-medium transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-[#FAF0F4] text-[#7A284B] font-semibold border-l-2 border-[#7A284B]'
                        : 'text-[#716B73] hover:bg-[#FAF8F3] hover:text-[#242126]'
                    }`}
                  >
                    <span className={isActive ? 'text-[#7A284B]' : 'text-[#9A9299]'}>
                      {item.icon}
                    </span>
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-[#7A284B] text-white text-[10px] font-bold rounded-full shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Status Tag */}
      <div className="px-6 pt-4 mt-auto border-t border-[#E9E2E6]/60">
        <p className="text-[11px] text-[#9A9299] font-light">Pernambut, Tamil Nadu</p>
        <p className="text-[10px] text-[#C49A45] font-medium uppercase tracking-wider mt-0.5">Demo Instance</p>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex w-64 min-w-[256px] max-w-[256px] shrink-0 bg-white border-r border-[#E9E2E6] sticky top-[37px] h-[calc(100vh-37px)] flex-col pt-5 pb-6 overflow-y-auto z-30 select-none">
        {renderNavContent()}
      </aside>

      {/* Mobile Drawer (When Open) */}
      {sidebarMobileOpen && (
        <div className="fixed inset-0 top-[37px] z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            onClick={() => setSidebarMobileOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs animate-fadeIn"
          ></div>

          {/* Drawer */}
          <aside className="relative w-72 max-w-[85vw] h-full bg-white flex flex-col pt-5 pb-6 shadow-2xl border-r border-[#E9E2E6] overflow-y-auto select-none animate-slideLeft z-10">
            {renderNavContent()}
          </aside>
        </div>
      )}
    </>
  );
};
