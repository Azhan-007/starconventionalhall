import React from 'react';
import { useStore } from '../../store/useStore';
import { Sparkles, RotateCcw } from 'lucide-react';

export const TopDemoHeader: React.FC = () => {
  const { viewMode, setViewMode, resetDemoData } = useStore();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#1C1820] text-white h-[37px] flex items-center justify-between px-3 sm:px-5 text-[11px] select-none">
      
      {/* Left side */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
        <span className="flex items-center gap-1 text-[#C49A45] font-semibold tracking-wider uppercase whitespace-nowrap text-[10px] sm:text-[11px]">
          <Sparkles className="w-3 h-3 flex-shrink-0" />
          <span>Demo</span>
        </span>
        <span className="text-white/20 hidden xs:inline">·</span>
        <span className="text-white/40 font-light truncate text-[10px] sm:text-[11px] hidden md:inline">
          STAR Convention Hall, Pernambut
        </span>
      </div>

      {/* Right side switcher */}
      <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
        <button
          onClick={() => setViewMode('public')}
          className={`px-2.5 sm:px-3.5 py-1 rounded-xs text-[10px] sm:text-[11px] font-medium tracking-wide transition-all cursor-pointer whitespace-nowrap ${
            viewMode === 'public'
              ? 'bg-[#7A284B] text-white shadow-xs'
              : 'text-white/40 hover:text-white/80'
          }`}
        >
          <span className="sm:hidden">Website</span>
          <span className="hidden sm:inline">Public Website</span>
        </button>

        <button
          onClick={() => setViewMode('management')}
          className={`px-2.5 sm:px-3.5 py-1 rounded-xs text-[10px] sm:text-[11px] font-medium tracking-wide transition-all cursor-pointer whitespace-nowrap ${
            viewMode === 'management'
              ? 'bg-[#7A284B] text-white shadow-xs'
              : 'text-white/40 hover:text-white/80'
          }`}
        >
          <span className="sm:hidden">Portal</span>
          <span className="hidden sm:inline">Management Portal</span>
        </button>

        <span className="text-white/15 mx-0.5 sm:mx-1">|</span>

        <button
          onClick={resetDemoData}
          className="flex items-center gap-1 px-1.5 py-1 text-white/40 hover:text-white/80 transition-colors cursor-pointer"
          title="Reset Demo Sample Data"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline text-[10px] sm:text-[11px]">Reset</span>
        </button>
      </div>

    </div>
  );
};
