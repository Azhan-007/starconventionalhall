import { create } from 'zustand';
import type { 
  Booking, 
  Customer, 
  DemoPackage, 
  Enquiry, 
  EnquiryStatus, 
  EventPrepTask, 
  EventType, 
  ManagementPage, 
  PaymentRecord, 
  PaymentStatus,
  ViewMode 
} from '../types';

import { 
  SEED_BOOKINGS, 
  SEED_CUSTOMERS, 
  SEED_ENQUIRIES, 
  SEED_PACKAGES, 
  SEED_PAYMENTS, 
  SEED_TASKS 
} from '../data/seedData';

interface AppState {
  // Navigation & UI State
  viewMode: ViewMode;
  managementPage: ManagementPage;
  enquiryModalOpen: boolean;
  prefilledEnquiryDate: string | null;
  selectedBookingForDetail: Booking | null;
  selectedDateForCalendar: string | null;
  newBookingModalOpen: boolean;
  selectedEnquiryForConversion: Enquiry | null;

  // Domain Data
  enquiries: Enquiry[];
  bookings: Booking[];
  customers: Customer[];
  packages: DemoPackage[];
  payments: PaymentRecord[];
  tasks: EventPrepTask[];

  // Actions
  setViewMode: (mode: ViewMode) => void;
  setManagementPage: (page: ManagementPage) => void;
  openEnquiryModal: (prefilledDate?: string) => void;
  closeEnquiryModal: () => void;
  setSelectedBookingForDetail: (booking: Booking | null) => void;
  setSelectedDateForCalendar: (date: string | null) => void;
  setNewBookingModalOpen: (open: boolean, enquiryToConvert?: Enquiry | null) => void;
  
  // Data Mutators
  submitEnquiry: (data: {
    customerName: string;
    phone: string;
    email?: string;
    eventType: EventType;
    preferredDate: string;
    guestCount: number;
    requirements?: string;
  }) => Enquiry;

  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  
  convertEnquiryToBooking: (data: {
    enquiryId?: string;
    customerName: string;
    phone: string;
    eventType: EventType;
    eventDate: string;
    guestCount: number;
    packageName: string;
    totalAmount: number;
    advancePaid: number;
    setupNotes?: string;
  }) => Booking;

  recordPayment: (paymentId: string, amountPaid: number) => void;
  toggleTaskCompletion: (taskId: string) => void;
  resetDemoData: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Navigation & UI State
  viewMode: 'public',
  managementPage: 'dashboard',
  enquiryModalOpen: false,
  prefilledEnquiryDate: null,
  selectedBookingForDetail: null,
  selectedDateForCalendar: null,
  newBookingModalOpen: false,
  selectedEnquiryForConversion: null,

  // Domain Data
  enquiries: SEED_ENQUIRIES,
  bookings: SEED_BOOKINGS,
  customers: SEED_CUSTOMERS,
  packages: SEED_PACKAGES,
  payments: SEED_PAYMENTS,
  tasks: SEED_TASKS,

  // Actions
  setViewMode: (mode) => set({ viewMode: mode }),
  setManagementPage: (page) => set({ managementPage: page }),
  
  openEnquiryModal: (prefilledDate) => set({ 
    enquiryModalOpen: true, 
    prefilledEnquiryDate: prefilledDate || null 
  }),
  
  closeEnquiryModal: () => set({ 
    enquiryModalOpen: false, 
    prefilledEnquiryDate: null 
  }),
  
  setSelectedBookingForDetail: (booking) => set({ selectedBookingForDetail: booking }),
  
  setSelectedDateForCalendar: (date) => set({ selectedDateForCalendar: date }),

  setNewBookingModalOpen: (open, enquiryToConvert = null) => set({
    newBookingModalOpen: open,
    selectedEnquiryForConversion: enquiryToConvert,
  }),

  // Data Mutators
  submitEnquiry: (data) => {
    const newEnquiry: Enquiry = {
      id: `enq-${Date.now()}`,
      customerName: data.customerName,
      phone: data.phone,
      email: data.email,
      eventType: data.eventType,
      preferredDate: data.preferredDate,
      guestCount: data.guestCount,
      requirements: data.requirements,
      estimatedValue: data.guestCount > 400 ? 120000 : 75000,
      status: 'New',
      createdAt: new Date().toISOString(),
      notes: 'Submitted via Public Portal demo form.',
    };

    set((state) => {
      // Check if customer exists or create new
      const existingCustomer = state.customers.find((c) => c.phone === data.phone);
      let updatedCustomers = state.customers;

      if (!existingCustomer) {
        const newCustomer: Customer = {
          id: `cust-${Date.now()}`,
          name: data.customerName,
          phone: data.phone,
          email: data.email,
          location: 'Pernambut Region',
          totalBookings: 0,
          totalSpent: 0,
          createdAt: new Date().toISOString().split('T')[0],
        };
        updatedCustomers = [newCustomer, ...state.customers];
      }

      return {
        enquiries: [newEnquiry, ...state.enquiries],
        customers: updatedCustomers,
      };
    });

    return newEnquiry;
  },

  updateEnquiryStatus: (id, status) => {
    set((state) => ({
      enquiries: state.enquiries.map((e) => e.id === id ? { ...e, status } : e),
    }));
  },

  convertEnquiryToBooking: (data) => {
    const state = get();
    const dateFormatted = data.eventDate.replace(/-/g, '');
    const bookingRef = `SCH-${dateFormatted.substring(0, 6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const bookingId = `bkg-${Date.now()}`;
    const remaining = data.totalAmount - data.advancePaid;

    const newBooking: Booking = {
      id: bookingId,
      bookingRef,
      customerName: data.customerName,
      phone: data.phone,
      eventType: data.eventType,
      eventDate: data.eventDate,
      guestCount: data.guestCount,
      packageName: data.packageName,
      totalAmount: data.totalAmount,
      advancePaid: data.advancePaid,
      paymentStatus: remaining === 0 ? 'Paid' : data.advancePaid > 0 ? 'Partially Paid' : 'Due',
      status: 'Confirmed',
      timelineStep: data.advancePaid > 0 ? 3 : 2,
      setupNotes: data.setupNotes || 'Created from management desk.',
      createdAt: new Date().toISOString().split('T')[0],
    };

    const newPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      bookingId,
      bookingRef,
      customerName: data.customerName,
      eventType: data.eventType,
      totalAmount: data.totalAmount,
      paidAmount: data.advancePaid,
      remainingBalance: remaining,
      dueDate: data.eventDate,
      status: remaining === 0 ? 'Paid' : data.advancePaid > 0 ? 'Partially Paid' : 'Due',
      lastPaymentDate: new Date().toISOString().split('T')[0],
    };

    // Update customer lifetime stats
    const updatedCustomers = state.customers.map((c) => {
      if (c.phone === data.phone || c.name.toLowerCase() === data.customerName.toLowerCase()) {
        return {
          ...c,
          totalBookings: c.totalBookings + 1,
          totalSpent: c.totalSpent + data.totalAmount,
        };
      }
      return c;
    });

    // If enquiry ID provided, update enquiry status to Confirmed
    const updatedEnquiries = data.enquiryId
      ? state.enquiries.map((e) => e.id === data.enquiryId ? { ...e, status: 'Confirmed' as EnquiryStatus } : e)
      : state.enquiries;

    set({
      bookings: [newBooking, ...state.bookings],
      payments: [newPayment, ...state.payments],
      customers: updatedCustomers,
      enquiries: updatedEnquiries,
      newBookingModalOpen: false,
      selectedEnquiryForConversion: null,
    });

    return newBooking;
  },

  recordPayment: (paymentId, amountPaid) => {
    set((state) => {
      const paymentIndex = state.payments.findIndex((p) => p.id === paymentId);
      if (paymentIndex === -1) return state;

      const currentPay = state.payments[paymentIndex];
      const newPaid = currentPay.paidAmount + amountPaid;
      const newRemaining = Math.max(0, currentPay.totalAmount - newPaid);
      const newStatus: PaymentStatus = newRemaining === 0 ? 'Paid' : newPaid > 0 ? 'Partially Paid' : 'Due';

      const updatedPayments = [...state.payments];
      updatedPayments[paymentIndex] = {
        ...currentPay,
        paidAmount: newPaid,
        remainingBalance: newRemaining,
        status: newStatus,
        lastPaymentDate: new Date().toISOString().split('T')[0],
      };

      // Also sync booking status & advancePaid
      const updatedBookings = state.bookings.map((b) => {
        if (b.id === currentPay.bookingId) {
          return {
            ...b,
            advancePaid: newPaid,
            paymentStatus: newStatus,
            timelineStep: (newStatus === 'Paid' ? 4 : b.timelineStep) as 1 | 2 | 3 | 4 | 5 | 6 | 7,
          };
        }
        return b;
      });


      return {
        payments: updatedPayments,
        bookings: updatedBookings,
      };
    });
  },

  toggleTaskCompletion: (taskId) => {
    set((state) => ({
      tasks: state.tasks.map((t) => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t),
    }));
  },

  resetDemoData: () => {
    set({
      enquiries: SEED_ENQUIRIES,
      bookings: SEED_BOOKINGS,
      customers: SEED_CUSTOMERS,
      packages: SEED_PACKAGES,
      payments: SEED_PAYMENTS,
      tasks: SEED_TASKS,
      selectedBookingForDetail: null,
      selectedDateForCalendar: null,
      enquiryModalOpen: false,
      newBookingModalOpen: false,
    });
  },
}));
