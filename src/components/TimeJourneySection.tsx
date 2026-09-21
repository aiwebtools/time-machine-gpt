
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createTimePortalEffect } from '@/utils/timeEffects';
import { Button } from '@/components/ui/button';

interface TimeJourneySectionProps {
  addToRefs?: (el: HTMLElement | null) => void;
  onTimeTravel: () => void;
}

const TimeJourneySection = ({ addToRefs, onTimeTravel }: TimeJourneySectionProps) => {
  const navigate = useNavigate();
  const TIME_MACHINE_PATH = '/original-time-machine';
  
  const handleTimeTravel = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(TIME_MACHINE_PATH);
    onTimeTravel();
    window.setTimeout(() => navigate(TIME_MACHINE_PATH), 900);
  };
  
  return (
    <section 
      ref={addToRefs as React.RefCallback<HTMLDivElement>} 
      className="reveal py-12 md:py-16 bg-time-dark text-white"
    >
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-glow">Ready to Embark on Your Journey?</h2>
        <p className="max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-lg px-2 md:px-4">
          The Time Machine is ready for your instructions. Where and when would you like to travel?
        </p>
        <Button
          onClick={handleTimeTravel}
          className="px-6 md:px-10 py-3 md:py-4 h-auto bg-time-accent text-time-dark text-sm md:text-lg rounded-md font-semibold 
                   hover:bg-time-accent/90 transition-colors duration-300 
                   shadow-[0_0_15px_rgba(194,160,110,0.4)]"
        >
          Begin Time Travel Experience Now
        </Button>
      </div>
    </section>
  );
};

export default TimeJourneySection;
