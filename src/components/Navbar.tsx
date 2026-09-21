
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import NavLogo from './navigation/NavLogo';
import DesktopNav from './navigation/DesktopNav';
import MobileMenu from './navigation/MobileMenu';
import { Button } from '@/components/ui/button';

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
      <div className="container mx-auto px-3 sm:px-4 md:px-6 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex-shrink-0 mr-4">
          <NavLogo scrollPosition={scrollPosition} />
        </div>
        
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            "md:hidden shrink-0 transition-all",
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
        </Button>
        
        <DesktopNav scrollPosition={scrollPosition} />
      </div>
      
      <MobileMenu 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
    </header>
  );
};

export default Navbar;
