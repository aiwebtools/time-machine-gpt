
import React from 'react';
import { Link } from 'react-router-dom';

interface MobileNavItemProps {
  to: string;
  label: string;
  onClick: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({
  to,
  label,
  onClick
}) => (
  <Link 
    to={to} 
    className="w-full py-2 hover:bg-gray-100 px-2 rounded text-time-dark transition-colors" 
    onClick={onClick}
  >
    {label}
  </Link>
);

export default MobileNavItem;
