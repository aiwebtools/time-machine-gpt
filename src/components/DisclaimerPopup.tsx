
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
        "p-4 md:p-6 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto",
        "border border-time-accent/30 text-white"
      )}>
        <button 
          onClick={handleAccept}
          className="absolute top-3 right-3 text-gray-300 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-center mb-4 animate-text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-time-accent via-white to-time-accent bg-[length:200%_auto]">
            Time Travel Disclaimer
          </h2>
          
          <div className="space-y-3 text-sm md:text-base">
            <p>
              Welcome to <span className="text-time-accent font-medium">Time Machine GPT</span>, your portal to history's most fascinating moments.
            </p>
            
            <div className="bg-time-accent/10 border border-time-accent/30 rounded-lg p-3 mb-4">
              <h3 className="font-bold text-time-accent mb-2">Usage Information:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><span className="font-medium text-time-accent">ChatGPT Plus subscribers:</span> Enjoy unlimited, unrestricted access to Time Machine GPT</li>
                <li><span className="font-medium text-gray-300">Free accounts:</span> Limited interactions every few hours</li>
              </ul>
            </div>
            
            <p>
              By proceeding, you acknowledge that:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>Historical narratives are created using AI and may include creative elements alongside factual information</li>
              <li>This experience is designed for educational entertainment</li>
              <li>For academic research, please consult primary historical sources</li>
            </ul>
            
            <p className="text-xs md:text-sm italic text-gray-300 mt-4">
              Time Machine GPT strives for accuracy but emphasizes immersive storytelling. Enjoy your journey through time!
            </p>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleAccept}
              className={cn(
                "btn-glow px-6 py-3 rounded-md font-medium transition-all duration-300",
                "bg-time-accent hover:bg-time-accent/90 text-white",
                "border border-time-accent/50 hover:border-time-accent",
                "hover:scale-105 hover:shadow-lg shadow-time-accent/30",
                "animate-shimmer bg-[length:200%_auto]",
                "bg-gradient-to-r from-time-accent via-white/10 to-time-accent"
              )}
            >
              I Understand & Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPopup;
