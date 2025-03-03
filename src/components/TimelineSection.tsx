
import React from 'react';
import TimelineAnimation from '@/components/TimelineAnimation';
import { cn } from '@/lib/utils';

interface TimelineSectionProps {
  className?: string;
  addToRefs: (el: HTMLElement | null) => void;
}

const TimelineSection = ({ className, addToRefs }: TimelineSectionProps) => {
  return (
    <section className={cn("py-20 bg-gradient-to-b from-time-dark to-white", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div ref={addToRefs} className="reveal text-center max-w-3xl mx-auto mb-16 text-white">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Travel Across The Ages
          </h2>
          <p className="text-white/80">
            From ancient civilizations to recent history, explore any time period with unprecedented detail and immersion.
          </p>
        </div>
        
        <TimelineAnimation />
      </div>
    </section>
  );
};

export default TimelineSection;
