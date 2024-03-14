import React from "react";

import { Logo } from "@/components/atoms/Logo";
import { PublicSidebar } from "@/components/organisms/PublicSidebar";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  title: string;
  description?: string;
};

export const PublicLayout = ({
  title,
  description,
  children,
}: Props): JSX.Element => {
  return (
    <div className="flex h-screen w-screen">
      <div className="grow-0">
        <PublicSidebar title={title} description={description} />
      </div>
      <div className="flex flex-col w-full grow">
        <div className="px-4 py-12 h-full w-full m-auto justify-center items-center flex flex-col">
          <div className="mb-20 sm:hidden">
            <Logo />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
