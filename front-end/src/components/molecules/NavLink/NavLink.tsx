import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Typography } from "@/components/atoms/Typography";
import classNames from "classnames";

export interface NavLinkProps {
  icon: React.ReactNode;
  title: string;
  link: string;
  active?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({
  icon,
  title,
  link,
  active,
}) => {
  const { t } = useTranslation();
  return (
    <Link
      to={link}
      id="menu"
      className={classNames(
        "styled-link flex flex-row gap-4 mt-1 mx-3 rounded-md text-primary-900 px-3 py-3 border-b hover:bg-gray-100/80 items-center",
        active && "bg-gray-100/80"
      )}
    >
      <span className="text-xl">{icon}</span>
      <Typography tag="p" weight={active ? "semibold" : undefined}>
        {title}
      </Typography>
    </Link>
  );
};
