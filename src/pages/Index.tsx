
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
import InformationalDisclaimer from '@/components/InformationalDisclaimer';
import FaqSection from '@/components/FaqSection';
import { cn } from '@/lib/utils';

const TIME_MACHINE_URL = "https://chatgpt.com/g/g-t8s65Zh0j-time-machine-gpt";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Enhanced SEO title for better rankings
    document.title = "AI Web Tools - Free AI Tools | Time Machine GPT | Best AI Tools 2025";
    
    // Add additional meta tags for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover the best free AI tools at AI Web Tools. Experience Time Machine GPT - revolutionary AI-powered time travel through history. Educational AI tools for research, learning, and exploration.');
    }
    
    // Add structured data for better search visibility
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "AI Web Tools - Free AI Tools Collection",
      "description": "Comprehensive collection of free AI tools including Time Machine GPT for educational time travel experiences",
      "url": window.location.href,
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "Time Machine GPT",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web Browser"
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => {
      clearTimeout(timer);
      document.head.removeChild(script);
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

  return (
    <div className={cn("min-h-screen flex flex-col transition-opacity duration-700", isLoaded ? "opacity-100" : "opacity-0")}>
      {/* SEO Hidden Content for Keywords */}
      <div className="sr-only">
        <h1>AI Web Tools - Best Free AI Tools Collection 2025</h1>
        <p>Discover powerful artificial intelligence tools including Time Machine GPT, educational AI research tools, and innovative ChatGPT applications. AI Web Tools provides the most comprehensive collection of free AI tools for students, researchers, and professionals.</p>
        <span>Keywords: AI tools, free AI tools, AI web tools, artificial intelligence, ChatGPT tools, educational AI, research AI, Time Machine GPT, AI applications, machine learning tools, AI chat tools, best AI tools 2025</span>
      </div>
      
      <DisclaimerPopup />
      <ProgressBar />
      <Navbar />
      
      <StarryBackground containerRef={heroSectionRef} />
      
      <main className="flex-1" role="main">
        <HeroSection 
          onStartJourney={handleStartJourney}
          timeDestinationUrl={TIME_MACHINE_URL}
          setHeroSectionRef={setHeroSectionRef}
        />
        
        <ScrollReveal>
          <TimelineSection />
          <TimeJourneySection onTimeTravel={handleTimeTravelClick} />
          <TestimonialsSection />
          <FaqSection />
          <Features />
          <CtaSection timeDestinationUrl={TIME_MACHINE_URL} />
        </ScrollReveal>
        
        <InformationalDisclaimer />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
