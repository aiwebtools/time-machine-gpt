
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { useFacebookBrowser } from "./hooks/use-facebook-browser";
import { useEffect, useRef } from "react";
import ElevenLabsVoiceAgent from "./components/ElevenLabsVoiceAgent";
import "./App.css";

// Component to generate streaking stars that will persist across all pages
const StreakingStars = () => {
  const starsContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = starsContainerRef.current;
    if (!container) return;
    
    // Clear any existing stars
    container.innerHTML = '';
    
    // Create streaking stars
    const createStreakingStar = () => {
      if (!container) return;
      
      const star = document.createElement('div');
      star.className = 'streaking-star';
      
      // Random starting position within the viewport
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      
      // Set properties
      star.style.left = `${startX}px`;
      star.style.top = `${startY}px`;
      star.style.opacity = (Math.random() * 0.7 + 0.3).toString(); // 0.3 - 1.0
      star.style.animationDuration = `${Math.random() * 8 + 4}s`; // 4-12s
      star.style.animationDelay = `${Math.random() * 5}s`;
      
      // Add to container
      container.appendChild(star);
      
      // Remove after animation completes to prevent memory build-up
      setTimeout(() => {
        star.remove();
        createStreakingStar();
      }, parseFloat(star.style.animationDuration) * 1000 + parseFloat(star.style.animationDelay) * 1000);
    };
    
    // Create initial batch of stars
    for (let i = 0; i < 20; i++) {
      createStreakingStar();
    }
    
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);
  
  return (
    <div 
      ref={starsContainerRef} 
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

// Function to hide Lovable badge by targeting all possible selectors
const hideLovableBadge = () => {
  useEffect(() => {
    const hideBadge = () => {
      // Target all possible badge selectors
      const badgeSelectors = [
        '.gpte-badge', 
        '.gpt-engineer-badge', 
        '.lovable-badge', 
        '#lovable-badge',
        '[data-lovable-badge]',
        '.gpt-badge',
        '#gpte-badge'
      ];
      
      badgeSelectors.forEach(selector => {
        const badges = document.querySelectorAll(selector);
        badges.forEach(badge => {
          if (badge instanceof HTMLElement) {
            badge.style.display = 'none';
            badge.style.visibility = 'hidden';
            badge.style.opacity = '0';
            badge.style.height = '0';
            badge.style.width = '0';
            badge.style.margin = '0';
            badge.style.padding = '0';
            badge.style.pointerEvents = 'none';
          }
        });
      });
    };

    // Run immediately
    hideBadge();
    
    // Also run after a delay to catch dynamically added badges
    setTimeout(hideBadge, 500);
    setTimeout(hideBadge, 1500);
    
    // Set up a mutation observer to catch dynamically added badges
    const observer = new MutationObserver(hideBadge);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    return () => observer.disconnect();
  }, []);
};

const queryClient = new QueryClient();

const AppRoutes = () => {
  // Use the hook to detect Facebook browser
  useFacebookBrowser();
  // Hide Lovable badge
  hideLovableBadge();
  
  return (
    <>
      <StreakingStars />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ElevenLabsVoiceAgent />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
