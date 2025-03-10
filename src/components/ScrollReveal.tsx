
import React, { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px'
}) => {
  const refs = useRef<(HTMLElement | null)[]>([]);
  
  const addToRefs = (el: HTMLElement | null) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add('active');
            observer.unobserve(target);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );
    
    refs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      refs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [threshold, rootMargin]);
  
  return (
    <>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          // Check if the component accepts addToRefs prop by checking its props type
          // This is safer than checking for presence of a property
          const childType = child.type as any;
          
          // Check if the component has propTypes that include addToRefs
          // or if it's a functional component that accepts addToRefs
          // We'll use a safer approach by checking if the component is one of our known components
          const isKnownComponent = 
            child.type === TimelineSection ||
            child.type === TestimonialsSection ||
            child.type === Features ||
            child.type === CtaSection ||
            child.type === FaqSection ||
            child.type === TimeJourneySection;
          
          if (isKnownComponent) {
            // For known components, we can pass the addToRefs prop safely
            return React.cloneElement(child, { addToRefs } as any);
          } else {
            // For unknown components, wrap in a div with ref
            return (
              <div ref={addToRefs} className="scroll-reveal-wrapper">
                {child}
              </div>
            );
          }
        }
        return child;
      })}
    </>
  );
};

// Import the component types to use for checking
import TimelineSection from './TimelineSection';
import TestimonialsSection from './TestimonialsSection';
import Features from './Features';
import CtaSection from './CtaSection';
import FaqSection from './FaqSection';
import TimeJourneySection from './TimeJourneySection';

export default ScrollReveal;
