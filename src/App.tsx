import { useStore } from './store/useStore';

import { TopDemoHeader } from './components/common/TopDemoHeader';

// Public Experience Components
import { PublicHeader } from './components/public/PublicHeader';
import { HeroSection } from './components/public/HeroSection';
import { VenueSection } from './components/public/VenueSection';
import { EventTypesSection } from './components/public/EventTypesSection';
import { GallerySection } from './components/public/GallerySection';
import { PackagesSection } from './components/public/PackagesSection';
import { AvailabilityChecker } from './components/public/AvailabilityChecker';
import { ContactSection } from './components/public/ContactSection';
import { PublicFooter } from './components/public/PublicFooter';
import { EnquiryModal } from './components/public/EnquiryModal';

// Management Experience Components
import { ManagementSidebar } from './components/management/ManagementSidebar';
import { ManagementTopBar } from './components/management/ManagementTopBar';
import { DashboardView } from './components/management/DashboardView';
import { CalendarView } from './components/management/CalendarView';
import { EnquiriesView } from './components/management/EnquiriesView';
import { BookingsView } from './components/management/BookingsView';
import { EventsWorkspaceView } from './components/management/EventsWorkspaceView';
import { PaymentsView } from './components/management/PaymentsView';
import { CustomersView } from './components/management/CustomersView';
import { ReportsView } from './components/management/ReportsView';
import { SettingsView } from './components/management/SettingsView';
import { BookingCreateModal } from './components/management/BookingCreateModal';
import { BookingDetailModal } from './components/management/BookingDetailModal';

export function App() {
  const { viewMode, managementPage } = useStore();

  const renderManagementContent = () => {
    switch (managementPage) {
      case 'dashboard':
        return <DashboardView />;
      case 'calendar':
        return <CalendarView />;
      case 'enquiries':
        return <EnquiriesView />;
      case 'bookings':
        return <BookingsView />;
      case 'events':
        return <EventsWorkspaceView />;
      case 'payments':
        return <PaymentsView />;
      case 'customers':
        return <CustomersView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#242126] selection:bg-[#7A284B] selection:text-white font-sans">
      {/* Top Client Demo Switcher Bar */}
      <TopDemoHeader />

      {viewMode === 'public' ? (
        /* PUBLIC EXPERIENCE */
        <div className="flex-1 flex flex-col pt-[37px]">
          <PublicHeader />
          <main className="flex-1">
            <HeroSection />
            <VenueSection />
            <EventTypesSection />
            <GallerySection />
            <PackagesSection />
            <AvailabilityChecker />
            <ContactSection />
          </main>
          <PublicFooter />
          
          {/* Public Modal */}
          <EnquiryModal />
        </div>
      ) : (
        /* MANAGEMENT EXPERIENCE */
        <div className="flex-1 flex min-h-[calc(100vh-37px)] pt-[37px]">
          <ManagementSidebar />
          <div className="flex-1 flex flex-col bg-[#FAF8F3] min-w-0">
            <ManagementTopBar />
            <main className="flex-1 pb-12 overflow-y-auto">
              {renderManagementContent()}
            </main>
          </div>

          {/* Management Modals */}
          <BookingCreateModal />
          <BookingDetailModal />
        </div>
      )}
    </div>
  );
}

export default App;
