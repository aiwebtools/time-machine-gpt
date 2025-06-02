
import React from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const InformationalDisclaimer: React.FC = () => {
  return (
    <div className={cn(
      "bg-time-dark/80 border border-time-accent/20 rounded-lg p-3 mx-4 mb-4",
      "flex items-center gap-2 text-xs text-gray-300"
    )}>
      <Info size={14} className="text-time-accent flex-shrink-0" />
      <p className="text-center flex-1">
        For informational, educational, and research purposes only.
      </p>
    </div>
  );
};

export default InformationalDisclaimer;
