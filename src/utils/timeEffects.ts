
/**
 * Time travel explosion effect utility
 * Creates visual effects and animations for time travel transitions
 */

// Create explosion particles for the time travel effect
export const createTimePortalEffect = (destinationUrl: string) => {
  // Create container for the effect
  const container = document.createElement('div');
  container.className = 'fixed inset-0 z-50 pointer-events-none overflow-hidden';
  document.body.appendChild(container);
  
  // Generate explosion particles
  const colors = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#ea384c', '#10B981', '#EC4899'];
  
  // Create time spiral vortex
  for (let i = 0; i < 6; i++) {
    const spiral = document.createElement('div');
    spiral.className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none';
    spiral.style.width = `${300 + i * 100}px`;
    spiral.style.height = `${300 + i * 100}px`;
    spiral.style.borderRadius = '50%';
    spiral.style.border = `${4 + i}px solid ${colors[i % colors.length]}`;
    spiral.style.borderStyle = i % 2 ? 'dashed' : 'solid';
    spiral.style.opacity = `${0.8 - i * 0.1}`;
    spiral.style.animation = `vortex-spin ${3 + i * 0.5}s cubic-bezier(0.075, 0.82, 0.165, 1) forwards`;
    container.appendChild(spiral);
  }
  
  // Create energy waves
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const energyWave = document.createElement('div');
      energyWave.className = 'energy-wave';
      container.appendChild(energyWave);
    }, i * 150);
  }
  
  // Add central time portal
  const timePortal = document.createElement('div');
  timePortal.className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none';
  timePortal.style.width = '150px';
  timePortal.style.height = '150px';
  timePortal.style.borderRadius = '50%';
  timePortal.style.background = 'radial-gradient(circle, rgba(213,63,140,1) 0%, rgba(139,92,246,0.8) 40%, rgba(14,165,233,0) 70%)';
  timePortal.style.boxShadow = '0 0 50px rgba(213,63,140,0.8), 0 0 100px rgba(139,92,246,0.5)';
  timePortal.style.animation = 'portal-pulse 3s ease-in-out infinite';
  container.appendChild(timePortal);
  
  // Create swirling particles that orbit around the portal
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      createSwirlingParticle(container, colors);
    }, i * 30);
  }
  
  // Create vortex rings
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const vortexRing = document.createElement('div');
      vortexRing.className = 'vortex-ring';
      vortexRing.style.width = `${100 + i * 30}px`;
      vortexRing.style.height = `${100 + i * 30}px`;
      vortexRing.style.borderWidth = `${4 + Math.random() * 8}px`;
      container.appendChild(vortexRing);
    }, i * 150);
  }
  
  // Create lightning bolts
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      createLightningBolt(container);
    }, i * 70);
  }
  
  // Create particles
  for (let i = 0; i < 180; i++) {
    setTimeout(() => {
      createExplosionParticle(container, colors);
    }, i * 15);
  }
  
  // Full screen flash
  const flash = document.createElement('div');
  flash.className = 'fixed inset-0 bg-white z-40 pointer-events-none fullscreen-flash';
  flash.style.animation = 'flash-fade 2.8s forwards';
  document.body.appendChild(flash);
  
  // Add time warp effect to the body
  document.body.classList.add('time-warp');
  setTimeout(() => {
    document.body.classList.remove('time-warp');
  }, 2800);
  
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
      oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 2.5);
      
      // Create gain node for volume control
      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.5);
      
      // Create oscillator for the portal sound
      const portalOsc = audioCtx.createOscillator();
      portalOsc.type = 'sawtooth';
      portalOsc.frequency.setValueAtTime(200, audioCtx.currentTime);
      portalOsc.frequency.setValueAtTime(300, audioCtx.currentTime + 0.5);
      portalOsc.frequency.setValueAtTime(150, audioCtx.currentTime + 1);
      portalOsc.frequency.setValueAtTime(400, audioCtx.currentTime + 1.5);
      portalOsc.frequency.linearRampToValueAtTime(50, audioCtx.currentTime + 2.5);
      
      const portalGain = audioCtx.createGain();
      portalGain.gain.setValueAtTime(0, audioCtx.currentTime);
      portalGain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.2);
      portalGain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 2);
      portalGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2.5);
      
      // Connect everything
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      portalOsc.connect(portalGain);
      portalGain.connect(audioCtx.destination);
      
      // Start and stop
      oscillator.start();
      portalOsc.start();
      oscillator.stop(audioCtx.currentTime + 2.8);
      portalOsc.stop(audioCtx.currentTime + 2.8);
    }
  } catch (e) {
    console.log('Audio not supported', e);
  }
  
  // Clean up after animation completes and redirect
  setTimeout(() => {
    container.remove();
    flash.remove();
    
    // Redirect to destination
    window.open(destinationUrl, '_blank');
  }, 2800);
};

// Helper function to create swirling particles that orbit the portal
const createSwirlingParticle = (container: HTMLElement, colors: string[]) => {
  const particle = document.createElement('div');
  const size = Math.random() * 10 + 5;
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  particle.className = 'absolute rounded-full pointer-events-none swirling-particle';
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.background = color;
  particle.style.boxShadow = `0 0 ${size/1.5}px ${color}`;
  
  // Position relative to center
  particle.style.left = '50%';
  particle.style.top = '50%';
  
  // Random angle and distance from center
  const angle = Math.random() * Math.PI * 2;
  const distance = 50 + Math.random() * 150; // Distance from center
  const startX = Math.cos(angle) * distance;
  const startY = Math.sin(angle) * distance;
  
  // Animation properties
  const duration = 2 + Math.random() * 2;
  const rotations = 2 + Math.random() * 3;
  const direction = Math.random() > 0.5 ? 1 : -1;
  const delay = Math.random() * 1;
  
  particle.style.transform = `translate(calc(${startX}px - 50%), calc(${startY}px - 50%))`;
  particle.style.opacity = '0';
  
  container.appendChild(particle);
  
  // Create keyframe animation for the particle
  const keyframes = `
    @keyframes orbit-${angle.toFixed(3).replace('.', '')}-${distance.toFixed(0)} {
      0% {
        transform: translate(calc(${startX}px - 50%), calc(${startY}px - 50%)) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.9;
      }
      90% {
        opacity: 0.7;
      }
      100% {
        transform: translate(calc(${startX}px - 50%), calc(${startY}px - 50%)) rotate(${360 * rotations * direction}deg);
        opacity: 0;
      }
    }
  `;
  
  const styleElement = document.createElement('style');
  styleElement.innerHTML = keyframes;
  document.head.appendChild(styleElement);
  
  // Apply animation
  setTimeout(() => {
    particle.style.animation = `orbit-${angle.toFixed(3).replace('.', '')}-${distance.toFixed(0)} ${duration}s ease-in-out forwards`;
    
    // Remove from DOM after animation
    setTimeout(() => {
      particle.remove();
      styleElement.remove();
    }, duration * 1000);
  }, delay * 1000);
};

// Helper function to create explosion particles
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
    particle.style.transition = `transform 2.5s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 2.5s ease-out`;
    particle.style.transform = `translate(calc(${endX}px - 50%), calc(${endY}px - 50%))`;
    particle.style.opacity = '0.9';
    
    // Fade out
    setTimeout(() => {
      particle.style.opacity = '0';
    }, 1200);
    
    // Remove from DOM after animation
    setTimeout(() => {
      particle.remove();
    }, 2500);
  }, 10);
};

// Helper function to create lightning bolt
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
