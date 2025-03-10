
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
  
  // Clone children and check if they accept addToRefs prop
  return (
    <>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          // Check if the component has been designed to accept addToRefs
          const childProps = child.props as any;
          if (childProps && typeof childProps.addToRefs !== 'undefined') {
            // The component accepts addToRefs prop
            return React.cloneElement(child, { addToRefs });
          } else {
            // The component doesn't accept addToRefs, wrap it in a div that uses the ref
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

export default ScrollReveal;
