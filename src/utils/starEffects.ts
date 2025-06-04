
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
  const size = Math.random() * 3 + 1;
  const opacity = Math.random() * 0.7 + 0.3;
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${Math.random() * 4 + 3}s`,
    opacity: `${opacity}`
  };
};

export const createShootingStar = (): ShootingStarStyle => {
  const startX = Math.random() * 20;
  const startY = Math.random() * 40;
  const size = Math.random() * 4 + 2;
  const rotation = -45 + (Math.random() * 30 - 15);
  
  return {
    width: `${size}px`,
    height: `${Math.max(1, size/4)}px`,
    left: `${startX}%`,
    top: `${startY}%`,
    animationDuration: `${Math.random() * 4 + 3}s`,
    animationDelay: '0s',
    opacity: '1',
    transform: `rotate(${rotation}deg)`
  };
};

export const createStarElement = (styles: StarStyle): HTMLDivElement => {
  const star = document.createElement('div');
  star.className = 'star';
  Object.assign(star.style, styles);
  return star;
};

export const createShootingStarElement = (styles: ShootingStarStyle): HTMLDivElement => {
  const shootingStar = document.createElement('div');
  shootingStar.className = 'star shooting';
  Object.assign(shootingStar.style, styles);
  return shootingStar;
};
