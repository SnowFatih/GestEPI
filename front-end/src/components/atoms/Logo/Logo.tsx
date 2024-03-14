import React from "react";
import { Link } from "react-router-dom";

import logoSrc from "@/assets/logo.png";
import logoLongSrc from "@/assets/logo-long.png";

export interface LogoProps {
  redirectUrl?: string;
  long?: boolean;
}

export const Logo = ({ redirectUrl = "/", long = false }: LogoProps) => {
  return (
    <Link to={redirectUrl}>
      <img src={long ? logoLongSrc : logoSrc} alt="Logo" className="h-full" />
    </Link>
  );
};
