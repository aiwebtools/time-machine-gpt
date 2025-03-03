
import React, { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
}

const ScrollReveal = ({ children }: ScrollRevealProps) => {
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    revealRefs.current.forEach(el => observer.observe(el));
    
    return () => {
      observer.disconnect();
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <React.Fragment>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          // Only pass addToRefs to components that accept it
          const childProps = { ...child.props };
          
          // Check if the component type accepts addToRefs
          // This is a safer approach that handles both custom components and built-in elements
          if (typeof child.type !== 'string') {
            childProps.addToRefs = addToRefs;
          }
          
          return React.cloneElement(child, childProps);
        }
        return child;
      })}
    </React.Fragment>
  );
};

export default ScrollReveal;
