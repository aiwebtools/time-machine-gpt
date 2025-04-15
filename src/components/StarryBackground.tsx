
import React from 'react';
import { useStarryBackground } from '@/hooks/useStarryBackground';

interface StarryBackgroundProps {
  containerRef: React.RefObject<HTMLElement>;
}

const StarryBackground = ({ containerRef }: StarryBackgroundProps) => {
  useStarryBackground(containerRef);
  return null;
};

export default StarryBackground;
