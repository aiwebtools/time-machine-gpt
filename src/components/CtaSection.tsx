
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { createTimePortalEffect } from '@/utils/timeEffects';
import { Button } from '@/components/ui/button';

interface CtaSectionProps {
  className?: string;
  addToRefs?: (el: HTMLElement | null) => void;
  timeDestinationUrl: string;
}

const CtaSection = ({ className, addToRefs, timeDestinationUrl }: CtaSectionProps) => {
  const navigate = useNavigate();
  const handleStartJourney = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(timeDestinationUrl);
    window.setTimeout(() => navigate(timeDestinationUrl), 900);
  };

  return (
    <section 
      ref={addToRefs} 
      className={cn("reveal py-24 bg-gradient-to-r from-time-medium to-time-dark text-white text-center", className)}
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 max-w-3xl mx-auto leading-tight">
          Ready to Embark on Your Time Travel Journey?
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-8">
          Start exploring the past with unprecedented detail and accuracy. Begin your adventure through history with Father Time.
        </p>
        <Button asChild onClick={handleStartJourney} className="px-8 py-4 h-auto bg-time-accent text-time-dark rounded-md font-semibold hover:bg-time-accent/90">
          <Link to={timeDestinationUrl}>Access Time Machine GPT</Link>
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
