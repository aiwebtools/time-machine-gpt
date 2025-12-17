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
    "px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap",
    isScrolled 
      ? "bg-time-dark text-white hover:bg-time-dark/90" 
      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
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
          "font-semibold text-xs whitespace-nowrap",
          "bg-time-dark border border-time-accent/50 hover:border-time-accent",
          "text-time-accent hover:bg-time-dark/90"
        )}
      >
        Original Time Machine
      </Button>

      <Button
        asChild
        size="sm"
        className="bg-time-accent hover:bg-time-accent/90 text-time-dark font-semibold text-xs whitespace-nowrap"
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
