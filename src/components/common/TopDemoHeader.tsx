import React from 'react';
import { useStore } from '../../store/useStore';
import { Sparkles, RotateCcw } from 'lucide-react';

export const TopDemoHeader: React.FC = () => {
  const { viewMode, setViewMode, resetDemoData } = useStore();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#1C1820] text-white h-[37px] flex items-center justify-between px-5 text-[11px]">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-[#C49A45] font-medium tracking-wider uppercase">
          <Sparkles className="w-3 h-3" />
          Client Demo
        </span>
        <span className="text-white/30">·</span>
        <span className="text-white/40 font-light">STAR Convention Hall, Pernambut</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setViewMode('public')}
          className={`px-3.5 py-1 rounded-sm text-[11px] font-medium tracking-wide transition-all ${
            viewMode === 'public'
              ? 'bg-[#7A284B] text-white shadow-sm'
              : 'text-white/40 hover:text-white/70'
          }`}
        >
          Public Website
        </button>
        <button
          onClick={() => setViewMode('management')}
          className={`px-3.5 py-1 rounded-sm text-[11px] font-medium tracking-wide transition-all ${
            viewMode === 'management'
              ? 'bg-[#7A284B] text-white shadow-sm'
              : 'text-white/40 hover:text-white/70'
          }`}
        >
          Management Portal
        </button>
        <span className="text-white/10 mx-2">|</span>
        <button
          onClick={resetDemoData}
          className="flex items-center gap-1 text-white/30 hover:text-white/60 transition-colors"
          title="Reset Demo Sample Data"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>
    </div>
  );
};
