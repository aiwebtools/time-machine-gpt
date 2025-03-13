
import React from 'react';
import { cn } from '@/lib/utils';
import NavItem from './NavItem';

interface DesktopNavProps {
  scrollPosition: number;
  imageTravelerUrl: string;
  historyGptUrl: string;
  timeMachineUrl: string;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  scrollPosition,
  imageTravelerUrl,
  historyGptUrl,
  timeMachineUrl
}) => {
  return (
    <nav className="hidden md:flex items-center space-x-4">
      <NavItem to="/" label="Home" isScrolled={scrollPosition > 50} />
      <NavItem to="/about" label="About" isScrolled={scrollPosition > 50} />
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
      <div className="flex items-center space-x-2">
        <a 
          href={imageTravelerUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
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
          href={timeMachineUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={cn(
            "px-3 py-1.5 rounded-full text-sm transition-all",
            "border border-time-dark",
            "bg-time-dark hover:bg-time-dark/90",
            "text-white font-medium"
          )}
        >
          TIME MACHINE GPT
        </a>
      </div>
    </nav>
  );
};

export default DesktopNav;
