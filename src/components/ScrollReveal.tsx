
import React, { useEffect, useRef } from 'react';

// Import component types at the top to avoid circular dependency issues
import type TimelineSection from './TimelineSection';
import type TestimonialsSection from './TestimonialsSection';
import type Features from './Features';
import type CtaSection from './CtaSection';
import type FaqSection from './FaqSection';
import type TimeJourneySection from './TimeJourneySection';

// Create a type that includes all components that can accept addToRefs
type ComponentWithAddToRefs = 
  | typeof TimelineSection
  | typeof TestimonialsSection
  | typeof Features
  | typeof CtaSection
  | typeof FaqSection
  | typeof TimeJourneySection;

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
        if (!React.isValidElement(child)) {
          return child;
        }
        
        // Get component type information for comparison
        const childType = child.type;
        const componentName = (childType as any)?.displayName || (childType as any)?.name;
        
        // List of components that accept addToRefs prop
        const knownComponents = [
          'TimelineSection',
          'TestimonialsSection', 
          'Features',
          'CtaSection',
          'FaqSection',
          'TimeJourneySection'
        ];
        
        if (knownComponents.includes(componentName)) {
          // Pass addToRefs to known components that support it
          return React.cloneElement(child, { addToRefs });
        }
        
        // For other components, wrap in a div with ref
        return (
          <div ref={addToRefs} className="scroll-reveal-wrapper">
            {child}
          </div>
        );
      })}
    </>
  );
};

export default ScrollReveal;
