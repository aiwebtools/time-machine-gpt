import React from 'react';
import { cn } from '@/lib/utils';
import { createTimePortalEffect } from '@/utils/timeEffects';

interface DesktopNavProps {
  scrollPosition: number;
  imageTravelerUrl: string;
  historyGptUrl: string;
  timeMachineUrl: string;
  bookWriterUrl: string;
  storyWriterUrl: string;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  scrollPosition,
  imageTravelerUrl,
  historyGptUrl,
  timeMachineUrl,
  bookWriterUrl,
  storyWriterUrl
}) => {
  const handleTimeMachineClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(timeMachineUrl, '_blank', 'noopener,noreferrer');
    createTimePortalEffect(timeMachineUrl);
  };

  const handleHistoryGptClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(historyGptUrl, '_blank', 'noopener,noreferrer');
    createTimePortalEffect(historyGptUrl);
  };

const handleImageTravelerClick = (e: React.MouseEvent) => {
  e.preventDefault();
  window.open(imageTravelerUrl, '_blank', 'noopener,noreferrer');
  createTimePortalEffect(imageTravelerUrl);
};

const handleStoryWriterClick = (e: React.MouseEvent) => {
  e.preventDefault();
  window.open(storyWriterUrl, '_blank', 'noopener,noreferrer');
  createTimePortalEffect(storyWriterUrl);
};

const handleBookWriterClick = (e: React.MouseEvent) => {
  e.preventDefault();
  window.open(bookWriterUrl, '_blank', 'noopener,noreferrer');
  createTimePortalEffect(bookWriterUrl);
};

const handleNativeAmericanHistoryClick = (e: React.MouseEvent) => {
  e.preventDefault();
  window.open('https://nativeamerican-timemachine.lovable.app/?via=aiwebtools', '_blank', 'noopener,noreferrer');
  createTimePortalEffect('https://nativeamerican-timemachine.lovable.app/?via=aiwebtools');
};

  return (
    <nav className="hidden md:flex items-center space-x-4 ml-8">
      <div className="flex items-center space-x-2">
        <a 
          href="https://nativeamerican-timemachine.lovable.app/?via=aiwebtools" 
          onClick={handleNativeAmericanHistoryClick}
          target="_blank" 
          rel="noopener noreferrer" 
          className={cn(
            "px-3 py-1.5 rounded-full text-sm transition-all",
            "border border-time-dark",
            "bg-time-dark hover:bg-time-dark/90",
            "text-white font-medium"
          )}
        >
          NATIVE AMERICAN HISTORY TIME MACHINE
        </a>
        <a 
          href="https://blackhistorymattersgpt.lovable.app/?via=aiwebtools" 
          onClick={(e) => {
            e.preventDefault();
            window.open('https://blackhistorymattersgpt.lovable.app/?via=aiwebtools', '_blank', 'noopener,noreferrer');
            createTimePortalEffect('https://blackhistorymattersgpt.lovable.app/?via=aiwebtools');
          }}
          target="_blank" 
          rel="noopener noreferrer"
          className={cn(
            "px-3 py-1.5 rounded-full text-sm transition-all",
            "border border-time-dark",
            "bg-time-dark hover:bg-time-dark/90",
            "text-white font-medium"
          )}
        >
          BLACK HISTORY MATTERS TIME MACHINE
        </a>
        <a 
          href={historyGptUrl} 
          onClick={handleHistoryGptClick}
          target="_blank" 
          rel="noopener noreferrer"
          className={cn(
            "px-3 py-1.5 rounded-full text-sm transition-all",
            "border border-time-dark",
            "bg-time-dark hover:bg-time-dark/90",
            "text-white font-medium"
          )}
        >
          TALK TO HISTORY GPT
        </a>
      <a 
        href={storyWriterUrl} 
        onClick={handleStoryWriterClick}
        target="_blank" 
        rel="noopener noreferrer"
        className={cn(
          "px-3 py-1.5 rounded-full text-sm transition-all",
          "border border-time-dark",
          "bg-time-dark hover:bg-time-dark/90",
          "text-white font-medium"
        )}
      >
        TIME MACHINE OF UNWRITTEN HISTORY GPT
      </a>
      <a 
        href={timeMachineUrl} 
        onClick={handleTimeMachineClick}
        target="_blank" 
        rel="noopener noreferrer"
        className={cn(
          "px-3 py-1.5 rounded-full text-sm transition-all",
          "border border-time-accent",
          "bg-time-dark hover:bg-time-dark/90",
          "text-time-accent font-medium hover:text-time-accent/80",
          "btn-glow relative overflow-hidden group"
        )}
      >
        <span className="relative z-10">THE ORIGINAL TIME MACHINE GPT</span>
        <span className="absolute inset-0 bg-gradient-to-r from-time-dark to-time-dark/80 opacity-100 group-hover:opacity-90 transition-opacity duration-300"></span>
      </a>
      </div>
      <div className="ml-auto">
        <a 
          href="https://aiwebtools.lovable.app/?via=aiwebtools" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-semibold transition-all",
            "border border-time-accent",
            "bg-time-accent/90 text-time-dark hover:bg-time-accent",
            "btn-glow"
          )}
        >
          MORE AI TOOLS
        </a>
      </div>
    </nav>
  );
};

export default DesktopNav;
