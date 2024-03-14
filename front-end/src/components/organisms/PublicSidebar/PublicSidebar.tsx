import React from "react";

import { Logo } from "@/components/atoms/Logo";
import { Typography } from "@/components/atoms/Typography";

type Props = {
  title: string;
  description?: string;
};

export const PublicSidebar = ({ title, description }: Props) => {
  return (
    <div className="py-8 px-10 h-full max-w-4xl bg-gradient-to-t from-blue-400 to-[#015C7D] max-sm:hidden flex flex-col">
      <div className="flex-1">
        <div className="w-80 mt-32">
          <Logo long />
        </div>
        <div className="mt-40">
          <Typography
            variant="heroTitle"
            tag="h5"
            color="white"
            weight="semibold"
          >
            {title}
          </Typography>
        </div>
        {description && (
          <div className="mt-8">
            <Typography variant="h3" align="justify" color="white">
              {description}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};
