import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Instagram, Mail, Phone } from 'lucide-react';
import { createTimePortalEffect } from '@/utils/timeEffects';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 20}
    height={props.height || 20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
    <path d="M20 9V6a2 2 0 0 0-2-2h-2.5"></path>
    <path d="M15 12v-2a2 2 0 0 0-2-2h-2"></path>
    <path d="M20 9c-5.847.008-9.429-4.964-10-9"></path>
  </svg>
);

const Footer: React.FC = () => {
  const location = useLocation();
  const TIME_MACHINE_URL = "https://chatgpt.com/g/g-t8s65Zh0j-time-machine-gpt";
  const BOOK_WRITER_URL = "https://chatgpt.com/g/g-67fdcb6a97508191bb1926a1cf8a4624-time-machine-interactive-book-writer-v9";
  
  const handleTimeMachineClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(TIME_MACHINE_URL);
  };

  const handleBookWriterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(BOOK_WRITER_URL);
  };

  return (
    <footer className="bg-time-dark text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex flex-col items-start">
              <div className="flex items-center space-x-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-time-accent">
                  <div className="absolute inset-0 bg-time-medium"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full border-2 border-time-accent relative animate-clock-spin-slow">
                      <div className="clock-hand hour-hand"></div>
                      <div className="clock-hand minute-hand"></div>
                    </div>
                  </div>
                </div>
                <span className="font-serif text-xl font-medium">TIME MACHINE GPT</span>
              </div>
              <span className="text-[10px] font-medium text-time-accent/90 ml-10">
                Presented by AiWebTools.Ai
              </span>
            </div>
            
            <div className="space-y-3">
              <p className="text-white/70 text-sm max-w-xs">
                Experience history like never before with our immersive time travel experience.
              </p>
              
              <div className="space-y-2">
                <h4 className="text-time-accent font-medium text-sm">CONTACT INFORMATION</h4>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-time-accent" />
                  <a href="tel:+14758008096" className="text-white/70 hover:text-time-accent transition-colors text-sm">
                    (475) 800-8096
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-time-accent" />
                  <a href="mailto:Contact@ai-webtools.com" className="text-white/70 hover:text-time-accent transition-colors text-sm">
                    Contact@ai-webtools.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className={cn(
                    "text-white/70 hover:text-time-accent transition-colors",
                    location.pathname === "/" && "text-time-accent"
                  )}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={cn(
                    "text-white/70 hover:text-time-accent transition-colors",
                    location.pathname === "/about" && "text-time-accent"
                  )}
                >
                  About
                </Link>
              </li>
              <li>
                <a 
                  href={TIME_MACHINE_URL}
                  onClick={handleTimeMachineClick}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-time-accent transition-colors"
                >
                  THE ORIGINAL TIME MACHINE GPT
                </a>
              </li>
              <li>
                <a 
                  href={BOOK_WRITER_URL} 
                  onClick={handleBookWriterClick} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-time-accent transition-colors"
                >
                  Interactive Time Machine Book Writer
                </a>
              </li>
              <li>
                <a 
                  href="https://chatgpt.com/g/g-67fdcb6a97508191bb1926a1cf8a4624-time-machine-interactive-story-writer-v9" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-time-accent transition-colors"
                >
                  Time Machine Interactive Story Writer V9
                </a>
              </li>
              <li>
                <a href="https://talk-to-history-gpt.lovable.app/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-time-accent transition-colors">
                  Talk to History GPT
                </a>
              </li>
              <li>
                <a href="https://chatgpt.com/g/g-686a172232648191b2fe8d0224e5d997-black-history-matters-time-machine" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-time-accent transition-colors">
                  Black History Matters Time Machine
                </a>
              </li>
              <li>
                <a href="https://aiwebtools.ai/terms-of-services" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-time-accent transition-colors">
                  User Terms of Usage
                </a>
              </li>
              <li>
                <a href="https://www.aiwebtools.ai" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-time-accent transition-colors">
                  MORE AI TOOLS
                </a>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <a 
              href="https://www.aiwebtools.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-60 h-32 bg-time-accent hover:bg-time-accent/90 transition-colors flex flex-col items-center justify-center text-time-dark font-bold text-center p-4 rounded-md border-2 border-white/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-time-accent/10 via-transparent to-black/20 z-0"></div>
              <div className="absolute inset-0 opacity-30">
                <div className="absolute h-1 w-1 bg-white rounded-full top-[20%] left-[10%] animate-pulse"></div>
                <div className="absolute h-1 w-1 bg-white rounded-full top-[70%] left-[80%] animate-pulse"></div>
                <div className="absolute h-1 w-1 bg-white rounded-full top-[40%] left-[60%] animate-pulse"></div>
                <div className="absolute h-1 w-1 bg-white rounded-full top-[30%] left-[30%] animate-pulse"></div>
                <div className="absolute h-1 w-1 bg-white rounded-full top-[60%] left-[50%] animate-pulse"></div>
              </div>
              <span className="text-xl font-mono tracking-wide z-10 font-bold text-shadow-enhanced uppercase bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">GO TO AI WEB TOOLS MAINFRAME</span>
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            © 2025 AI WEB TOOLS LLC. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="https://www.instagram.com/aiwebtools.ai" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://www.tiktok.com/@aiwebtools" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
              <TikTokIcon width={20} height={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
