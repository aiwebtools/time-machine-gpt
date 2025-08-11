
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
  storyWriterUrl
}) => {
  const handleTimeMachineClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    createTimePortalEffect(timeMachineUrl);
  };

  const handleHistoryGptClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    createTimePortalEffect(historyGptUrl);
  };

const handleImageTravelerClick = (e: React.MouseEvent) => {
  e.preventDefault();
  setIsMenuOpen(false);
  createTimePortalEffect(imageTravelerUrl);
};

const handleStoryWriterClick = (e: React.MouseEvent) => {
  e.preventDefault();
  setIsMenuOpen(false);
  createTimePortalEffect(storyWriterUrl);
};

const handleNativeAmericanHistoryClick = (e: React.MouseEvent) => {
  e.preventDefault();
  setIsMenuOpen(false);
  createTimePortalEffect('https://nativeamerican-timemachine.lovable.app/?via=aiwebtools');
};

  return (
    <div className={cn(
      "md:hidden absolute w-full left-0 shadow-lg",
      "bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-b-xl",
      "transition-all duration-300 ease-in-out border-t border-gray-700/50",
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
            href={imageTravelerUrl} 
            onClick={handleImageTravelerClick}
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
            <span>INTERACTIVE STORY WRITER V9</span>
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
            href="https://www.aiwebtools.ai" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full py-3 px-4 rounded-lg transition-colors flex items-center justify-between text-gray-200 hover:bg-gray-700/30"
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
