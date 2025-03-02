
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Instagram, TikTok } from 'lucide-react';

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
              <TikTok size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
