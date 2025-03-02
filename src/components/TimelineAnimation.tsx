
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TimelineAnimationProps {
  className?: string;
}

const TimelineAnimation: React.FC<TimelineAnimationProps> = ({ className }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    
    // Create stars
    for (let i = 0; i < 50; i++) {
      createStar(timeline);
    }
    
    // Create time markers
    const markers = [
      { year: "1500 BCE", position: "10%" },
      { year: "500 BCE", position: "25%" },
      { year: "500 CE", position: "40%" },
      { year: "1500 CE", position: "60%" },
      { year: "1900 CE", position: "75%" },
      { year: "Present", position: "90%" },
    ];
    
    const track = document.createElement('div');
    track.className = 'timeline-track w-[80%] mx-auto mt-12';
    timeline.appendChild(track);
    
    markers.forEach(marker => {
      const markerElement = document.createElement('div');
      markerElement.className = 'time-marker animate-pulse';
      markerElement.style.left = marker.position;
      
      const label = document.createElement('div');
      label.className = 'absolute text-xs text-time-accent whitespace-nowrap -bottom-8';
      label.textContent = marker.year;
      label.style.left = '50%';
      label.style.transform = 'translateX(-50%)';
      
      markerElement.appendChild(label);
      track.appendChild(markerElement);
    });
    
    // Animation logic
    function animateTimeline() {
      const timeMarkers = timeline.querySelectorAll('.time-marker');
      timeMarkers.forEach((marker, index) => {
        setTimeout(() => {
          (marker as HTMLElement).style.boxShadow = '0 0 10px 3px rgba(194, 160, 110, 0.7)';
          setTimeout(() => {
            (marker as HTMLElement).style.boxShadow = 'none';
          }, 700);
        }, index * 500);
      });
    }
    
    const interval = setInterval(animateTimeline, 4000);
    animateTimeline();
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  // Create a random star element
  const createStar = (container: HTMLElement) => {
    const star = document.createElement('div');
    const size = Math.random() * 3 + 1;
    
    star.className = 'star';
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    star.style.opacity = `${Math.random() * 0.7 + 0.3}`;
    
    container.appendChild(star);
  };
  
  return (
    <div 
      ref={timelineRef} 
      className={cn(
        "relative w-full h-40 overflow-hidden",
        className
      )}
    />
  );
};

export default TimelineAnimation;
