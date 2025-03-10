
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import TimelineSection from '@/components/TimelineSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Features from '@/components/Features';
import CtaSection from '@/components/CtaSection';
import ScrollReveal from '@/components/ScrollReveal';
import ProgressBar from '@/components/ProgressBar';
import TimeJourneySection from '@/components/TimeJourneySection';
import StarryBackground from '@/components/StarryBackground';
import DisclaimerPopup from '@/components/DisclaimerPopup';
import { cn } from '@/lib/utils';

const TIME_MACHINE_URL = "https://chatgpt.com/g/g-t8s65Zh0j-time-machine-gpt";
const DISCLAIMER_KEY = "time-machine-disclaimer-accepted";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const heroSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Update document title with more detailed name
    document.title = "Time Machine GPT - Interactive Time Travel Experience";
    
    // Check if user has already accepted the disclaimer
    const hasAcceptedDisclaimer = localStorage.getItem(DISCLAIMER_KEY) === "true";
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Only show disclaimer if user hasn't accepted it before
      if (!hasAcceptedDisclaimer) {
        setShowDisclaimer(true);
      }
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleStartJourney = (destination: string, date: string) => {
    toast.success("Time travel initiated!", {
      description: `Preparing journey to ${destination} in ${date}`,
      duration: 3000
    });
  };

  const setHeroSectionRef = (el: HTMLElement | null) => {
    heroSectionRef.current = el;
  };
  
  const handleTimeTravelClick = () => {
    try {
      window.open(TIME_MACHINE_URL, '_blank', 'noopener,noreferrer');
      toast.success("Launching Time Machine GPT!", {
        description: "Prepare for an extraordinary journey through time",
        duration: 3000
      });
      console.log("Time travel button clicked!");
    } catch (error) {
      toast.error("Couldn't launch the Time Machine", {
        description: "Your browser may be blocking popups. Please allow popups or try a different browser.",
        duration: 5000
      });
    }
  };

  const handleAcceptDisclaimer = () => {
    // Save acceptance to localStorage
    localStorage.setItem(DISCLAIMER_KEY, "true");
    setShowDisclaimer(false);
    toast.success("Welcome, time traveler!", {
      description: "Your journey through history awaits.",
      duration: 3000
    });
  };

  return (
    <div className={cn("min-h-screen flex flex-col transition-opacity duration-700", isLoaded ? "opacity-100" : "opacity-0")}>
      <ProgressBar />
      <Navbar />
      
      <StarryBackground containerRef={heroSectionRef} />
      
      <main className="flex-1">
        <ScrollReveal>
          <HeroSection 
            onStartJourney={handleStartJourney}
            timeDestinationUrl={TIME_MACHINE_URL}
            setHeroSectionRef={setHeroSectionRef}
          />
          
          <TimelineSection />
          
          <TimeJourneySection onTimeTravel={handleTimeTravelClick} />
          
          <TestimonialsSection />
          
          <Features />
          
          <CtaSection 
            timeDestinationUrl={TIME_MACHINE_URL}
          />
        </ScrollReveal>
      </main>
      
      <Footer />
      
      <DisclaimerPopup 
        isOpen={showDisclaimer}
        onAccept={handleAcceptDisclaimer}
      />
    </div>
  );
};

export default Index;
