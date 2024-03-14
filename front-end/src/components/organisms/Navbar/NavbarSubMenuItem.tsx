import React from 'react';
import { Link } from 'react-router-dom';

export type NavbarSubMenuItemProps = {
  label: string;
  onClick?: () => void;
  to?: string;
};

export const NavbarSubMenuItem: React.FC<NavbarSubMenuItemProps> = ({ label, to, onClick }) => {
  const props = {
    to: to as string,
    onClick
  };

  const Component = to ? Link : 'button';

  return (
    <div className="py-1" role="none">
      <Component className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem" {...props}>
        {label}
      </Component>
    </div>
  );
};
