
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
        "w-full py-2 px-2 rounded transition-colors",
        isActive ? "bg-gray-100 text-time-accent" : "hover:bg-gray-100 text-time-dark"
      )}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default MobileNavItem;
