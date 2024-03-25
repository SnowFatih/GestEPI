import React from "react";

import { NavLink } from "@/components/molecules/NavLink";
import { Typography } from "@/components/atoms/Typography";

export interface NavProps {
  links: any[];
  secondLinks: any[];
  currentPath?: string;
}

export const NavMenu: React.FC<NavProps> = ({
  links,
  currentPath,
  secondLinks,
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
        <div className="pt-10">
          <Typography marginClass="mx-4">Gestions secondaires :</Typography>
          <div className="border-b mx-4 mt-2 mb-3" />
          {secondLinks?.map((link) => (
            <NavLink
              link={link.to}
              title={link.name}
              icon={link.icon}
              key={link.name}
              active={currentPath === link.to}
            />
          ))}
        </div>
      </nav>
    </div>
  );
};
