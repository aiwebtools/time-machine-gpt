
import React from 'react';

interface TimeJourneySectionProps {
  addToRefs?: (el: HTMLElement | null) => void;
  onTimeTravel: () => void;
}

const TimeJourneySection = ({ addToRefs, onTimeTravel }: TimeJourneySectionProps) => {
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
        <button
          onClick={onTimeTravel}
          className="px-6 md:px-10 py-3 md:py-4 bg-time-accent text-white text-sm md:text-lg rounded-md font-medium 
                   hover:bg-time-accent/90 transition-colors duration-300 
                   shadow-[0_0_15px_rgba(194,160,110,0.4)]"
        >
          Begin Time Travel Experience Now
        </button>
      </div>
    </section>
  );
};

export default TimeJourneySection;
