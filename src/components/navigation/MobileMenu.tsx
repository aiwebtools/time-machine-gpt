
import React from 'react';
import { cn } from '@/lib/utils';
import MobileNavItem from './MobileNavItem';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  imageTravelerUrl: string;
  historyGptUrl: string;
  timeMachineUrl: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  imageTravelerUrl,
  historyGptUrl,
  timeMachineUrl
}) => {
  return (
    <div className={cn(
      "md:hidden absolute w-full left-0 px-4 py-3 shadow-lg",
      "bg-white/95 backdrop-blur-md",
      "transition-all duration-300 ease-in-out",
      isMenuOpen ? "opacity-100 top-full" : "opacity-0 -top-40 pointer-events-none"
    )}>
      <nav className="flex flex-col space-y-3 text-time-dark">
        <MobileNavItem to="/" label="Home" onClick={() => setIsMenuOpen(false)} />
        <MobileNavItem to="/about" label="About" onClick={() => setIsMenuOpen(false)} />
        <a 
          href="https://www.aiwebtools.ai" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full py-2 hover:bg-gray-100 px-2 rounded text-time-dark transition-colors" 
          onClick={() => setIsMenuOpen(false)}
        >
          MORE AI TOOLS
        </a>
        <a 
          href={imageTravelerUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full py-2 text-center bg-time-dark text-white rounded-md hover:bg-time-dark/80 transition-colors" 
          onClick={() => setIsMenuOpen(false)}
        >
          IMAGINATION TRAVELER GPT
        </a>
        <a 
          href={historyGptUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full py-2 text-center bg-time-dark text-white rounded-md hover:bg-time-dark/80 transition-colors" 
          onClick={() => setIsMenuOpen(false)}
        >
          TALK TO HISTORY GPT
        </a>
        <a 
          href={timeMachineUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full py-2 text-center bg-time-dark rounded-md hover:bg-time-dark/90 transition-all relative overflow-hidden group" 
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="relative z-10 text-time-accent font-medium">TIME MACHINE GPT</span>
          <span className="absolute inset-0 bg-gradient-to-r from-time-dark to-time-dark/90 opacity-100 group-hover:opacity-90 transition-opacity duration-300"></span>
        </a>
      </nav>
    </div>
  );
};

export default MobileMenu;
