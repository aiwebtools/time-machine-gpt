
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLogoProps {
  scrollPosition: number;
}

const NavLogo: React.FC<NavLogoProps> = ({ scrollPosition }) => {
  return (
    <Link to="/" className="flex items-center">
      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-time-accent mr-2 flex-shrink-0">
        <div className="absolute inset-0 bg-time-medium animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full border-2 border-time-accent relative animate-clock-spin-slow">
            <div className="clock-hand hour-hand"></div>
            <div className="clock-hand minute-hand"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start max-w-[150px]">
        <span className={cn(
          "font-serif text-xs sm:text-sm md:text-lg font-medium transition-colors leading-tight whitespace-nowrap text-ellipsis overflow-hidden navbar-title", 
          scrollPosition > 50 ? "text-time-dark" : "text-time-accent font-bold"
        )}>
          TIME MACHINE GPT
        </span>
        <span className={cn(
          "text-[7px] sm:text-[8px] md:text-[10px] font-medium transition-colors text-left", 
          scrollPosition > 50 ? "text-time-dark/70" : "text-time-accent/90"
        )}>
          Presented by AiWebTools.Ai
        </span>
      </div>
    </Link>
  );
};

export default NavLogo;
