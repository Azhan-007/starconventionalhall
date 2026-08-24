import React from 'react';
import { useStore } from '../../store/useStore';
import { RotateCcw } from 'lucide-react';


export const SettingsView: React.FC = () => {
  const { resetDemoData } = useStore();

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242126]">
          Venue Configuration & Demo Controls
        </h2>
        <p className="text-xs sm:text-sm text-[#716B73]">
          Manage STAR Convention Hall operational settings and demo dataset state.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E2E6] shadow-sm space-y-6">
        
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#7A284B] border-b border-[#E9E2E6] pb-2">
            Venue Master Record
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[#716B73] block mb-1">Venue Title</span>
              <input
                type="text"
                disabled
                value="STAR CONVENTION HALL"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E9E2E6] font-bold text-[#242126]"
              />
            </div>

            <div>
              <span className="text-[#716B73] block mb-1">Location Jurisdiction</span>
              <input
                type="text"
                disabled
                value="Pernambut, Tamil Nadu"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E9E2E6] font-bold text-[#242126]"
              />
            </div>
          </div>
        </div>

        {/* Demo State Control */}
        <div className="pt-6 border-t border-[#E9E2E6] space-y-3">
          <h3 className="font-serif text-lg font-bold text-[#242126]">
            Demo Environment Reset
          </h3>
          <p className="text-xs text-[#716B73] leading-relaxed">
            Revert all enquiries, bookings, and payment records back to the initial sample seed dataset for presentation purposes.
          </p>

          <button
            onClick={resetDemoData}
            className="px-5 py-3 rounded-xl bg-[#7A284B] hover:bg-[#5D1E38] text-white text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-[#C49A45]" />
            <span>Reset Demo Data to Initial Seed</span>
          </button>
        </div>

      </div>

    </div>
  );
};
