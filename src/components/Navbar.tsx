
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import NavLogo from './navigation/NavLogo';
import DesktopNav from './navigation/DesktopNav';
import MobileMenu from './navigation/MobileMenu';

const TIME_MACHINE_URL = "https://chatgpt.com/g/g-t8s65Zh0j-time-machine-gpt";
const HISTORY_GPT_URL = "https://talk-to-history-gpt.lovable.app/";
const IMAGINATION_TRAVELER_URL = "https://chatgpt.com/g/g-686a172232648191b2fe8d0224e5d997-black-history-matters-time-machine";
const BOOK_WRITER_URL = "https://chatgpt.com/g/g-67fdcb6a97508191bb1926a1cf8a4624-time-machine-interactive-book-writer-v9";
const STORY_WRITER_URL = "https://chatgpt.com/g/g-6942c94dcb08819191863b6d35161f09-time-machine-of-unwritten-history-gpt";

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
      scrollPosition > 50 ? "bg-white/95 backdrop-blur-md shadow-md py-2" : "bg-time-dark/80 backdrop-blur-sm py-3"
    )}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
        <div className="flex-shrink-0 mr-4">
          <NavLogo scrollPosition={scrollPosition} />
        </div>
        
        <button 
          className={cn(
            "lg:hidden p-2.5 rounded-lg transition-all",
            scrollPosition > 50 
              ? "text-time-dark hover:bg-time-dark/10" 
              : "text-time-accent hover:bg-white/10"
          )}
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
          >
            {isMenuOpen ? <path d="M18 6 6 18 M6 6 18 18" /> : <path d="M4 12h16 M4 6h16 M4 18h16" />}
          </svg>
        </button>
        
        <DesktopNav 
          scrollPosition={scrollPosition}
          imageTravelerUrl={IMAGINATION_TRAVELER_URL}
          historyGptUrl={HISTORY_GPT_URL}
          timeMachineUrl={TIME_MACHINE_URL}
          bookWriterUrl={BOOK_WRITER_URL}
          storyWriterUrl={STORY_WRITER_URL}
        />
      </div>
      
      <MobileMenu 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        imageTravelerUrl={IMAGINATION_TRAVELER_URL}
        historyGptUrl={HISTORY_GPT_URL}
        timeMachineUrl={TIME_MACHINE_URL}
        bookWriterUrl={BOOK_WRITER_URL}
        storyWriterUrl={STORY_WRITER_URL}
      />
    </header>
  );
};

export default Navbar;
