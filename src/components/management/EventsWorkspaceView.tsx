import React from 'react';
import { useStore } from '../../store/useStore';
import { CheckCircle2, Circle } from 'lucide-react';


export const EventsWorkspaceView: React.FC = () => {
  const { bookings, tasks, toggleTaskCompletion, setSelectedBookingForDetail } = useStore();

  const upcomingBookings = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'In Progress');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242126]">
          Event Preparation Workspace
        </h2>
        <p className="text-xs sm:text-sm text-[#716B73]">
          Operational checklist & setup timeline for venue, decor, audio-visual, and catering arrangements.
        </p>
      </div>

      {/* Grid of Event Workspaces */}
      <div className="space-y-6">
        {upcomingBookings.map((b) => {
          const eventTasks = tasks.filter((t) => t.bookingId === b.id);
          const completedCount = eventTasks.filter((t) => t.isCompleted).length;

          return (
            <div
              key={b.id}
              className="bg-white rounded-3xl p-6 border border-[#E9E2E6] shadow-sm space-y-6"
            >
              {/* Event Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E9E2E6] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#7A284B] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                      {b.eventType}
                    </span>
                    <span className="text-xs text-[#716B73] font-mono">Ref: {b.bookingRef}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#242126]">
                    {b.customerName}
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="bg-[#FAF8F3] px-3 py-1.5 rounded-xl border border-[#E9E2E6]">
                    <span className="text-[#716B73] block text-[10px]">Date</span>
                    <span className="font-bold text-[#242126]">{b.eventDate}</span>
                  </div>

                  <div className="bg-[#FAF8F3] px-3 py-1.5 rounded-xl border border-[#E9E2E6]">
                    <span className="text-[#716B73] block text-[10px]">Guests</span>
                    <span className="font-bold text-[#7A284B]">{b.guestCount} Guests</span>
                  </div>

                  <button
                    onClick={() => setSelectedBookingForDetail(b)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-[#7A284B] hover:bg-[#5D1E38]"
                  >
                    View Full Booking
                  </button>
                </div>
              </div>

              {/* Tasks List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7A284B]">
                    Preparation Tasks Checklist ({completedCount} / {eventTasks.length} Completed)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {eventTasks.length === 0 ? (
                    <p className="text-xs text-[#716B73] italic">All standard venue preps logged.</p>
                  ) : (
                    eventTasks.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => toggleTaskCompletion(t.id)}
                        className={`p-3.5 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                          t.isCompleted
                            ? 'bg-[#3F7D63]/10 border-[#3F7D63]/30 text-[#716B73]'
                            : 'bg-[#FAF8F3] border-[#E9E2E6] hover:border-[#7A284B]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {t.isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-[#3F7D63]" />
                          ) : (
                            <Circle className="w-5 h-5 text-[#9A9299]" />
                          )}
                          <div>
                            <span className={`text-xs font-semibold block ${t.isCompleted ? 'line-through' : 'text-[#242126]'}`}>
                              {t.title}
                            </span>
                            <span className="text-[10px] text-[#C49A45] font-bold uppercase">{t.category}</span>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono text-[#716B73]">Due: {t.dueDate}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
