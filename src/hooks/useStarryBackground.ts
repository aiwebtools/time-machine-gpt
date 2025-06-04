
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
    
    // Create basic stars
    for (let i = 0; i < 200; i++) {
      const starStyles = createBasicStar();
      const star = createStarElement(starStyles);
      heroSection.appendChild(star);
    }
    
    // Create shooting stars
    const createAndAppendShootingStar = () => {
      if (!heroSection) return;
      
      const shootingStarStyles = createShootingStar();
      const shootingStar = createShootingStarElement(shootingStarStyles);
      heroSection.appendChild(shootingStar);
      
      setTimeout(() => {
        if (shootingStar.parentNode === heroSection) {
          shootingStar.remove();
        }
      }, parseFloat(shootingStarStyles.animationDuration) * 1000 + 100);
    };
    
    // Create initial batch of shooting stars
    for (let i = 0; i < 10; i++) {
      createAndAppendShootingStar();
    }
    
    // Create new shooting stars at intervals
    const shootingStarInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        createAndAppendShootingStar();
      }
    }, 1000);
    
    return () => {
      clearInterval(shootingStarInterval);
    };
  }, [containerRef]);
};
