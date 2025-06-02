
import React from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const InformationalDisclaimer: React.FC = () => {
  return (
    <div className={cn(
      "bg-gradient-to-r from-time-dark/90 via-time-accent/20 to-time-dark/90",
      "border-2 border-time-accent/40 rounded-lg p-4 mx-4 mb-6",
      "flex items-center gap-3 text-sm text-white shadow-2xl",
      "backdrop-blur-md bg-opacity-80",
      "animate-glow relative overflow-hidden"
    )}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-time-accent/10 to-transparent animate-shimmer"></div>
      <Info size={16} className="text-time-accent flex-shrink-0 animate-pulse" />
      <p className="text-center flex-1 font-medium relative z-10">
        For informational, educational, and research purposes only.
      </p>
    </div>
  );
};

export default InformationalDisclaimer;
