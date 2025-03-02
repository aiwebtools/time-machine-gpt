
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TimePortalProps {
  onStartJourney: (destination: string, date: string) => void;
  className?: string;
}

const TimePortal: React.FC<TimePortalProps> = ({ onStartJourney, className }) => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [portalActive, setPortalActive] = useState(false);
  
  useEffect(() => {
    setIsReady(destination.trim() !== '' && date.trim() !== '');
  }, [destination, date]);
  
  const handleStartJourney = () => {
    if (!isReady) return;
    
    setPortalActive(true);
    
    // Simulate portal activation
    setTimeout(() => {
      onStartJourney(destination, date);
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
        <h3 className="text-2xl md:text-3xl font-serif text-white text-center mb-6">
          Configure Your Journey
        </h3>
        
        <div className="space-y-6 max-w-md mx-auto">
          <div className="space-y-2">
            <label htmlFor="destination" className="block text-sm text-white/80">
              Where would you like to go?
            </label>
            <input
              id="destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Ancient Rome, Medieval Paris, etc."
              className="w-full px-4 py-3 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-time-accent/50"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm text-white/80">
              What time period?
            </label>
            <input
              id="date"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="44 BCE, 1692, 1920s, etc."
              className="w-full px-4 py-3 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-time-accent/50"
            />
          </div>
          
          <button
            onClick={handleStartJourney}
            disabled={!isReady || portalActive}
            className={cn(
              "w-full py-3 rounded-md transition-all duration-300 relative overflow-hidden",
              "font-medium text-white mt-2",
              isReady && !portalActive 
                ? "bg-time-accent hover:bg-time-accent/90 cursor-pointer" 
                : "bg-gray-500/50 cursor-not-allowed"
            )}
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
