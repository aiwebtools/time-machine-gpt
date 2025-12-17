import React from 'react';
import { cn } from '@/lib/utils';
import { createTimePortalEffect } from '@/utils/timeEffects';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  historyGptUrl,
  timeMachineUrl,
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

  const handleStoryWriterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(storyWriterUrl, '_blank', 'noopener,noreferrer');
    createTimePortalEffect(storyWriterUrl);
  };

  const handleNativeAmericanHistoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://nativeamerican-timemachine.lovable.app/?via=aiwebtools', '_blank', 'noopener,noreferrer');
    createTimePortalEffect('https://nativeamerican-timemachine.lovable.app/?via=aiwebtools');
  };

  const handleBlackHistoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://blackhistorymattersgpt.lovable.app/?via=aiwebtools', '_blank', 'noopener,noreferrer');
    createTimePortalEffect('https://blackhistorymattersgpt.lovable.app/?via=aiwebtools');
  };

  const isScrolled = scrollPosition > 50;

  const navButtonClass = cn(
    "px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap relative",
    "bg-time-dark/90 text-time-accent border border-time-accent/60",
    "hover:border-time-accent hover:shadow-[0_0_15px_rgba(212,175,55,0.5)]",
    "shadow-[0_0_8px_rgba(212,175,55,0.3)] hover:scale-105",
    "before:absolute before:inset-0 before:rounded-md before:border before:border-time-accent/30",
    "before:animate-[pulse_2s_ease-in-out_infinite]",
    isScrolled && "bg-time-dark"
  );

  return (
    <nav className="hidden md:flex items-center gap-2">
      <button onClick={handleNativeAmericanHistoryClick} className={navButtonClass}>
        Native American
      </button>
      
      <button onClick={handleBlackHistoryClick} className={navButtonClass}>
        Black History
      </button>
      
      <button onClick={handleHistoryGptClick} className={navButtonClass}>
        History GPT
      </button>
      
      <button onClick={handleStoryWriterClick} className={navButtonClass}>
        Unwritten History
      </button>

      <Button
        onClick={handleTimeMachineClick}
        size="sm"
        className={cn(
          "font-semibold text-xs whitespace-nowrap relative overflow-hidden",
          "bg-gradient-to-b from-time-dark to-time-dark/80",
          "border-2 border-time-accent text-time-accent",
          "shadow-[0_0_20px_rgba(212,175,55,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]",
          "hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]",
          "hover:scale-105 transition-all duration-300",
          "after:absolute after:inset-0 after:bg-gradient-to-t after:from-time-accent/10 after:to-transparent"
        )}
      >
        <span className="relative z-10">Original Time Machine</span>
      </Button>

      <Button
        asChild
        size="sm"
        className={cn(
          "font-semibold text-xs whitespace-nowrap",
          "bg-gradient-to-b from-time-accent to-time-accent/80",
          "text-time-dark border border-time-accent",
          "shadow-[0_0_20px_rgba(212,175,55,0.5),0_4px_15px_rgba(0,0,0,0.3)]",
          "hover:shadow-[0_0_30px_rgba(212,175,55,0.7)]",
          "hover:scale-105 transition-all duration-300"
        )}
      >
        <a 
          href="https://aiwebtools.lovable.app/?via=aiwebtools" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          More AI Tools
          <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </Button>
    </nav>
  );
};

export default DesktopNav;
