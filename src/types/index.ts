export type EventType = 
  | 'Wedding'
  | 'Reception'
  | 'Engagement'
  | 'Nikah'
  | 'Birthday'
  | 'Family Celebration'
  | 'Community Event';

export type EnquiryStatus = 
  | 'New'
  | 'Contacted'
  | 'Quoted'
  | 'Negotiating'
  | 'Confirmed'
  | 'Lost';

export type BookingStatus = 
  | 'Tentative'
  | 'Confirmed'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export type PaymentStatus = 
  | 'Paid'
  | 'Partially Paid'
  | 'Due'
  | 'Overdue';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location?: string;
  totalBookings: number;
  totalSpent: number;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  eventType: EventType;
  preferredDate: string; // YYYY-MM-DD
  guestCount: number;
  requirements?: string;
  estimatedValue?: number;
  status: EnquiryStatus;
  createdAt: string;
  notes?: string;
}

export interface DemoPackage {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  isFeatured?: boolean;
  demoGuestRange: string;
  demoPriceEstimate: number;
  includedServices: string[];
  optionalExtras: string[];
}

export interface Booking {
  id: string;
  bookingRef: string;
  customerName: string;
  phone: string;
  eventType: EventType;
  eventDate: string; // YYYY-MM-DD
  guestCount: number;
  packageName?: string;
  totalAmount: number;
  advancePaid: number;
  paymentStatus: PaymentStatus;
  status: BookingStatus;
  timelineStep: 1 | 2 | 3 | 4 | 5 | 6 | 7; // 1: Enquiry, 2: Quote, 3: Advance Paid, 4: Confirmed, 5: Prep, 6: Event Day, 7: Completed
  setupNotes?: string;
  cateringType?: string;
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  bookingId: string;
  bookingRef: string;
  customerName: string;
  eventType: EventType;
  totalAmount: number;
  paidAmount: number;
  remainingBalance: number;
  dueDate: string;
  status: PaymentStatus;
  lastPaymentDate?: string;
}

export interface EventPrepTask {
  id: string;
  bookingId: string;
  title: string;
  category: 'Venue' | 'Decor' | 'Catering' | 'Sound' | 'Staff';
  isCompleted: boolean;
  dueDate: string;
}

export type ViewMode = 'public' | 'management';

export type ManagementPage = 
  | 'dashboard'
  | 'calendar'
  | 'enquiries'
  | 'bookings'
  | 'events'
  | 'payments'
  | 'customers'
  | 'reports'
  | 'settings';
