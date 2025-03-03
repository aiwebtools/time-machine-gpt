
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TimelineAnimationProps {
  className?: string;
}

const TimelineAnimation: React.FC<TimelineAnimationProps> = ({ className }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeMarkerIndex, setActiveMarkerIndex] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    
    // Create stars
    for (let i = 0; i < 75; i++) {
      createStar(timeline);
    }
    
    // Create time markers
    const markers = [
      { year: "3000 BCE", description: "Dawn of Civilization", position: "5%" },
      { year: "1500 BCE", description: "Bronze Age", position: "15%" },
      { year: "500 BCE", description: "Classical Antiquity", position: "30%" },
      { year: "500 CE", description: "Middle Ages", position: "45%" },
      { year: "1500 CE", description: "Renaissance", position: "60%" },
      { year: "1900 CE", description: "Modern Era", position: "75%" },
      { year: "Present", description: "Information Age", position: "90%" },
    ];
    
    const track = document.createElement('div');
    track.className = 'timeline-track w-[85%] h-1 bg-gradient-to-r from-time-accent/20 via-time-accent/80 to-time-accent/20 mx-auto mt-16 relative rounded-full overflow-hidden';
    timeline.appendChild(track);
    
    // Add pulsing light effect to track
    const light = document.createElement('div');
    light.className = 'absolute h-full w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-30';
    light.style.animation = 'timeline-light 4s linear infinite';
    track.appendChild(light);
    
    markers.forEach((marker, index) => {
      const markerElement = document.createElement('div');
      markerElement.className = 'time-marker absolute w-5 h-5 -mt-2 rounded-full bg-time-accent border-2 border-time-accent/80 cursor-pointer transform transition-all duration-300 hover:scale-125 hover:bg-time-accent hover:border-white';
      markerElement.style.left = marker.position;
      markerElement.dataset.index = index.toString();
      
      // Event listeners for hover effects
      markerElement.addEventListener('mouseenter', () => {
        setActiveMarkerIndex(index);
        setIsHovering(true);
      });
      
      markerElement.addEventListener('mouseleave', () => {
        setIsHovering(false);
      });
      
      const label = document.createElement('div');
      label.className = 'absolute text-sm font-medium text-white whitespace-nowrap -bottom-8 transition-all duration-300';
      label.textContent = marker.year;
      label.style.left = '50%';
      label.style.transform = 'translateX(-50%)';
      
      const dot = document.createElement('div');
      dot.className = 'absolute inset-0 animate-ping rounded-full bg-time-accent opacity-75 duration-700';
      
      markerElement.appendChild(dot);
      markerElement.appendChild(label);
      track.appendChild(markerElement);
    });
    
    // Animation logic for markers
    function animateTimeline() {
      if (isHovering) return;
      
      const timeMarkers = timeline.querySelectorAll('.time-marker');
      let currentIndex = 0;
      
      const intervalId = setInterval(() => {
        // Reset previous marker
        timeMarkers.forEach(marker => {
          (marker as HTMLElement).style.transform = 'scale(1)';
          (marker as HTMLElement).style.boxShadow = 'none';
        });
        
        // Highlight current marker
        const marker = timeMarkers[currentIndex] as HTMLElement;
        marker.style.transform = 'scale(1.3)';
        marker.style.boxShadow = '0 0 15px 5px rgba(194, 160, 110, 0.7)';
        setActiveMarkerIndex(parseInt(marker.dataset.index || '0'));
        
        currentIndex = (currentIndex + 1) % timeMarkers.length;
        
        if (currentIndex === 0) {
          clearInterval(intervalId);
          setTimeout(() => {
            setActiveMarkerIndex(null);
            animateTimeline();
          }, 2000);
        }
      }, 800);
      
      return intervalId;
    }
    
    // Start animation after a delay
    const timeout = setTimeout(() => {
      const intervalId = animateTimeline();
      return () => clearInterval(intervalId);
    }, 1000);
    
    return () => {
      clearTimeout(timeout);
    };
  }, [isHovering]);
  
  // Create a random star element
  const createStar = (container: HTMLElement) => {
    const star = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const twinkleDelay = Math.random() * 4;
    
    star.className = 'star absolute rounded-full bg-white';
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.opacity = `${Math.random() * 0.7 + 0.3}`;
    star.style.animation = `twinkle 4s ease-in-out ${twinkleDelay}s infinite`;
    
    container.appendChild(star);
  };
  
  const descriptions = [
    "Dawn of early civilizations - Sumerians, Egyptians, and early writing systems emerge.",
    "Height of Bronze Age empires - Mycenaeans, Hittites, and Egyptian New Kingdom flourish.",
    "Age of philosophy and classical knowledge - Greek, Roman, and Chinese golden ages.",
    "Medieval world takes shape - Rise of empires, religions spread across continents.",
    "Renaissance and Age of Discovery transforms Europe and connects distant worlds.",
    "Industrial revolution and modern technology reshape human society forever.",
    "Digital technology and globalization create unprecedented connectivity.",
  ];
  
  return (
    <div className="space-y-4">
      <div 
        ref={timelineRef} 
        className={cn(
          "relative w-full h-64 overflow-hidden bg-gradient-to-b from-[#121a29] to-[#0a0f18] rounded-xl border border-blue-900/30 shadow-xl",
          className
        )}
      >
        {/* Timeline description appears when a marker is hovered/active */}
        <div className={cn(
          "absolute top-6 left-0 right-0 text-center transition-all duration-500 px-6 h-16",
          activeMarkerIndex !== null ? "opacity-100" : "opacity-0"
        )}>
          <div className="glass-effect p-4 rounded-lg inline-block max-w-3xl">
            <p className="text-base text-white font-medium">
              {activeMarkerIndex !== null ? descriptions[activeMarkerIndex] : ""}
            </p>
          </div>
        </div>
        
        {/* Fix: Replace jsx prop with standard React style element */}
        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          @keyframes timeline-light {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(1000%); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default TimelineAnimation;
