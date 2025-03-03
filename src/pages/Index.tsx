
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';
import HeroSection from '@/components/sections/HeroSection';
import TimePeriodSection from '@/components/sections/TimePeriodSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import DemoSection from '@/components/sections/DemoSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CallToActionSection from '@/components/sections/CallToActionSection';

const TIME_MACHINE_URL = "https://chatgpt.com/g/g-t8s65Zh0j-time-machine-gpt";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
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

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-opacity duration-700", 
      isLoaded ? "opacity-100" : "opacity-0"
    )}>
      <ProgressBar />
      <Navbar />
      
      <HeroSection 
        timeDestinationUrl={TIME_MACHINE_URL} 
        onStartJourney={handleStartJourney} 
      />
      
      <TimePeriodSection timeDestinationUrl={TIME_MACHINE_URL} />
      
      <FeaturesSection />
      
      <DemoSection timeDestinationUrl={TIME_MACHINE_URL} />
      
      <TestimonialsSection />
      
      <CallToActionSection timeDestinationUrl={TIME_MACHINE_URL} />
      
      <Footer />
    </div>
  );
};

export default Index;
