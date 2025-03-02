
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const TIME_MACHINE_URL = "https://chatgpt.com/g/g-t8s65Zh0j-time-machine-gpt";

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
      scrollPosition > 50 ? 
        "bg-white/80 backdrop-blur-md shadow-sm py-3" : 
        "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-time-accent">
            <div className="absolute inset-0 bg-time-medium animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border-2 border-time-accent relative animate-clock-spin-slow">
                <div className="clock-hand hour-hand"></div>
                <div className="clock-hand minute-hand"></div>
              </div>
            </div>
          </div>
          <span className={cn(
            "font-serif text-xl font-medium transition-colors",
            scrollPosition > 50 ? "text-time-dark" : "text-time-accent font-bold"
          )}>
            Father Time
          </span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={cn(
            "sr-only",
            scrollPosition > 50 ? "text-time-dark" : "text-white"
          )}>
            Menu
          </span>
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
            {isMenuOpen ? (
              <path d="M18 6 6 18 M6 6 18 18" />
            ) : (
              <path d="M4 12h16 M4 6h16 M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavItem 
            to="/" 
            label="Home" 
            isScrolled={scrollPosition > 50} 
          />
          <NavItem 
            to="/about" 
            label="About" 
            isScrolled={scrollPosition > 50} 
          />
          <a 
            href={TIME_MACHINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "px-5 py-2 rounded-full transition-all",
              "border border-time-accent",
              "hover:bg-time-accent/10",
              scrollPosition > 50 
                ? "text-time-dark" 
                : "text-time-accent font-medium"
            )}
          >
            Begin Journey
          </a>
        </nav>
      </div>
      
      {/* Mobile menu */}
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
            href={TIME_MACHINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 text-center bg-time-medium text-white rounded-md mt-2 hover:bg-time-dark transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Begin Journey
          </a>
        </nav>
      </div>
    </header>
  );
};

interface NavItemProps {
  to: string;
  label: string;
  isScrolled: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, isScrolled }) => (
  <Link
    to={to}
    className={cn(
      "relative font-medium hover:text-time-accent transition-colors",
      "after:absolute after:w-0 after:h-0.5 after:bg-time-accent after:left-0 after:-bottom-1",
      "hover:after:w-full after:transition-all after:duration-300",
      isScrolled ? "text-time-dark" : "text-time-accent"
    )}
  >
    {label}
  </Link>
);

interface MobileNavItemProps {
  to: string;
  label: string;
  onClick: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ to, label, onClick }) => (
  <Link
    to={to}
    className="w-full py-2 hover:bg-gray-100 px-2 rounded text-time-dark transition-colors"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Navbar;
