import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { RotateCw, Clock, BookOpen, Image, MessageSquareText, GraduationCap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TimePortal from '@/components/TimePortal';
import TimelineAnimation from '@/components/TimelineAnimation';
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
      
      // Add parallax effect to stars
      const parallaxEffect = (e: MouseEvent) => {
        const stars = heroSection.querySelectorAll('.star:not(.shooting)');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        stars.forEach((star, index) => {
          const depth = Math.random() * 5;
          const moveX = (mouseX - 0.5) * depth;
          const moveY = (mouseY - 0.5) * depth;
          
          if (star instanceof HTMLElement) {
            star.style.transform = `translate(${moveX}px, ${moveY}px)`;
          }
        });
      };
      
      window.addEventListener('mousemove', parallaxEffect);
    }
    
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('scroll', updateProgress);
      
      if (heroSection) {
        window.removeEventListener('mousemove', (e: any) => {});
      }
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

  const handleTimeWarp = () => {
    toast.success("Time warp initiated!", {
      description: "Preparing to transport you through time...",
      duration: 2000
    });
  };

  const testimonials = [{
    quote: "The historical accuracy and immersive storytelling transported me back to Ancient Rome in a way no book or documentary ever could.",
    author: "Michael T.",
    location: "History Professor"
  }, {
    quote: "I was able to experience the Renaissance through the eyes of someone who lived it. The details were incredible!",
    author: "Sarah L.",
    location: "Art Historian"
  }, {
    quote: "I've used this with my students and they're finally excited about history. It's revolutionized my classroom.",
    author: "David K.",
    location: "High School Teacher"
  }];

  const features = [{
    title: "Vivid Historical Narratives",
    description: "Experience detailed first-person accounts that transport you to any time period with remarkable accuracy and immersion.",
    icon: <BookOpen className="text-time-accent h-6 w-6" />
  }, {
    title: "Authentic Visualizations",
    description: "View high-quality, historically accurate images of your surroundings that bring the past to life in vivid detail.",
    icon: <Image className="text-time-accent h-6 w-6" />
  }, {
    title: "Interactive Learning",
    description: "Ask questions and receive detailed responses from the perspective of someone living in that time period.",
    icon: <MessageSquareText className="text-time-accent h-6 w-6" />
  }, {
    title: "Educational Accuracy",
    description: "All historical content is meticulously researched and fact-checked for educational integrity and authenticity.",
    icon: <GraduationCap className="text-time-accent h-6 w-6" />
  }];

  return <div className={cn("min-h-screen flex flex-col transition-opacity duration-700", isLoaded ? "opacity-100" : "opacity-0")}>
      <div className="progress-container">
        <div className="progress-bar"></div>
      </div>
      
      <Navbar />
      
      <section 
        ref={(el) => { 
          if (el) heroSectionRef.current = el; 
          addToRefs(el);
        }} 
        className="relative min-h-screen flex flex-col justify-center hero-section overflow-hidden space-bg"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-time-dark via-time-medium to-time-dark z-0 opacity-80"></div>
        
        <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none z-0">
          <div className="relative">
            <div className="w-[600px] h-[600px] rounded-full border-2 border-time-accent/20 animate-clock-spin-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-[400px] h-[400px] rounded-full border border-time-accent/30 animate-clock-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{
            animationDirection: 'reverse'
          }}></div>
            <div className="w-[200px] h-[200px] rounded-full border border-time-accent/50 animate-clock-spin-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-[100px] h-[100px] rounded-full bg-time-accent/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse blur-md"></div>
            <div className="w-[600px] h-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-clock-spin">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-time-accent/20 to-transparent absolute top-1/2 -translate-y-1/2"></div>
              <div className="h-full w-1 bg-gradient-to-b from-transparent via-time-accent/20 to-transparent absolute left-1/2 -translate-x-1/2"></div>
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-time-accent/10 to-transparent absolute top-1/2 -translate-y-1/2 rotate-45 origin-center"></div>
              <div className="h-full w-1 bg-gradient-to-b from-transparent via-time-accent/10 to-transparent absolute left-1/2 -translate-x-1/2 rotate-45 origin-center"></div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 py-10 md:py-20 flex-grow">
          <div className="grid grid-cols-1 gap-12 items-center">
            <div className="text-white space-y-6 max-w-2xl mx-auto text-center">
              <div ref={addToRefs} className="reveal inline-block px-3 py-1 bg-time-accent/10 border border-time-accent/30 rounded-full text-time-accent text-sm font-medium animate-pulse">
                Interactive Time Travel Experience
              </div>
              
              <h1 ref={addToRefs} className="reveal text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-shadow leading-tight">
                <span className="text-glow">Journey Through Time</span><br />
                <span className="text-shimmer">With Father Time</span>
              </h1>
              
              <div className="w-full mx-auto mt-8 mb-8">
                <TimePortal onStartJourney={handleStartJourney} timeDestinationUrl={TIME_MACHINE_URL} className="max-w-5xl mx-auto" />
              </div>
              
              <p ref={addToRefs} className="reveal text-lg text-white/80 max-w-xl mx-auto">
                Experience history like never before. Travel to any era, any location, and immerse yourself in vivid, historically accurate narratives and visuals.
              </p>
              
              <div ref={addToRefs} className="reveal flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                <a href={TIME_MACHINE_URL} target="_blank" rel="noopener noreferrer" className="btn-glow px-6 py-3 bg-time-accent text-white rounded-md font-medium hover:bg-time-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Start Your Journey
                </a>
                <a href="/about" className="btn-glow px-6 py-3 bg-transparent border border-white/30 text-white rounded-md font-medium hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-subtle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </section>
      
      <section className="py-20 bg-gradient-to-b from-time-dark to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div ref={addToRefs} className="reveal text-center max-w-3xl mx-auto mb-16 text-white">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Travel Across The Ages
            </h2>
            <p className="text-white/80">
              From ancient civilizations to recent history, explore any time period with unprecedented detail and immersion.
            </p>
          </div>
          
          <TimelineAnimation />
        </div>
      </section>
      
      <section className="py-20 bg-gradient-to-b from-time-dark via-time-medium to-time-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/c73d4e37-b0c3-4d03-9e63-4d000f6b90ad.png')] opacity-5 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-time-dark/80"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div ref={addToRefs} className="reveal text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 bg-time-medium/30 border border-time-accent/30 rounded-full text-time-accent text-sm font-medium mb-4">
              Key Features
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              An Unparalleled Time Travel Experience
            </h2>
            <p className="text-gray-300">
              Father Time combines cutting-edge AI with historical accuracy to create the most immersive time travel simulation available.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                ref={addToRefs} 
                className="reveal p-6 border border-time-accent/10 rounded-xl bg-time-dark/70 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(194,160,110,0.1)] hover:border-time-accent/30 hover:transform hover:scale-105 group"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-time-dark mb-4 border border-time-accent/20 group-hover:border-time-accent/50 transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-white mb-2 group-hover:text-time-accent transition-colors">{feature.title}</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a 
              href={TIME_MACHINE_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-glow inline-flex items-center gap-2 px-6 py-3 bg-time-medium/80 text-white rounded-md font-medium hover:bg-time-medium transition-all duration-300 hover:scale-105 hover:shadow-lg border border-time-accent/20 hover:border-time-accent/50"
            >
              <Clock className="h-5 w-5" /> 
              Experience It Now
            </a>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div ref={addToRefs} className="reveal text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-time-medium text-sm font-medium mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              What Time Travelers Are Saying
            </h2>
            <p className="text-gray-600">
              Hear from historians, educators, and history enthusiasts who have experienced Father Time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <div key={index} ref={addToRefs} className="reveal glass-effect rounded-xl p-6 transition-transform duration-300 hover:scale-105">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4 text-time-accent/70">
                  <path d="M13.5 21H9C9 13.5 14.5 10.4987 14.5 10.4987V15C12.5 15.5 12 17 12 18.5H13.5C14.3284 18.5 15 19.1716 15 20V25C15 25.8284 14.3284 26.5 13.5 26.5H8.5C7.67157 26.5 7 25.8284 7 25V20C7 19.1716 7.67157 18.5 8.5 18.5H10C10 16.4826 9.27834 13.4331 7 11C7 11 9 7 15 7C15 7 18 7.09468 18 10.4987C18 13.4987 15 14 13.5 21Z" fill="currentColor" />
                  <path d="M27.5 21H23C23 13.5 28.5 10.4987 28.5 10.4987V15C26.5 15.5 26 17 26 18.5H27.5C28.3284 18.5 29 19.1716 29 20V25C29 25.8284 28.3284 26.5 27.5 26.5H22.5C21.6716 26.5 21 25.8284 21 25V20C21 19.1716 21.6716 18.5 22.5 18.5H24C24 16.4826 23.2783 13.4331 21 11C21 11 23 7 29 7C29 7 32 7.09468 32 10.4987C32 13.4987 29 14 27.5 21Z" fill="currentColor" />
                </svg>
                
                <p className="mb-6 text-white/90 italic">"{testimonial.quote}"</p>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-time-medium flex items-center justify-center text-white font-serif">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-white">{testimonial.author}</div>
                    <div className="text-sm text-white/70">{testimonial.location}</div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>
      
      <section ref={addToRefs} className="reveal py-24 bg-gradient-to-r from-time-medium to-time-dark text-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 max-w-3xl mx-auto leading-tight">
            Ready to Embark on Your Time Travel Journey?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Start exploring the past with unprecedented detail and accuracy. Begin your adventure through history with Father Time.
          </p>
          <a href={TIME_MACHINE_URL} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-time-accent text-white rounded-md font-medium hover:bg-time-accent/90 transition-colors inline-block">
            Access Time Machine GPT
          </a>
        </div>
      </section>
      
      <Footer />
    </div>;
};

export default Index;
