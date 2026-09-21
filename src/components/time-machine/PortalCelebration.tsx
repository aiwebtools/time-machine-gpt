import React from 'react';
import { cn } from '@/lib/utils';

type PortalCelebrationProps = {
  burstKey: number;
  variant?: 'launch' | 'message' | 'arrival';
};

const particleCount = 22;

const PortalCelebration = ({ burstKey, variant = 'message' }: PortalCelebrationProps) => {
  if (burstKey === 0) return null;

  return (
    <div
      key={burstKey}
      aria-hidden="true"
      className={cn('portal-celebration', `portal-celebration--${variant}`)}
    >
      <span className="portal-celebration__ring" />
      <span className="portal-celebration__flash" />
      {Array.from({ length: particleCount }, (_, index) => (
        <span
          key={index}
          className="portal-celebration__particle"
          style={
            {
              '--particle-angle': `${(360 / particleCount) * index}deg`,
              '--particle-distance': `${68 + (index % 5) * 15}px`,
              '--particle-delay': `${(index % 4) * 22}ms`,
              '--particle-size': `${5 + (index % 3) * 2}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default PortalCelebration;