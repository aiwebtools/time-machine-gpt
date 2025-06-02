
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const DisclaimerPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if user has already seen the disclaimer
    const hasSeenDisclaimer = localStorage.getItem('hasSeenDisclaimer');
    
    if (!hasSeenDisclaimer) {
      // Show popup with a slight delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleAccept = () => {
    localStorage.setItem('hasSeenDisclaimer', 'true');
    setIsVisible(false);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={cn(
        "relative bg-gradient-to-br from-time-dark via-time-medium to-time-dark",
        "p-4 rounded-xl shadow-2xl max-w-sm w-full",
        "border border-time-accent/30 text-white"
      )}>
        <button 
          onClick={handleAccept}
          className="absolute top-2 right-2 text-gray-300 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        
        <div className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-center animate-text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-time-accent via-white to-time-accent bg-[length:200%_auto]">
            Time Travel Disclaimer
          </h2>
          
          <div className="space-y-2 text-sm">
            <p>
              Welcome to <span className="text-time-accent font-medium">Time Machine GPT</span> - your portal to history.
            </p>
            
            <div className="bg-time-accent/10 border border-time-accent/30 rounded-lg p-2">
              <p className="text-xs">
                <span className="font-medium text-time-accent">ChatGPT Plus:</span> Unlimited access
                <br />
                <span className="font-medium text-gray-300">Free accounts:</span> Limited use
              </p>
            </div>
            
            <p className="text-xs">
              AI-generated historical narratives for educational entertainment. 
              <a 
                href="https://aiwebtools.lovable.app/disclaimers" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-time-accent hover:underline ml-1"
              >
                Full terms here.
              </a>
            </p>
          </div>
          
          <div className="flex justify-center pt-2">
            <button
              onClick={handleAccept}
              className={cn(
                "btn-glow px-4 py-2 rounded-md text-sm font-medium transition-all duration-300",
                "bg-time-accent hover:bg-time-accent/90 text-white",
                "border border-time-accent/50 hover:border-time-accent",
                "hover:scale-105"
              )}
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPopup;
