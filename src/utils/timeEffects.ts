
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
  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      createLightningBolt(container);
    }, i * 80);
  }
  
  // Create particles
  for (let i = 0; i < 150; i++) {
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
  
  // Clean up after animation completes and redirect
  setTimeout(() => {
    container.remove();
    flash.remove();
    
    // Redirect to destination
    window.open(destinationUrl, '_blank');
  }, 2000);
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
