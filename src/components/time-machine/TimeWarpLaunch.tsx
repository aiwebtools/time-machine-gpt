import React from 'react';
import { cn } from '@/lib/utils';

type TimeWarpLaunchProps = {
  sequenceKey: number;
  destination: string;
  year: string;
};

const streaks = Array.from({ length: 32 }, (_, index) => ({
  angle: `${index * 11.25}deg`,
  delay: `${(index % 8) * 38}ms`,
  distance: `${120 + (index % 6) * 28}px`,
}));

const TimeWarpLaunch = ({ sequenceKey, destination, year }: TimeWarpLaunchProps) => {
  if (sequenceKey === 0) return null;

  return (
    <div key={sequenceKey} className="time-warp-launch" aria-hidden="true">
      <div className="time-warp-launch__tunnel" />
      <div className="time-warp-launch__core" />
      <div className="time-warp-launch__rings">
        {Array.from({ length: 7 }, (_, index) => (
          <span
            key={index}
            className="time-warp-launch__ring"
            style={{ '--ring-delay': `${index * 95}ms` } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="time-warp-launch__streaks">
        {streaks.map((streak, index) => (
          <span
            key={index}
            className={cn('time-warp-launch__streak', index % 5 === 0 && 'time-warp-launch__streak--bright')}
            style={
              {
                '--streak-angle': streak.angle,
                '--streak-delay': streak.delay,
                '--streak-distance': streak.distance,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <div className="time-warp-launch__coordinates">
        <span>Temporal lock acquired</span>
        <strong>{year}</strong>
        <small>{destination}</small>
      </div>
      <div className="time-warp-launch__flash" />
    </div>
  );
};

export default TimeWarpLaunch;