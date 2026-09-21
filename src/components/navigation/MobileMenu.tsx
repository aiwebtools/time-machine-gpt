
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { timeMachines } from '@/data/timeMachines';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <div className={cn(
      "md:hidden absolute w-full left-0 shadow-xl",
      "bg-time-dark border-t border-time-accent/20 rounded-b-xl",
      "transition-all duration-300 ease-in-out",
      isMenuOpen ? "opacity-100 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto py-4 pb-[max(1rem,env(safe-area-inset-bottom))] px-4" : "opacity-0 -top-40 pointer-events-none max-h-0"
    )}>
      <nav className="flex flex-col space-y-4 text-gray-100">
        <div className="pt-2 space-y-3">
          {timeMachines.map((machine) => (
            <Link
              key={machine.id}
              to={machine.path}
              onClick={() => setIsMenuOpen(false)}
              className="w-full min-h-12 flex items-center justify-center px-3 py-3 text-center rounded-lg shadow-md border border-time-accent/35 text-foreground bg-time-dark/90 hover:bg-time-accent/10 hover:text-time-accent transition-all"
            >
              <span>{machine.name.toUpperCase()}</span>
            </Link>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700/30">
          <a 
            href="https://aiwebtools.lovable.app/?via=aiwebtools" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full py-3 px-4 rounded-lg transition-all flex items-center justify-between text-time-dark bg-time-accent hover:bg-time-accent/90 btn-glow"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>MORE AI TOOLS</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7h10v10M7 17 17 7"/>
            </svg>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
