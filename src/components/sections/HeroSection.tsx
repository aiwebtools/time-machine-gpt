
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import TimePortal from '@/components/TimePortal';
import useRevealOnScroll from '@/hooks/useRevealOnScroll';

interface HeroSectionProps {
  timeDestinationUrl: string;
  onStartJourney: (destination: string, date: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  timeDestinationUrl, 
  onStartJourney 
}) => {
  const { addToRefs } = useRevealOnScroll<HTMLElement>();
  const heroSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Enhanced star animation
    const heroSection = heroSectionRef.current;
    if (heroSection) {
      // Clear any existing stars first (in case of re-renders)
      const existingStars = heroSection.querySelectorAll('.star');
      existingStars.forEach(star => star.remove());
      
      // Add new stars with enhanced animations
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1;
        star.className = 'star';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        heroSection.appendChild(star);
      }
      
      // Add a few shooting stars
      for (let i = 0; i < 5; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'star shooting';
        shootingStar.style.left = `${Math.random() * 100}%`;
        shootingStar.style.top = `${Math.random() * 50}%`;
        shootingStar.style.animationDelay = `${Math.random() * 15}s`;
        heroSection.appendChild(shootingStar);
      }
      
      // Add parallax effect to stars
      const parallaxEffect = (e: MouseEvent) => {
        const stars = heroSection.querySelectorAll('.star:not(.shooting)');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        stars.forEach((star) => {
          const depth = Math.random() * 5;
          const moveX = (mouseX - 0.5) * depth;
          const moveY = (mouseY - 0.5) * depth;
          
          if (star instanceof HTMLElement) {
            star.style.transform = `translate(${moveX}px, ${moveY}px)`;
          }
        });
      };
      
      window.addEventListener('mousemove', parallaxEffect);
      
      return () => {
        window.removeEventListener('mousemove', parallaxEffect);
      };
    }
  }, []);

  return (
    <section 
      ref={(el) => { 
        if (el) {
          heroSectionRef.current = el;
          addToRefs(el);
        }
      }} 
      className="relative min-h-screen flex flex-col justify-center hero-section overflow-hidden space-bg"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-time-dark via-time-medium to-time-dark z-0 opacity-80"></div>
      
      <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none z-0">
        <div className="relative">
          <div className="w-[600px] h-[600px] rounded-full border-2 border-time-accent/20 animate-clock-spin-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="w-[400px] h-[400px] rounded-full border border-time-accent/30 animate-clock-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{
            animationDirection: 'reverse'
          }}></div>
          <div className="w-[200px] h-[200px] rounded-full border border-time-accent/50 animate-clock-spin-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="w-[100px] h-[100px] rounded-full bg-time-accent/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse blur-md"></div>
          <div className="w-[600px] h-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-clock-spin">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-time-accent/20 to-transparent absolute top-1/2 -translate-y-1/2"></div>
            <div className="h-full w-1 bg-gradient-to-b from-transparent via-time-accent/20 to-transparent absolute left-1/2 -translate-x-1/2"></div>
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-time-accent/10 to-transparent absolute top-1/2 -translate-y-1/2 rotate-45 origin-center"></div>
            <div className="h-full w-1 bg-gradient-to-b from-transparent via-time-accent/10 to-transparent absolute left-1/2 -translate-x-1/2 rotate-45 origin-center"></div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-10 md:py-20 flex-grow">
        <div className="grid grid-cols-1 gap-12 items-center">
          <div className="text-white space-y-6 max-w-2xl mx-auto text-center">
            <div ref={addToRefs} className="reveal inline-block px-3 py-1 bg-time-accent/10 border border-time-accent/30 rounded-full text-time-accent text-sm font-medium animate-pulse">
              Interactive Time Travel Experience
            </div>
            
            <h1 ref={addToRefs} className="reveal text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-shadow leading-tight">
              <span className="text-glow">Journey Through Time</span><br />
              <span className="text-shimmer">With Father Time</span>
            </h1>
            
            <div className="w-full mx-auto mt-8 mb-8">
              <TimePortal onStartJourney={onStartJourney} timeDestinationUrl={timeDestinationUrl} className="max-w-5xl mx-auto" />
            </div>
            
            <p ref={addToRefs} className="reveal text-lg text-white/80 max-w-xl mx-auto">
              Experience history like never before. Travel to any era, any location, and immerse yourself in vivid, historically accurate narratives and visuals.
            </p>
            
            <div ref={addToRefs} className="reveal flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href={timeDestinationUrl} target="_blank" rel="noopener noreferrer" className="btn-glow px-6 py-3 bg-time-accent text-white rounded-md font-medium hover:bg-time-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Start Your Journey
              </a>
              <a href="/about" className="btn-glow px-6 py-3 bg-transparent border border-white/30 text-white rounded-md font-medium hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
