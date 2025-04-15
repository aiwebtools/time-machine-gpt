
import React from 'react';
import { cn } from '@/lib/utils';
import NavItem from './NavItem';
import { Button } from '../ui/button';
import { createTimePortalEffect } from '@/utils/timeEffects';

interface DesktopNavProps {
  scrollPosition: number;
  imageTravelerUrl: string;
  historyGptUrl: string;
  timeMachineUrl: string;
  bookWriterUrl: string;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  scrollPosition,
  imageTravelerUrl,
  historyGptUrl,
  timeMachineUrl,
  bookWriterUrl
}) => {
  const handleTimeMachineClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(timeMachineUrl);
  };

  const handleBookWriterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(bookWriterUrl);
  };

  const handleHistoryGptClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(historyGptUrl);
  };

  const handleImageTravelerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(imageTravelerUrl);
  };

  return (
    <nav className="hidden md:flex items-center space-x-4">
      <NavItem to="/" label="Home" isScrolled={scrollPosition > 50} />
      <div className="flex items-center space-x-2">
        <a 
          href="https://nativeamerican-timemachine.lovable.app/?via=aiwebtools" 
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
          href={imageTravelerUrl} 
          onClick={handleImageTravelerClick}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm transition-all",
            "border border-time-dark",
            "bg-time-dark hover:bg-time-dark/90",
            "text-white font-medium"
          )}
        >
          IMAGINATION TRAVELER GPT
        </a>
        <a 
          href={historyGptUrl} 
          onClick={handleHistoryGptClick}
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
          href={bookWriterUrl}
          onClick={handleBookWriterClick}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm transition-all",
            "border border-time-dark",
            "bg-time-dark hover:bg-time-dark/90",
            "text-white font-medium"
          )}
        >
          INTERACTIVE TIME MACHINE BOOK WRITER
        </a>
        <a 
          href={timeMachineUrl} 
          onClick={handleTimeMachineClick}
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
          href="https://www.aiwebtools.ai" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={cn(
            "text-sm font-medium transition-colors hover:text-time-accent", 
            scrollPosition > 50 ? "text-time-dark" : "text-time-accent"
          )}
        >
          MORE AI TOOLS
        </a>
      </div>
    </nav>
  );
};

export default DesktopNav;
