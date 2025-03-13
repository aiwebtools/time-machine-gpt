
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MobileNavItemProps {
  to: string;
  label: string;
  onClick: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({
  to,
  label,
  onClick
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={cn(
        "w-full py-3 px-4 rounded-lg transition-colors flex items-center",
        isActive 
          ? "bg-gray-100 text-time-accent font-medium" 
          : "hover:bg-gray-50 text-time-dark"
      )}
      onClick={onClick}
    >
      {label}
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
