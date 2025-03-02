
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TimePortalProps {
  onStartJourney: (destination: string, date: string) => void;
  timeDestinationUrl: string;
  className?: string;
}

const TimePortal: React.FC<TimePortalProps> = ({ onStartJourney, timeDestinationUrl, className }) => {
  const [portalActive, setPortalActive] = useState(false);
  
  const handleStartJourney = () => {
    // Set default values since we no longer have input fields
    const destination = "Time Machine Experience";
    const date = "Present Day";
    
    setPortalActive(true);
    
    // Simulate portal activation
    setTimeout(() => {
      onStartJourney(destination, date);
      
      // Open the AI tool URL in a new window
      window.open(timeDestinationUrl, '_blank');
      
      setPortalActive(false);
    }, 3000);
  };
  
  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl",
      "border border-time-accent/30",
      "glass-effect",
      portalActive && "animate-glow",
      className
    )}>
      <div className="absolute inset-0 time-portal-bg opacity-70"></div>
      
      {/* Animated backgrounds */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNDAlIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMTk0LCAxNjAsIDExMCwgMC4yKSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSI1LDMiLz48L3N2Zz4=')] opacity-50"></div>
      
      <div className={cn(
        "absolute left-1/2 top-1/2 w-60 h-60 -translate-x-1/2 -translate-y-1/2 rounded-full",
        "border border-time-accent/30",
        "transition-all duration-700 ease-in-out",
        portalActive ? "opacity-100 scale-[3]" : "opacity-30 scale-100"
      )}>
        <div className="absolute inset-0 bg-time-medium opacity-30 rounded-full"></div>
        <div className="w-full h-full animate-clock-spin">
          <div className="w-1 h-full absolute left-1/2 -translate-x-1/2 bg-gradient-to-b from-transparent via-time-accent/40 to-transparent"></div>
          <div className="h-1 w-full absolute top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-time-accent/40 to-transparent"></div>
        </div>
      </div>
      
      <div className="relative z-10 p-8">
        {/* Significantly increased video size container */}
        <div className="w-full mx-auto">
          {/* Much larger video size with taller aspect ratio */}
          <div className="aspect-[16/9] w-full max-w-[1200px] mx-auto">
            <iframe 
              className="w-full h-full rounded-md shadow-lg"
              src="https://www.youtube.com/embed/e5YDEFZQ0uA" 
              title="Time Machine Experience"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
        
        <div className="space-y-6 max-w-md mx-auto mt-6">
          <button
            onClick={handleStartJourney}
            className="w-full py-3 rounded-md transition-all duration-300 relative overflow-hidden
              font-medium text-white mt-2 bg-time-accent hover:bg-time-accent/90 cursor-pointer"
          >
            <span className={cn(
              "absolute inset-0 flex items-center justify-center",
              portalActive ? "opacity-100" : "opacity-0"
            )}>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Initializing Time Portal...
            </span>
            <span className={cn(
              "absolute inset-0 flex items-center justify-center",
              portalActive ? "opacity-0" : "opacity-100"
            )}>
              Begin Time Travel
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePortal;
