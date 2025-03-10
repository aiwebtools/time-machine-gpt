
import React, { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

// Define an interface for components that can accept addToRefs prop
interface RefAwareComponentProps {
  addToRefs?: (el: HTMLElement | null) => void;
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
          // Check if the component has addToRefs in its props interface
          // We can't directly check the interface, but we can check if the component
          // already has an addToRefs prop defined
          const childProps = child.props as any;
          const hasAddToRefsProp = 'addToRefs' in childProps;
          
          if (hasAddToRefsProp) {
            // The component already has addToRefs prop defined, so it's designed to accept it
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
