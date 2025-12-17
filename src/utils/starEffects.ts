
interface StarStyle {
  width: string;
  height: string;
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
  opacity: string;
}

interface ShootingStarStyle extends StarStyle {
  transform: string;
}

export const createBasicStar = (): StarStyle => {
  const size = Math.random() * 3 + 2; // Slightly larger stars
  const opacity = Math.random() * 0.5 + 0.5; // More visible opacity
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${Math.random() * 3 + 2}s`,
    opacity: `${opacity}`
  };
};

export const createShootingStar = (): ShootingStarStyle => {
  // Start from various positions in upper portion of screen
  const startX = Math.random() * 60; // Can start from left 60% of screen
  const startY = Math.random() * 30; // Start in top 30%
  const rotation = -35 + (Math.random() * 20 - 10); // Slight angle variation
  
  return {
    width: '100px',
    height: '2px',
    left: `${startX}%`,
    top: `${startY}%`,
    animationDuration: '1.5s',
    animationDelay: '0s',
    opacity: '1',
    transform: `rotate(${rotation}deg)`
  };
};

export const createStarElement = (styles: StarStyle): HTMLDivElement => {
  const star = document.createElement('div');
  star.className = 'star';
  Object.assign(star.style, {
    width: styles.width,
    height: styles.height,
    left: styles.left,
    top: styles.top,
    animationDelay: styles.animationDelay,
    animationDuration: styles.animationDuration,
    position: 'absolute',
    pointerEvents: 'none'
  });
  return star;
};

export const createShootingStarElement = (styles: ShootingStarStyle): HTMLDivElement => {
  const shootingStar = document.createElement('div');
  shootingStar.className = 'star shooting';
  Object.assign(shootingStar.style, {
    left: styles.left,
    top: styles.top,
    transform: styles.transform,
    position: 'absolute',
    pointerEvents: 'none'
  });
  return shootingStar;
};
