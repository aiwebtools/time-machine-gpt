
import React, { useEffect, useRef } from 'react';

interface StarryBackgroundProps {
  containerRef: React.RefObject<HTMLElement>;
}

const StarryBackground = ({ containerRef }: StarryBackgroundProps) => {
  useEffect(() => {
    const heroSection = containerRef.current;
    if (heroSection) {
      // Clear any existing stars first (in case of re-renders)
      const existingStars = heroSection.querySelectorAll('.star');
      existingStars.forEach(star => star.remove());
      
      // Add new stars with enhanced animations
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1;
        star.className = 'star';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        heroSection.appendChild(star);
      }
      
      // Add a few shooting stars
      for (let i = 0; i < 5; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'star shooting';
        shootingStar.style.left = `${Math.random() * 100}%`;
        shootingStar.style.top = `${Math.random() * 50}%`;
        shootingStar.style.animationDelay = `${Math.random() * 15}s`;
        heroSection.appendChild(shootingStar);
      }
      
      // Modified parallax effect to avoid mouse jitter
      const parallaxEffect = (e: MouseEvent) => {
        const stars = heroSection.querySelectorAll('.star:not(.shooting)');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        requestAnimationFrame(() => {
          stars.forEach((star) => {
            const depth = Math.random() * 5;
            const moveX = (mouseX - 0.5) * depth;
            const moveY = (mouseY - 0.5) * depth;
            
            if (star instanceof HTMLElement) {
              star.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
          });
        });
      };
      
      // Throttle the mousemove event to reduce flicker
      let lastTime = 0;
      const throttledParallaxEffect = (e: MouseEvent) => {
        const now = Date.now();
        if (now - lastTime >= 50) { // Limit to executing at most once every 50ms
          lastTime = now;
          parallaxEffect(e);
        }
      };
      
      window.addEventListener('mousemove', throttledParallaxEffect);
      
      return () => {
        window.removeEventListener('mousemove', throttledParallaxEffect);
      };
    }
  }, [containerRef]);

  return null; // This component doesn't render anything directly
};

export default StarryBackground;
