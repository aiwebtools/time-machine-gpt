
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
      
      // Create dynamically moving shooting stars
      const createShootingStar = () => {
        if (!heroSection) return;
        
        const shootingStar = document.createElement('div');
        shootingStar.className = 'star shooting';
        
        // Random starting position
        const startX = Math.random() * 20; // Start from left side slightly off-screen
        const startY = Math.random() * 40; // Start from top portion of the screen
        
        shootingStar.style.left = `${startX}%`;
        shootingStar.style.top = `${startY}%`;
        
        // Randomize the animation speed
        const animationDuration = (Math.random() * 3 + 2); // 2-5 seconds
        shootingStar.style.animationDuration = `${animationDuration}s`;
        
        // Add some size variety
        const size = Math.random() * 3 + 2;
        shootingStar.style.width = `${size}px`;
        shootingStar.style.height = `${Math.max(1, size/4)}px`;
        
        // Add some rotation variety
        const rotation = -45 + (Math.random() * 20 - 10); // -55 to -35 degrees
        shootingStar.style.transform = `rotate(${rotation}deg)`;
        
        // Add to container
        heroSection.appendChild(shootingStar);
        
        // Remove after animation completes to prevent memory build-up
        setTimeout(() => {
          if (shootingStar.parentNode === heroSection) {
            shootingStar.remove();
          }
        }, animationDuration * 1000 + 100);
      };
      
      // Create initial batch of shooting stars
      for (let i = 0; i < 5; i++) {
        createShootingStar();
      }
      
      // Create new shooting stars at random intervals
      const shootingStarInterval = setInterval(() => {
        if (document.visibilityState === 'visible') {
          createShootingStar();
        }
      }, 1500);
      
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
        clearInterval(shootingStarInterval);
      };
    }
  }, [containerRef]);

  return null; // This component doesn't render anything directly
};

export default StarryBackground;
