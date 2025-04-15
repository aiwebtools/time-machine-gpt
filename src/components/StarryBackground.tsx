
import React, { useEffect, useRef } from 'react';

interface StarryBackgroundProps {
  containerRef: React.RefObject<HTMLElement>;
}

const StarryBackground = ({ containerRef }: StarryBackgroundProps) => {
  useEffect(() => {
    const heroSection = containerRef.current;
    if (heroSection) {
      // Clear any existing stars
      const existingStars = heroSection.querySelectorAll('.star, .streaking-star');
      existingStars.forEach(star => star.remove());
      
      // Add more stars with enhanced variety
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const opacity = Math.random() * 0.7 + 0.3;
        
        star.className = 'star';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${Math.random() * 4 + 3}s`;
        star.style.opacity = `${opacity}`;
        
        heroSection.appendChild(star);
      }
      
      // Create more dynamic shooting stars
      const createShootingStar = () => {
        if (!heroSection) return;
        
        const shootingStar = document.createElement('div');
        shootingStar.className = 'star shooting';
        
        // More varied starting positions and movements
        const startX = Math.random() * 20;
        const startY = Math.random() * 40;
        
        shootingStar.style.left = `${startX}%`;
        shootingStar.style.top = `${startY}%`;
        
        const animationDuration = (Math.random() * 4 + 3);
        shootingStar.style.animationDuration = `${animationDuration}s`;
        
        const size = Math.random() * 4 + 2;
        shootingStar.style.width = `${size}px`;
        shootingStar.style.height = `${Math.max(1, size/4)}px`;
        
        const rotation = -45 + (Math.random() * 30 - 15);
        shootingStar.style.transform = `rotate(${rotation}deg)`;
        
        heroSection.appendChild(shootingStar);
        
        setTimeout(() => {
          if (shootingStar.parentNode === heroSection) {
            shootingStar.remove();
          }
        }, animationDuration * 1000 + 100);
      };
      
      // Create initial batch of shooting stars
      for (let i = 0; i < 10; i++) {
        createShootingStar();
      }
      
      // Create new shooting stars at random intervals
      const shootingStarInterval = setInterval(() => {
        if (document.visibilityState === 'visible') {
          createShootingStar();
        }
      }, 1000);
      
      return () => {
        clearInterval(shootingStarInterval);
      };
    }
  }, [containerRef]);

  return null;
};

export default StarryBackground;
