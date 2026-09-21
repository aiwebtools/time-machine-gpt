import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ExternalLink, ChevronDown, Clock3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { timeMachines, externalVersionLabel } from '@/data/timeMachines';

interface DesktopNavProps {
  scrollPosition: number;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  scrollPosition,
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

  return (
    <nav className="hidden md:flex items-center gap-3">
      {/* Dropdown for Time Machine Tools */}
      <div className="relative" ref={dropdownRef}>
        <Button
          type="button"
          variant="ghost"
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
        </Button>
        
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-80 rounded-xl border border-time-accent/30 bg-time-dark shadow-[0_10px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(212,175,55,0.2)] z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="px-4 pb-1 pt-2 text-xs font-semibold uppercase text-time-accent/70">(INSITE VERSIONS)</p>
            {timeMachines.map((tool) => (
              <Link
                key={tool.id}
                to={tool.path}
                onClick={() => setIsDropdownOpen(false)}
                className="w-full px-4 py-3 text-left text-sm text-foreground/90 hover:bg-time-accent/20 hover:text-time-accent transition-colors flex items-center justify-between group"
              >
                <span className="font-medium">{tool.name} — (INSITE VERSION)</span>
                <Clock3 className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity text-time-accent" />
              </Link>
            ))}
            <div className="mx-4 my-2 border-t border-time-accent/20" />
            <p className="px-4 pb-1 pt-1 text-xs font-semibold uppercase text-time-accent/70">EXTERNAL VERSIONS (OPEN IN NEW TAB)</p>
            {timeMachines.filter((tool) => tool.externalUrl).map((tool) => (
              <a
                key={`${tool.id}-external`}
                href={tool.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsDropdownOpen(false)}
                className="group flex w-full items-center justify-between px-4 py-3 text-left text-sm text-foreground/90 transition-colors hover:bg-time-accent/20 hover:text-time-accent"
              >
                <span className="font-medium">{tool.name} — {externalVersionLabel(tool.externalPlatform)}</span>
                <ExternalLink className="h-4 w-4 text-time-accent opacity-60 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Primary on-site journey */}
      <Button
        asChild
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
        <Link to="/original-time-machine">Original Time Machine — (INSITE VERSION)</Link>
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
