
import { useEffect, useState } from 'react';

export function useFacebookBrowser() {
  const [isFacebookBrowser, setIsFacebookBrowser] = useState(false);
  
  useEffect(() => {
    // Check if the current browser is Facebook's in-app browser
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isFB = 
      userAgent.indexOf('FBAN') > -1 || 
      userAgent.indexOf('FBAV') > -1 || 
      userAgent.indexOf('Instagram') > -1;
    
    setIsFacebookBrowser(isFB);
    
    if (isFB) {
      // Add a class to the body for Facebook-specific CSS
      document.body.classList.add('facebook-browser');
      
      // Force redraw for Facebook browser
      setTimeout(() => {
        window.scrollTo(0, 1);
        window.scrollTo(0, 0);
      }, 100);
      
      // Apply critical Facebook browser fixes
      document.documentElement.style.height = '100%';
      document.body.style.height = '100%';
      document.body.style.position = 'relative';
      
      // Fix for position:fixed elements in Facebook browser
      const fixPositionFixed = () => {
        window.scrollTo(0, 0);
      };
      
      window.addEventListener('scroll', fixPositionFixed, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', fixPositionFixed);
      };
    }
  }, []);
  
  return isFacebookBrowser;
}
