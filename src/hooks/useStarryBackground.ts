
import { useEffect, useRef } from 'react';
import { 
  createBasicStar, 
  createShootingStar, 
  createStarElement, 
  createShootingStarElement 
} from '@/utils/starEffects';

export const useStarryBackground = (containerRef: React.RefObject<HTMLElement>) => {
  const shootingStarCount = useRef(0);
  const maxShootingStars = 8; // Limit concurrent shooting stars for performance

  useEffect(() => {
    const heroSection = containerRef.current;
    if (!heroSection) return;

    // Clear existing stars
    const existingStars = heroSection.querySelectorAll('.star, .streaking-star');
    existingStars.forEach(star => star.remove());
    
    // Create basic stars - more visible
    const starCount = window.innerWidth < 768 ? 60 : 120;
    for (let i = 0; i < starCount; i++) {
      const starStyles = createBasicStar();
      const star = createStarElement(starStyles);
      // Add divine class to some stars
      if (Math.random() > 0.85) {
        star.classList.add('divine');
      }
      heroSection.appendChild(star);
    }
    
    // Create shooting star with cleanup
    const createAndAppendShootingStar = () => {
      if (!heroSection || document.visibilityState !== 'visible') return;
      if (shootingStarCount.current >= maxShootingStars) return;
      
      shootingStarCount.current++;
      
      const shootingStarStyles = createShootingStar();
      const shootingStar = createShootingStarElement(shootingStarStyles);
      
      // Add variant class randomly
      const variant = Math.random();
      if (variant > 0.7) {
        shootingStar.classList.add('fast');
      } else if (variant < 0.2) {
        shootingStar.classList.add('slow');
      }
      
      heroSection.appendChild(shootingStar);
      
      // Remove after animation completes
      const duration = shootingStar.classList.contains('fast') ? 1000 : 
                       shootingStar.classList.contains('slow') ? 2500 : 1500;
      
      setTimeout(() => {
        if (shootingStar.parentNode === heroSection) {
          shootingStar.remove();
        }
        shootingStarCount.current--;
      }, duration + 100);
    };
    
    // Create initial burst of shooting stars
    const initialCount = window.innerWidth < 768 ? 2 : 4;
    for (let i = 0; i < initialCount; i++) {
      setTimeout(() => createAndAppendShootingStar(), i * 300);
    }
    
    // Create shooting stars more frequently
    const interval = window.innerWidth < 768 ? 1200 : 800;
    const shootingStarInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        createAndAppendShootingStar();
      }
    }, interval);
    
    // Occasional burst of multiple shooting stars
    const burstInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        for (let i = 0; i < 3; i++) {
          setTimeout(() => createAndAppendShootingStar(), i * 150);
        }
      }
    }, 5000);
    
    return () => {
      clearInterval(shootingStarInterval);
      clearInterval(burstInterval);
    };
  }, [containerRef]);
};
