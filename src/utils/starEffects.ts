
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

interface DivineStar extends StarStyle {
  filter: string;
  boxShadow: string;
}

export const createBasicStar = (): StarStyle => {
  const size = Math.random() * 4 + 1;
  const opacity = Math.random() * 0.9 + 0.1;
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 8}s`,
    animationDuration: `${Math.random() * 6 + 2}s`,
    opacity: `${opacity}`
  };
};

export const createDivineStar = (): DivineStar => {
  const size = Math.random() * 6 + 2;
  const opacity = Math.random() * 0.8 + 0.2;
  const hue = Math.random() * 60 + 30; // Golden hues
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 10}s`,
    animationDuration: `${Math.random() * 8 + 3}s`,
    opacity: `${opacity}`,
    filter: `hue-rotate(${hue}deg) brightness(1.5) saturate(1.2)`,
    boxShadow: `0 0 ${size * 2}px rgba(194, 160, 110, 0.8), 0 0 ${size * 4}px rgba(255, 215, 0, 0.4)`
  };
};

export const createShootingStar = (): ShootingStarStyle => {
  const startX = Math.random() * 30;
  const startY = Math.random() * 50;
  const size = Math.random() * 6 + 3;
  const rotation = -45 + (Math.random() * 30 - 15);
  
  return {
    width: `${size * 2}px`,
    height: `${Math.max(1, size/3)}px`,
    left: `${startX}%`,
    top: `${startY}%`,
    animationDuration: `${Math.random() * 6 + 2}s`,
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

export const createDivineStarElement = (styles: DivineStar): HTMLDivElement => {
  const star = document.createElement('div');
  star.className = 'star divine-star';
  Object.assign(star.style, styles);
  return star;
};

export const createShootingStarElement = (styles: ShootingStarStyle): HTMLDivElement => {
  const shootingStar = document.createElement('div');
  shootingStar.className = 'star shooting divine-shooting';
  Object.assign(shootingStar.style, styles);
  return shootingStar;
};
