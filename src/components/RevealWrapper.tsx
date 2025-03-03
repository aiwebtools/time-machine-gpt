
import React, { useRef, useEffect } from 'react';

interface RevealWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const RevealWrapper: React.FC<RevealWrapperProps> = ({ children, className }) => {
  const revealRef = useRef<HTMLDivElement>(null);

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
    
    if (revealRef.current) {
      observer.observe(revealRef.current);
    }
    
    return () => {
      if (revealRef.current) {
        observer.unobserve(revealRef.current);
      }
    };
  }, []);

  return (
    <div ref={revealRef} className={`reveal ${className || ''}`}>
      {children}
    </div>
  );
};

export default RevealWrapper;
