
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { createTimePortalEffect } from '@/utils/timeEffects';

interface UseTimePortalProps {
  onStartJourney: (destination: string, date: string) => void;
  timeDestinationUrl: string;
}

export const useTimePortal = ({ onStartJourney, timeDestinationUrl }: UseTimePortalProps) => {
  const [portalActive, setPortalActive] = useState(false);
  const [exploding, setExploding] = useState(false);

  useEffect(() => {
    // Clean up any explosion particles when component unmounts
    return () => {
      const explosionElements = document.querySelectorAll('.explosion-particle, .lightning-bolt, .vortex-ring, .energy-wave');
      explosionElements.forEach(el => el.remove());
      
      const flashElement = document.querySelector('.fullscreen-flash');
      if (flashElement) flashElement.remove();
    };
  }, []);

  // Add useEffect for handling resize events for better responsiveness
  useEffect(() => {
    const handleResize = () => {
      // Force iframe to resize properly on orientation change
      const iframe = document.querySelector('iframe');
      if (iframe) {
        iframe.style.height = 'auto';
        iframe.style.height = iframe.offsetWidth * (9/16) + 'px';
      }
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    // Initial call
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const handleStartJourney = () => {
    // Set default values since we no longer have input fields
    const destination = "Time Machine Experience";
    const date = "Present Day";
    
    setPortalActive(true);
    setExploding(true);
    
    // Notify user
    toast.success("Initiating time travel sequence...", {
      duration: 3000,
    });
    
    // Create explosion and lightning effect using the utility function
    createTimePortalEffect(timeDestinationUrl);
    
    // Simulate portal activation
    setTimeout(() => {
      onStartJourney(destination, date);
      setPortalActive(false);
      setExploding(false);
    }, 3000);
  };

  return {
    portalActive,
    exploding,
    handleStartJourney
  };
};
