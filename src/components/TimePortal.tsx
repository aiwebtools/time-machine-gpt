import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TimePortalProps {
  onStartJourney: (destination: string, date: string) => void;
  timeDestinationUrl: string;
  className?: string;
}

const TimePortal: React.FC<TimePortalProps> = ({ onStartJourney, timeDestinationUrl, className }) => {
  const [portalActive, setPortalActive] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(true);
  const [exploding, setExploding] = useState(false);
  
  useEffect(() => {
    // Clean up any explosion particles when component unmounts
    return () => {
      const explosionElements = document.querySelectorAll('.explosion-particle, .lightning-bolt, .vortex-ring, .energy-wave');
      explosionElements.forEach(el => el.remove());
      
      const flashElement = document.querySelector('.fullscreen-flash');
      if (flashElement) flashElement.remove();
    };
  }, []);
  
  const createExplosion = () => {
    const isMobile = window.innerWidth < 768;
    setExploding(true);
    
    // Create container for the effect
    const container = document.createElement('div');
    container.className = 'fixed inset-0 z-50 pointer-events-none overflow-hidden';
    document.body.appendChild(container);
    
    // Generate explosion particles
    const colors = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#ea384c', '#10B981', '#EC4899'];
    
    // Create energy waves
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const energyWave = document.createElement('div');
        energyWave.className = 'energy-wave';
        container.appendChild(energyWave);
      }, i * 200);
    }
    
    // Create vortex rings
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const vortexRing = document.createElement('div');
        vortexRing.className = 'vortex-ring';
        vortexRing.style.width = `${100 + i * 20}px`;
        vortexRing.style.height = `${100 + i * 20}px`;
        vortexRing.style.borderWidth = `${4 + Math.random() * 5}px`;
        container.appendChild(vortexRing);
      }, i * 150);
    }
    
    // Create lightning bolts
    const lightningCount = isMobile ? 10 : 25;
    for (let i = 0; i < lightningCount; i++) {
      setTimeout(() => {
        createLightningBolt(container);
      }, i * 80);
    }
    
    // Create particles
    const particleCount = isMobile ? 50 : 150;
    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        createExplosionParticle(container, colors);
      }, i * 10);
    }
    
    // Full screen flash
    const flash = document.createElement('div');
    flash.className = 'fixed inset-0 bg-white z-40 pointer-events-none fullscreen-flash';
    flash.style.animation = 'flash-fade 2s forwards';
    document.body.appendChild(flash);
    
    // Add time warp effect to the body
    document.body.classList.add('time-warp');
    setTimeout(() => {
      document.body.classList.remove('time-warp');
    }, 2000);
    
    // Create a dramatic sound effect
    try {
      // Create audio context
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      
      if (AudioContext) {
        const audioCtx = new AudioContext();
        
        // Create oscillator for the whoosh sound
        const oscillator = audioCtx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 1.5);
        
        // Create gain node for volume control
        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
        
        // Connect everything
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        // Start and stop
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 1.5);
      }
    } catch (e) {
      console.log('Audio not supported', e);
    }
    
    // Clean up after animation completes
    setTimeout(() => {
      container.remove();
      flash.remove();
      setExploding(false);
      
      // Now redirect to time machine
      window.open(timeDestinationUrl, '_blank', 'noopener,noreferrer');
    }, 2000);
  };
  
  const createExplosionParticle = (container: HTMLElement, colors: string[]) => {
    const particle = document.createElement('div');
    const size = Math.random() * 40 + 10;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.className = 'explosion-particle absolute rounded-full pointer-events-none';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = color;
    particle.style.boxShadow = `0 0 ${size/2}px ${color}`;
    
    // Position at center
    particle.style.left = '50%';
    particle.style.top = '50%';
    
    // Random starting position adjustment
    const offset = 100;
    const startX = (Math.random() * offset * 2) - offset;
    const startY = (Math.random() * offset * 2) - offset;
    
    // Random ending position - explode outward
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 1500;
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;
    
    // Animation
    particle.style.transform = `translate(calc(${startX}px - 50%), calc(${startY}px - 50%))`;
    particle.style.opacity = '0';
    
    container.appendChild(particle);
    
    // Trigger animation
    setTimeout(() => {
      particle.style.transition = `transform 1.5s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 1.5s ease-out`;
      particle.style.transform = `translate(calc(${endX}px - 50%), calc(${endY}px - 50%))`;
      particle.style.opacity = '0.9';
      
      // Fade out
      setTimeout(() => {
        particle.style.opacity = '0';
      }, 700);
      
      // Remove from DOM after animation
      setTimeout(() => {
        particle.remove();
      }, 1500);
    }, 10);
  };
  
  const createLightningBolt = (container: HTMLElement) => {
    const lightning = document.createElement('div');
    lightning.className = 'lightning-bolt absolute pointer-events-none';
    
    // Random position and rotation
    const startAngle = Math.random() * 360;
    const width = Math.random() * 15 + 3;
    const length = Math.random() * 800 + 300;
    
    lightning.style.width = `${width}px`;
    lightning.style.height = `${length}px`;
    
    // Randomize color
    const colors = ['rgba(255,255,255,0.9)', 'rgba(120,210,255,0.8)', 'rgba(147,51,234,0.7)'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    lightning.style.background = `linear-gradient(to bottom, ${color}, rgba(120,210,255,0.2))`;
    lightning.style.left = '50%';
    lightning.style.top = '50%';
    lightning.style.transform = `translate(-50%, -50%) rotate(${startAngle}deg)`;
    lightning.style.borderRadius = '4px';
    lightning.style.filter = 'blur(2px)';
    lightning.style.opacity = '0';
    
    container.appendChild(lightning);
    
    // Animate the lightning with multiple flashes
    setTimeout(() => {
      lightning.style.transition = 'opacity 0.1s ease-in';
      lightning.style.opacity = '1';
      
      setTimeout(() => {
        lightning.style.opacity = '0.3';
        
        setTimeout(() => {
          lightning.style.opacity = '0.7';
          
          setTimeout(() => {
            lightning.style.opacity = '0';
            
            setTimeout(() => {
              lightning.remove();
            }, 100);
          }, 100);
        }, 50);
      }, 100);
    }, Math.random() * 1000);
  };
  
  const handleStartJourney = () => {
    // Set default values since we no longer have input fields
    const destination = "Time Machine Experience";
    const date = "Present Day";
    
    setPortalActive(true);
    
    // Notify user
    toast.success("Initiating time travel sequence...", {
      duration: 3000,
    });
    
    // Create explosion and lightning effect, then redirect
    createExplosion();
    
    // Simulate portal activation
    setTimeout(() => {
      onStartJourney(destination, date);
      setPortalActive(false);
    }, 3000);
  };
  
  // Add useEffect for handling resize events for better responsiveness
  useEffect(() => {
    const handleResize = () => {
      // Force iframe to resize properly on orientation change
      const iframe = document.querySelector('iframe');
      if (iframe) {
        iframe.style.height = 'auto';
        iframe.style.height = iframe.offsetWidth * (9/16) + 'px';
      }
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    // Initial call
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);
  
  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl",
      "border border-time-accent/30",
      "glass-effect",
      portalActive && "animate-glow",
      className
    )}>
      <div className="absolute inset-0 time-portal-bg opacity-70"></div>
      
      {/* Animated backgrounds */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNDAlIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMTk0LCAxNjAsIDExMCwgMC4yKSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSI1LDMiLz48L3N2Zz4=')] opacity-50"></div>
      
      <div className={cn(
        "absolute left-1/2 top-1/2 w-60 h-60 -translate-x-1/2 -translate-y-1/2 rounded-full",
        "border border-time-accent/30",
        "transition-all duration-700 ease-in-out",
        portalActive ? "opacity-100 scale-[3]" : "opacity-30 scale-100"
      )}>
        <div className="absolute inset-0 bg-time-medium opacity-30 rounded-full"></div>
        <div className="w-full h-full animate-clock-spin">
          <div className="w-1 h-full absolute left-1/2 -translate-x-1/2 bg-gradient-to-b from-transparent via-time-accent/40 to-transparent"></div>
          <div className="h-1 w-full absolute top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-time-accent/40 to-transparent"></div>
        </div>
      </div>
      
      <div className="relative z-10">
        {/* Responsive video container */}
        <div className="w-full">
          <div className="aspect-video w-full">
            <iframe 
              className="w-full h-full shadow-xl"
              src="https://www.youtube.com/embed/J31nNY5_PB4?rel=0&modestbranding=1&autoplay=0&fs=1&color=white&iv_load_policy=3&playsinline=1&vq=hd720&disablekb=0"
              title="Time Machine Experience"
              loading="eager"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </div>
        
        {/* Improved mobile-friendly button with proper spacing */}
        <div className="py-4 sm:py-6 px-3 sm:px-4 max-w-md mx-auto">
          <button
            onClick={handleStartJourney}
            disabled={exploding}
            className="btn-pulse w-full py-3 rounded-md transition-all duration-300 relative overflow-hidden
              font-medium text-white bg-time-accent hover:bg-time-accent/90 cursor-pointer
              shadow-md hover:shadow-lg active:shadow-sm active:translate-y-0.5
              disabled:opacity-70 disabled:pointer-events-none"
          >
            <span className={cn(
              "absolute inset-0 flex items-center justify-center",
              portalActive ? "opacity-100" : "opacity-0"
            )}>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Initializing Time Portal...
            </span>
            <span className={cn(
              "absolute inset-0 flex items-center justify-center",
              portalActive ? "opacity-0" : "opacity-100"
            )}>
              Begin Time Travel
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePortal;
