
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import TimelineSection from '@/components/TimelineSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Features from '@/components/Features';
import CtaSection from '@/components/CtaSection';
import { cn } from '@/lib/utils';

const TIME_MACHINE_URL = "https://chatgpt.com/g/g-t8s65Zh0j-time-machine-gpt";

const Index = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const revealRefs = useRef<HTMLElement[]>([]);
  const heroSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    revealRefs.current.forEach(el => observer.observe(el));
    const progressBar = document.querySelector('.progress-bar');
    const updateProgress = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      const totalHeight = docHeight - windowHeight;
      const progress = scrollPosition / totalHeight * 100;
      if (progressBar instanceof HTMLElement) {
        progressBar.style.width = `${progress}%`;
      }
    };
    window.addEventListener('scroll', updateProgress);
    
    // Enhanced star animation
    const heroSection = heroSectionRef.current;
    if (heroSection) {
      // Clear any existing stars first (in case of re-renders)
      const existingStars = heroSection.querySelectorAll('.star');
      existingStars.forEach(star => star.remove());
      
      // Add new stars with enhanced animations
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1;
        star.className = 'star';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        heroSection.appendChild(star);
      }
      
      // Add a few shooting stars
      for (let i = 0; i < 5; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'star shooting';
        shootingStar.style.left = `${Math.random() * 100}%`;
        shootingStar.style.top = `${Math.random() * 50}%`;
        shootingStar.style.animationDelay = `${Math.random() * 15}s`;
        heroSection.appendChild(shootingStar);
      }
      
      // Modified parallax effect to avoid mouse jitter
      const parallaxEffect = (e: MouseEvent) => {
        const stars = heroSection.querySelectorAll('.star:not(.shooting)');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        requestAnimationFrame(() => {
          stars.forEach((star) => {
            const depth = Math.random() * 5;
            const moveX = (mouseX - 0.5) * depth;
            const moveY = (mouseY - 0.5) * depth;
            
            if (star instanceof HTMLElement) {
              star.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
          });
        });
      };
      
      // Throttle the mousemove event to reduce flicker
      let lastTime = 0;
      const throttledParallaxEffect = (e: MouseEvent) => {
        const now = Date.now();
        if (now - lastTime >= 50) { // Limit to executing at most once every 50ms
          lastTime = now;
          parallaxEffect(e);
        }
      };
      
      window.addEventListener('mousemove', throttledParallaxEffect);
      
      return () => {
        clearTimeout(timer);
        observer.disconnect();
        window.removeEventListener('scroll', updateProgress);
        window.removeEventListener('mousemove', throttledParallaxEffect);
      };
    }
    
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const handleStartJourney = (destination: string, date: string) => {
    toast.success("Time travel initiated!", {
      description: `Preparing journey to ${destination} in ${date}`,
      duration: 3000
    });
  };

  const setHeroSectionRef = (el: HTMLElement | null) => {
    heroSectionRef.current = el;
  };
  
  // Add a properly throttled time travel handler to avoid flickering
  const handleTimeTravelClick = () => {
    try {
      window.open(TIME_MACHINE_URL, '_blank', 'noopener,noreferrer');
      toast.success("Launching Time Machine!", {
        description: "Prepare for an extraordinary journey through time",
        duration: 3000
      });
      console.log("Time travel button clicked!");
    } catch (error) {
      toast.error("Couldn't launch the Time Machine", {
        description: "Your browser may be blocking popups. Please allow popups or try a different browser.",
        duration: 5000
      });
    }
  };

  // Add a timeTravel section between Timeline and Testimonials
  const TimeTravelSectionBetween = () => (
    <section 
      ref={addToRefs as React.RefCallback<HTMLDivElement>} 
      className="reveal py-16 bg-time-dark text-white"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-glow">Ready to Embark on Your Journey?</h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg">
          The Time Machine is ready for your instructions. Where and when would you like to travel?
        </p>
        <button
          onClick={handleTimeTravelClick}
          className="px-10 py-4 bg-time-accent text-white text-lg rounded-md font-medium 
                   hover:bg-time-accent/90 transition-colors duration-300 
                   shadow-[0_0_15px_rgba(194,160,110,0.4)]"
        >
          Begin Time Travel Experience Now
        </button>
      </div>
    </section>
  );

  return (
    <div className={cn("min-h-screen flex flex-col transition-opacity duration-700", isLoaded ? "opacity-100" : "opacity-0")}>
      <div className="progress-container">
        <div className="progress-bar"></div>
      </div>
      
      <Navbar />
      
      <HeroSection 
        addToRefs={addToRefs} 
        onStartJourney={handleStartJourney}
        timeDestinationUrl={TIME_MACHINE_URL}
        setHeroSectionRef={setHeroSectionRef}
      />
      
      <TimelineSection addToRefs={addToRefs} />
      
      <TimeTravelSectionBetween />
      
      <TestimonialsSection addToRefs={addToRefs} />
      
      <Features addToRefs={addToRefs} />
      
      <CtaSection 
        addToRefs={addToRefs} 
        timeDestinationUrl={TIME_MACHINE_URL}
      />
      
      <Footer />
    </div>
  );
};

export default Index;
