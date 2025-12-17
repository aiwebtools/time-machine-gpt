import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { createTimePortalEffect } from '@/utils/timeEffects';
import { ChevronDown, ExternalLink } from 'lucide-react';
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
  imageTravelerUrl,
  historyGptUrl,
  timeMachineUrl,
  bookWriterUrl,
  storyWriterUrl
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const tools = [
    { name: 'Native American History', onClick: handleNativeAmericanHistoryClick },
    { name: 'Black History Matters', onClick: handleBlackHistoryClick },
    { name: 'Talk to History GPT', onClick: handleHistoryGptClick },
    { name: 'Unwritten History GPT', onClick: handleStoryWriterClick },
  ];

  return (
    <nav className="hidden lg:flex items-center justify-end gap-3">
      {/* Tools Dropdown */}
      <div className="relative">
        <Button
          variant="ghost"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
          className={cn(
            "gap-1.5 font-medium transition-all",
            isScrolled 
              ? "text-time-dark hover:bg-time-dark/10" 
              : "text-white hover:bg-white/10"
          )}
        >
          Time Machines
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform",
            isDropdownOpen && "rotate-180"
          )} />
        </Button>
        
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-56 rounded-lg border border-time-accent/20 bg-time-dark/95 backdrop-blur-md shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {tools.map((tool, index) => (
              <button
                key={index}
                onClick={tool.onClick}
                className="w-full px-4 py-2.5 text-left text-sm text-white/90 hover:bg-time-accent/20 hover:text-time-accent transition-colors flex items-center justify-between group"
              >
                {tool.name}
                <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Original Time Machine - Primary CTA */}
      <Button
        onClick={handleTimeMachineClick}
        className={cn(
          "font-semibold transition-all relative overflow-hidden group",
          "bg-gradient-to-r from-time-dark to-time-dark/90",
          "border border-time-accent/50 hover:border-time-accent",
          "text-time-accent hover:text-time-accent",
          "shadow-lg hover:shadow-time-accent/20"
        )}
      >
        <span className="relative z-10">Original Time Machine</span>
        <span className="absolute inset-0 bg-gradient-to-r from-time-accent/0 via-time-accent/10 to-time-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      </Button>

      {/* More AI Tools - Accent CTA */}
      <Button
        asChild
        className={cn(
          "font-semibold transition-all",
          "bg-time-accent hover:bg-time-accent/90",
          "text-time-dark",
          "shadow-lg hover:shadow-xl",
          "btn-glow"
        )}
      >
        <a 
          href="https://aiwebtools.lovable.app/?via=aiwebtools" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          More AI Tools
          <ExternalLink className="h-4 w-4" />
        </a>
      </Button>
    </nav>
  );
};

export default DesktopNav;
