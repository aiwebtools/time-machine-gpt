
import React from 'react';
import { cn } from '@/lib/utils';

interface CtaSectionProps {
  className?: string;
  addToRefs: (el: HTMLElement | null) => void;
  timeDestinationUrl: string;
}

const CtaSection = ({ className, addToRefs, timeDestinationUrl }: CtaSectionProps) => {
  return (
    <section 
      ref={addToRefs} 
      className={cn("reveal py-24 bg-gradient-to-r from-[#121a29] to-time-dark text-white text-center", className)}
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 max-w-3xl mx-auto leading-tight">
          Ready to Embark on Your Time Travel Journey?
        </h2>
        <p className="text-white/90 max-w-2xl mx-auto mb-8">
          Start exploring the past with unprecedented detail and accuracy. Begin your adventure through history with Father Time.
        </p>
        <a href={timeDestinationUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-time-accent text-white rounded-md font-medium hover:bg-time-accent/90 transition-colors inline-block shadow-lg hover:shadow-time-accent/20 hover:scale-105 transition-all duration-300 animate-pulse">
          Access Time Machine GPT
        </a>
      </div>
    </section>
  );
};

export default CtaSection;
