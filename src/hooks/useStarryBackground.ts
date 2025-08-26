
import { useEffect } from 'react';
import { 
  createBasicStar, 
  createShootingStar, 
  createStarElement, 
  createShootingStarElement 
} from '@/utils/starEffects';

export const useStarryBackground = (containerRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const heroSection = containerRef.current;
    if (!heroSection) return;

    // Clear existing stars
    const existingStars = heroSection.querySelectorAll('.star, .streaking-star');
    existingStars.forEach(star => star.remove());
    
    // Create fewer basic stars for better performance
    const starCount = window.innerWidth < 768 ? 50 : 100; // Reduce stars on mobile
    for (let i = 0; i < starCount; i++) {
      const starStyles = createBasicStar();
      const star = createStarElement(starStyles);
      heroSection.appendChild(star);
    }
    
    // Create shooting stars with performance optimization
    const createAndAppendShootingStar = () => {
      if (!heroSection || document.visibilityState !== 'visible') return;
      
      const shootingStarStyles = createShootingStar();
      const shootingStar = createShootingStarElement(shootingStarStyles);
      heroSection.appendChild(shootingStar);
      
      setTimeout(() => {
        if (shootingStar.parentNode === heroSection) {
          shootingStar.remove();
        }
      }, parseFloat(shootingStarStyles.animationDuration) * 1000 + 100);
    };
    
    // Create fewer initial shooting stars
    const initialCount = window.innerWidth < 768 ? 3 : 5;
    for (let i = 0; i < initialCount; i++) {
      setTimeout(() => createAndAppendShootingStar(), i * 200);
    }
    
    // Reduce frequency of new shooting stars
    const interval = window.innerWidth < 768 ? 3000 : 2000; // Less frequent on mobile
    const shootingStarInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        createAndAppendShootingStar();
      }
    }, interval);
    
    return () => {
      clearInterval(shootingStarInterval);
    };
  }, [containerRef]);
};
