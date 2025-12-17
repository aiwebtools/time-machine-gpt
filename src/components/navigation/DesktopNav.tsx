import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { createTimePortalEffect } from '@/utils/timeEffects';
import { ExternalLink, ChevronDown } from 'lucide-react';
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTimeMachineClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(timeMachineUrl, '_blank', 'noopener,noreferrer');
    createTimePortalEffect(timeMachineUrl);
  };

  const handleHistoryGptClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    window.open(historyGptUrl, '_blank', 'noopener,noreferrer');
    createTimePortalEffect(historyGptUrl);
  };

  const handleStoryWriterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    window.open(storyWriterUrl, '_blank', 'noopener,noreferrer');
    createTimePortalEffect(storyWriterUrl);
  };

  const handleNativeAmericanHistoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    window.open('https://nativeamerican-timemachine.lovable.app/?via=aiwebtools', '_blank', 'noopener,noreferrer');
    createTimePortalEffect('https://nativeamerican-timemachine.lovable.app/?via=aiwebtools');
  };

  const handleBlackHistoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    window.open('https://blackhistorymattersgpt.lovable.app/?via=aiwebtools', '_blank', 'noopener,noreferrer');
    createTimePortalEffect('https://blackhistorymattersgpt.lovable.app/?via=aiwebtools');
  };

  const isScrolled = scrollPosition > 50;

  const tools = [
    { name: 'Native American History Time Machine', onClick: handleNativeAmericanHistoryClick },
    { name: 'Black History Matters Time Machine', onClick: handleBlackHistoryClick },
    { name: 'Talk to History GPT', onClick: handleHistoryGptClick },
    { name: 'Time Machine of Unwritten History GPT', onClick: handleStoryWriterClick },
  ];

  return (
    <nav className="hidden md:flex items-center gap-3">
      {/* Dropdown for Time Machine Tools */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all",
            "bg-time-dark/90 text-time-accent border border-time-accent/50",
            "hover:border-time-accent hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]",
            "shadow-[0_0_10px_rgba(212,175,55,0.2)]"
          )}
        >
          Explore Time Machines
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform duration-200",
            isDropdownOpen && "rotate-180"
          )} />
        </button>
        
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-80 rounded-xl border border-time-accent/30 bg-time-dark shadow-[0_10px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(212,175,55,0.2)] z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {tools.map((tool, index) => (
              <button
                key={index}
                onClick={tool.onClick}
                className="w-full px-4 py-3 text-left text-sm text-white/90 hover:bg-time-accent/20 hover:text-time-accent transition-colors flex items-center justify-between group"
              >
                <span className="font-medium">{tool.name}</span>
                <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-time-accent" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Primary CTA - The Original Time Machine GPT */}
      <Button
        onClick={handleTimeMachineClick}
        className={cn(
          "font-semibold text-sm px-5 py-2.5 h-auto",
          "bg-gradient-to-b from-time-dark via-time-dark to-time-dark/90",
          "border-2 border-time-accent text-time-accent",
          "shadow-[0_0_20px_rgba(212,175,55,0.4),0_4px_15px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]",
          "hover:shadow-[0_0_30px_rgba(212,175,55,0.6),0_6px_20px_rgba(0,0,0,0.4)]",
          "hover:scale-[1.02] transition-all duration-300",
          "relative overflow-hidden"
        )}
      >
        <span className="relative z-10">The Original Time Machine GPT</span>
        <span className="absolute inset-0 bg-gradient-to-r from-time-accent/0 via-time-accent/10 to-time-accent/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
      </Button>

      {/* Secondary CTA - More AI Tools */}
      <Button
        asChild
        className={cn(
          "font-bold text-sm px-5 py-2.5 h-auto",
          "bg-gradient-to-b from-time-accent via-time-accent to-time-accent/90",
          "text-time-dark border border-time-accent",
          "shadow-[0_0_25px_rgba(212,175,55,0.5),0_4px_15px_rgba(0,0,0,0.3)]",
          "hover:shadow-[0_0_35px_rgba(212,175,55,0.7),0_6px_20px_rgba(0,0,0,0.4)]",
          "hover:scale-[1.02] transition-all duration-300"
        )}
      >
        <a 
          href="https://aiwebtools.lovable.app/?via=aiwebtools" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          More AI Tools
          <ExternalLink className="h-4 w-4 ml-1.5" />
        </a>
      </Button>
    </nav>
  );
};

export default DesktopNav;
