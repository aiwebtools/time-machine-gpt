import { useEffect, useRef } from 'react';
import { 
  createBasicStar, 
  createShootingStar, 
  createStarElement, 
  createShootingStarElement 
} from '@/utils/starEffects';

export const useStarryBackground = (containerRef: React.RefObject<HTMLElement>) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const shootingStarCountRef = useRef(0);
  const maxShootingStars = isMobile ? 3 : 8;

  useEffect(() => {
    const heroSection = containerRef.current;
    if (!heroSection) return;

    // Reset counter
    shootingStarCountRef.current = 0;

    // Clear existing stars
    const existingStars = heroSection.querySelectorAll('.star, .streaking-star');
    existingStars.forEach(star => star.remove());
    
    // Create basic stars
    const starCount = isMobile ? 40 : 120;
    for (let i = 0; i < starCount; i++) {
      const starStyles = createBasicStar();
      const star = createStarElement(starStyles);
      if (Math.random() > 0.85) {
        star.classList.add('divine');
      }
      heroSection.appendChild(star);
    }
    
    // Create shooting star with cleanup
    const createAndAppendShootingStar = () => {
      if (!heroSection || document.visibilityState !== 'visible') return;
      if (shootingStarCountRef.current >= maxShootingStars) return;
      
      shootingStarCountRef.current++;
      
      const shootingStarStyles = createShootingStar();
      const shootingStar = createShootingStarElement(shootingStarStyles);
      
      const variant = Math.random();
      if (variant > 0.7) {
        shootingStar.classList.add('fast');
      } else if (variant < 0.2) {
        shootingStar.classList.add('slow');
      }
      
      heroSection.appendChild(shootingStar);
      
      const duration = shootingStar.classList.contains('fast') ? 1000 : 
                       shootingStar.classList.contains('slow') ? 2500 : 1500;
      
      setTimeout(() => {
        if (shootingStar.parentNode === heroSection) {
          shootingStar.remove();
        }
        shootingStarCountRef.current = Math.max(0, shootingStarCountRef.current - 1);
      }, duration + 100);
    };
    
    // Initial shooting stars
    const initialCount = window.innerWidth < 768 ? 2 : 4;
    for (let i = 0; i < initialCount; i++) {
      setTimeout(() => createAndAppendShootingStar(), i * 300);
    }
    
    // Regular shooting stars
    const interval = window.innerWidth < 768 ? 1200 : 800;
    const shootingStarInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        createAndAppendShootingStar();
      }
    }, interval);
    
    // Occasional burst
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
