
import React, { useRef } from 'react';
import TimePortal from '@/components/TimePortal';
import { cn } from '@/lib/utils';
import { createTimePortalEffect } from '@/utils/timeEffects';

interface HeroSectionProps {
  className?: string;
  addToRefs?: (el: HTMLElement | null) => void;
  onStartJourney: (destination: string, date: string) => void;
  timeDestinationUrl: string;
  setHeroSectionRef: (el: HTMLElement | null) => void;
}

const HeroSection = ({ 
  className, 
  addToRefs, 
  onStartJourney, 
  timeDestinationUrl,
  setHeroSectionRef
}: HeroSectionProps) => {
  
  const handleStartJourney = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(timeDestinationUrl);
  };
  
  return (
    <section 
      ref={(el) => { 
        if (el) setHeroSectionRef(el); 
        if (addToRefs) addToRefs(el);
      }} 
      className={cn("relative min-h-screen flex flex-col justify-center hero-section overflow-hidden space-bg", className)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-time-dark via-time-medium to-time-dark z-0 opacity-90"></div>
      
      {/* Divine floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="light-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none z-1">
        <div className="relative">
          <div className="w-[700px] h-[700px] rounded-full border-4 border-time-accent/30 animate-clock-spin-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-divine-glow"></div>
          <div className="w-[500px] h-[500px] rounded-full border-2 border-time-divine/40 animate-clock-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{
          animationDirection: 'reverse'
        }}></div>
          <div className="w-[300px] h-[300px] rounded-full border-3 border-time-accent/60 animate-clock-spin-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-glow"></div>
          <div className="w-[150px] h-[150px] rounded-full bg-gradient-to-r from-time-accent/40 to-time-divine/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse blur-md"></div>
          <div className="w-[700px] h-[700px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-clock-spin">
            <div className="w-full h-2 bg-gradient-to-r from-transparent via-time-accent/30 to-transparent absolute top-1/2 -translate-y-1/2"></div>
            <div className="h-full w-2 bg-gradient-to-b from-transparent via-time-accent/30 to-transparent absolute left-1/2 -translate-x-1/2"></div>
            <div className="w-full h-2 bg-gradient-to-r from-transparent via-time-divine/20 to-transparent absolute top-1/2 -translate-y-1/2 rotate-45 origin-center"></div>
            <div className="h-full w-2 bg-gradient-to-b from-transparent via-time-divine/20 to-transparent absolute left-1/2 -translate-x-1/2 rotate-45 origin-center"></div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-8 relative z-10 py-16 md:py-24 flex-grow">
        <div className="grid grid-cols-1 gap-16 items-center">
          <div className="text-white space-y-10 max-w-3xl mx-auto text-center">
            <div className="pt-20 md:pt-24"></div>
            
            <div ref={addToRefs} className="reveal inline-block px-6 py-3 bg-gradient-to-r from-time-accent/20 to-time-divine/20 border-2 border-time-accent/40 rounded-full text-time-accent text-base font-medium animate-divine-glow backdrop-blur-md">
              Interactive Time Travel Experience
            </div>
            
            <h1 ref={addToRefs} className="reveal text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-shadow leading-tight space-y-4">
              <span className="block text-glow bg-gradient-to-r from-time-accent via-time-divine to-time-accent bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_auto]">Journey Through Time</span>
              <span className="block text-shimmer bg-gradient-to-r from-time-divine via-white to-time-accent bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_auto]">With Father Time</span>
            </h1>
            
            <div className="w-full mx-auto mt-12 mb-12">
              <TimePortal onStartJourney={onStartJourney} timeDestinationUrl={timeDestinationUrl} className="max-w-6xl mx-auto" />
            </div>
            
            <p ref={addToRefs} className="reveal text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
              Experience history like never before. Travel to any era, any location, and immerse yourself in vivid, historically accurate narratives and visuals.
            </p>
            
            <div ref={addToRefs} className="reveal flex flex-col sm:flex-row gap-6 pt-8 justify-center">
              <a 
                href={timeDestinationUrl} 
                onClick={handleStartJourney}
                className="btn-glow px-10 py-4 bg-gradient-to-r from-time-accent to-time-divine text-blue-900 rounded-lg font-semibold hover:from-time-divine hover:to-time-accent transition-all duration-500 hover:scale-110 hover:shadow-2xl animate-divine-glow text-lg"
              >
                Start Your Journey
              </a>
              <a href="/about" className="btn-glow px-10 py-4 bg-transparent border-2 border-time-divine/50 text-white rounded-lg font-semibold hover:bg-time-divine/20 transition-all duration-500 hover:scale-110 hover:shadow-2xl backdrop-blur-md text-lg">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-celestial-dance">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-time-accent animate-divine-glow">
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
