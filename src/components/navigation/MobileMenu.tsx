
import React from 'react';
import { cn } from '@/lib/utils';
import { createTimePortalEffect } from '@/utils/timeEffects';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  imageTravelerUrl: string;
  historyGptUrl: string;
  timeMachineUrl: string;
  bookWriterUrl: string;
  storyWriterUrl: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  imageTravelerUrl,
  historyGptUrl,
  timeMachineUrl,
  bookWriterUrl,
  storyWriterUrl
}) => {
  const handleTimeMachineClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    window.open(timeMachineUrl, '_blank', 'noopener,noreferrer');
    createTimePortalEffect(timeMachineUrl);
  };

  const handleHistoryGptClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    window.open(historyGptUrl, '_blank', 'noopener,noreferrer');
    createTimePortalEffect(historyGptUrl);
  };

const handleImageTravelerClick = (e: React.MouseEvent) => {
  e.preventDefault();
  setIsMenuOpen(false);
  window.open(imageTravelerUrl, '_blank', 'noopener,noreferrer');
  createTimePortalEffect(imageTravelerUrl);
};

const handleStoryWriterClick = (e: React.MouseEvent) => {
  e.preventDefault();
  setIsMenuOpen(false);
  window.open(storyWriterUrl, '_blank', 'noopener,noreferrer');
  createTimePortalEffect(storyWriterUrl);
};

const handleBookWriterClick = (e: React.MouseEvent) => {
  e.preventDefault();
  setIsMenuOpen(false);
  window.open(bookWriterUrl, '_blank', 'noopener,noreferrer');
  createTimePortalEffect(bookWriterUrl);
};

const handleNativeAmericanHistoryClick = (e: React.MouseEvent) => {
  e.preventDefault();
  setIsMenuOpen(false);
  window.open('https://nativeamerican-timemachine.lovable.app/?via=aiwebtools', '_blank', 'noopener,noreferrer');
  createTimePortalEffect('https://nativeamerican-timemachine.lovable.app/?via=aiwebtools');
};

  return (
    <div className={cn(
      "lg:hidden absolute w-full left-0 shadow-lg",
      "bg-gradient-to-b from-time-dark/98 to-time-dark/95 backdrop-blur-md rounded-b-xl",
      "transition-all duration-300 ease-in-out border-t border-time-accent/20",
      isMenuOpen ? "opacity-100 top-full max-h-[80vh] overflow-y-auto py-4 px-5" : "opacity-0 -top-40 pointer-events-none max-h-0"
    )}>
      <nav className="flex flex-col space-y-4 text-gray-100">
        <div className="pt-2 space-y-3">
          <a 
            href="https://nativeamerican-timemachine.lovable.app/?via=aiwebtools" 
            onClick={handleNativeAmericanHistoryClick}
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full flex items-center justify-center py-3 bg-time-dark/90 text-white rounded-lg shadow-md hover:bg-time-dark transition-all transform hover:translate-y-[-2px]"
          >
            <span>NATIVE AMERICAN HISTORY TIME MACHINE</span>
          </a>
          
          <a 
            href="https://blackhistorymattersgpt.lovable.app/?via=aiwebtools" 
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              window.open('https://blackhistorymattersgpt.lovable.app/?via=aiwebtools', '_blank', 'noopener,noreferrer');
              createTimePortalEffect('https://blackhistorymattersgpt.lovable.app/?via=aiwebtools');
            }}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center py-3 bg-time-dark/90 text-white rounded-lg shadow-md hover:bg-time-dark transition-all transform hover:translate-y-[-2px]"
          >
            <span>BLACK HISTORY MATTERS TIME MACHINE</span>
          </a>
          
          <a 
            href={historyGptUrl} 
            onClick={handleHistoryGptClick}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center py-3 bg-time-dark/90 text-white rounded-lg shadow-md hover:bg-time-dark transition-all transform hover:translate-y-[-2px]"
          >
            <span>TALK TO HISTORY GPT</span>
          </a>

          <a 
            href={storyWriterUrl} 
            onClick={handleStoryWriterClick}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center py-3 bg-time-dark/90 text-white rounded-lg shadow-md hover:bg-time-dark transition-all transform hover:translate-y-[-2px]"
          >
            <span>TIME MACHINE OF UNWRITTEN HISTORY GPT</span>
          </a>

          <a 
            href={timeMachineUrl} 
            onClick={handleTimeMachineClick}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center py-3 rounded-lg shadow-md transition-all relative overflow-hidden group transform hover:translate-y-[-2px]" 
          >
            <span className="relative z-10 text-time-accent font-medium">THE ORIGINAL TIME MACHINE GPT</span>
            <span className="absolute inset-0 bg-gradient-to-r from-time-dark to-time-dark/90 opacity-100 group-hover:opacity-90 transition-opacity duration-300"></span>
          </a>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700/30">
          <a 
            href="https://aiwebtools.lovable.app/?via=aiwebtools" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full py-3 px-4 rounded-lg transition-all flex items-center justify-between text-time-dark bg-time-accent hover:bg-time-accent/90 btn-glow"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>MORE AI TOOLS</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7h10v10M7 17 17 7"/>
            </svg>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
