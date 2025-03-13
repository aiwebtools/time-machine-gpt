
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import NavLogo from './navigation/NavLogo';
import DesktopNav from './navigation/DesktopNav';
import MobileMenu from './navigation/MobileMenu';

const TIME_MACHINE_URL = "https://chatgpt.com/g/g-t8s65Zh0j-time-machine-gpt";
const HISTORY_GPT_URL = "https://talk-to-history-gpt.lovable.app/";
const IMAGINATION_TRAVELER_URL = "https://imaginationtravelergpt.lovable.app/?via=aiwebtools";

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300", 
      scrollPosition > 50 ? "bg-white/80 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <NavLogo scrollPosition={scrollPosition} />
        
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={cn(
              "transition-colors", 
              scrollPosition > 50 ? "text-time-dark" : "text-time-accent"
            )}
          >
            {isMenuOpen ? <path d="M18 6 6 18 M6 6 18 18" /> : <path d="M4 12h16 M4 6h16 M4 18h16" />}
          </svg>
        </button>
        
        <DesktopNav 
          scrollPosition={scrollPosition}
          imageTravelerUrl={IMAGINATION_TRAVELER_URL}
          historyGptUrl={HISTORY_GPT_URL}
          timeMachineUrl={TIME_MACHINE_URL}
        />
      </div>
      
      <MobileMenu 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        imageTravelerUrl={IMAGINATION_TRAVELER_URL}
        historyGptUrl={HISTORY_GPT_URL}
        timeMachineUrl={TIME_MACHINE_URL}
      />
    </header>
  );
};

export default Navbar;
