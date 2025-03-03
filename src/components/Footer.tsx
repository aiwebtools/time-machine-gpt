
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Instagram } from 'lucide-react';

// Custom TikTok icon since it's not available in lucide-react
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
  return <footer className="bg-time-dark text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
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
            <p className="text-white/70 text-sm max-w-xs">
              Experience history like never before with our immersive time travel experience. Journey through the ages and discover the past with vivid detail.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-time-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-time-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="http://collegedegreegpt.xyz/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-time-accent transition-colors">
                  College Degree GPT
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
    </footer>;
};
export default Footer;
