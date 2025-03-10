
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
  
  // Clone children and add the ref
  return (
    <>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          // Fix: Use a different approach for adding refs to children
          return React.cloneElement(child, {
            // Only pass ref if it's a DOM element or a forwardRef component
            ...(typeof child.type !== 'string' ? { addToRefs } : { ref: addToRefs })
          });
        }
        return child;
      })}
    </>
  );
};

export default ScrollReveal;
