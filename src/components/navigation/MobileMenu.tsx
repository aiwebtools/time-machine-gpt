
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
      "md:hidden absolute w-full left-0 shadow-lg",
      "bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-b-xl",
      "transition-all duration-300 ease-in-out border-t border-gray-700/50",
      isMenuOpen ? "opacity-100 top-full max-h-[80vh] overflow-y-auto py-4 px-5" : "opacity-0 -top-40 pointer-events-none max-h-0"
    )}>
      <nav className="flex flex-col space-y-4 text-gray-100">
        <MobileNavItem to="/" label="Home" onClick={() => setIsMenuOpen(false)} />
        <MobileNavItem to="/about" label="About" onClick={() => setIsMenuOpen(false)} />
        
        <a 
          href="https://www.aiwebtools.ai" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full py-3 px-4 rounded-lg transition-colors flex items-center justify-between text-gray-200 hover:bg-gray-700/30"
          onClick={() => setIsMenuOpen(false)}
        >
          <span>More AI Tools</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 7h10v10M7 17 17 7"/>
          </svg>
        </a>
        
        <div className="pt-2 space-y-3">
          <a 
            href={imageTravelerUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full flex items-center justify-center py-3 bg-time-dark/90 text-white rounded-lg shadow-md hover:bg-time-dark transition-all transform hover:translate-y-[-2px]" 
            onClick={() => setIsMenuOpen(false)}
          >
            <span>IMAGINATION TRAVELER GPT</span>
          </a>
          
          <a 
            href={historyGptUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full flex items-center justify-center py-3 bg-time-dark/90 text-white rounded-lg shadow-md hover:bg-time-dark transition-all transform hover:translate-y-[-2px]" 
            onClick={() => setIsMenuOpen(false)}
          >
            <span>TALK TO HISTORY GPT</span>
          </a>
          
          <a 
            href={timeMachineUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full flex items-center justify-center py-3 rounded-lg shadow-md transition-all relative overflow-hidden group transform hover:translate-y-[-2px]" 
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="relative z-10 text-time-accent font-medium">TIME MACHINE GPT</span>
            <span className="absolute inset-0 bg-gradient-to-r from-time-dark to-time-dark/90 opacity-100 group-hover:opacity-90 transition-opacity duration-300"></span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
