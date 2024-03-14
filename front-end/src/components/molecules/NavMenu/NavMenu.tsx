import React from "react";

import { NavLink } from "@/components/molecules/NavLink";

export interface NavProps {
  links: any[];
  currentPath?: string;
}

export const NavMenu: React.FC<NavProps> = ({
  links,
  currentPath,
}: NavProps) => {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed h-full">
      <nav className="flex-1 px-2 pb-small space-y-1 border-r border-gray-200 bg-white">
        {links.map((link) => (
          <NavLink
            link={link.to}
            title={link.name}
            icon={link.icon}
            key={link.name}
            active={currentPath === link.to}
          />
        ))}
      </nav>
    </div>
  );
};
