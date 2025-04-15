
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home } from 'lucide-react';

interface MobileNavItemProps {
  to: string;
  label?: string;
  onClick: () => void;
  isHome?: boolean;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({
  to,
  label,
  onClick,
  isHome = false
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const renderContent = () => {
    if (isHome) {
      return (
        <Home 
          size={20} 
          className={cn(
            "transition-colors",
            isActive ? "text-time-accent" : "text-gray-200"
          )}
        />
      );
    }
    
    return label;
  };

  return (
    <Link 
      to={to} 
      className={cn(
        "w-full py-3 px-4 rounded-lg transition-colors flex items-center",
        isActive 
          ? "bg-gray-700/50 text-time-accent font-medium" 
          : "hover:bg-gray-700/30 text-gray-200"
      )}
      onClick={onClick}
    >
      {renderContent()}
      {isActive && (
        <span className="ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 6 6 9-9"/>
          </svg>
        </span>
      )}
    </Link>
  );
};

export default MobileNavItem;

