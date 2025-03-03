
import { useRef, useEffect } from 'react';

export function useRevealOnScroll<T extends HTMLElement = HTMLElement>() {
  const refs = useRef<Array<T | null>>([]);
  
  // Function to add refs to the array
  const addToRefs = (el: T | null) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };
  
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
    
    refs.current.forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => {
      refs.current.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);
  
  return { addToRefs, revealRefs: refs };
}

export default useRevealOnScroll;
