
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  label: string;
  isScrolled: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  to,
  label,
  isScrolled
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={cn(
        "relative font-medium hover:text-time-accent transition-colors",
        "after:absolute after:w-0 after:h-0.5 after:bg-time-accent after:left-0 after:-bottom-1",
        "hover:after:w-full after:transition-all after:duration-300",
        isActive ? "text-time-accent after:w-full" : "",
        isScrolled ? "text-time-dark" : "text-time-accent"
      )}
    >
      {label}
    </Link>
  );
};

export default NavItem;
