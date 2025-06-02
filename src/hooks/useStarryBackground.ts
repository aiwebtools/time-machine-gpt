
import { useEffect } from 'react';
import { 
  createBasicStar, 
  createDivineStar,
  createShootingStar, 
  createStarElement,
  createDivineStarElement,
  createShootingStarElement 
} from '@/utils/starEffects';

export const useStarryBackground = (containerRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const heroSection = containerRef.current;
    if (!heroSection) return;

    // Clear existing stars
    const existingStars = heroSection.querySelectorAll('.star, .streaking-star');
    existingStars.forEach(star => star.remove());
    
    // Create massive amount of basic stars
    for (let i = 0; i < 800; i++) {
      const starStyles = createBasicStar();
      const star = createStarElement(starStyles);
      heroSection.appendChild(star);
    }
    
    // Create divine glowing stars
    for (let i = 0; i < 200; i++) {
      const divineStarStyles = createDivineStar();
      const divineStar = createDivineStarElement(divineStarStyles);
      heroSection.appendChild(divineStar);
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
    for (let i = 0; i < 25; i++) {
      setTimeout(() => createAndAppendShootingStar(), i * 200);
    }
    
    // Create new shooting stars at faster intervals
    const shootingStarInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        createAndAppendShootingStar();
        // Sometimes create multiple at once for dramatic effect
        if (Math.random() < 0.3) {
          setTimeout(() => createAndAppendShootingStar(), 100);
        }
      }
    }, 600);
    
    return () => {
      clearInterval(shootingStarInterval);
    };
  }, [containerRef]);
};
