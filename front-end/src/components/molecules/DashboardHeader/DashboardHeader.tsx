import React from "react";
import { HiMenu } from "react-icons/hi";
import { Logo } from "@/components/atoms/Logo";
import { Typography } from "@/components/atoms/Typography";

interface Props {
  onChangeSidebar: (value: boolean) => void;
  headerTitle?: string;
}

export const DashboardHeader = ({ onChangeSidebar, headerTitle }: Props) => {
  return (
    <div className="sticky top-0 flex-shrink-0 flex h-20 bg-white border-b border-gray-200 z-8 md:z-[10000]">
      <button
        type="button"
        className="px-small text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
        onClick={() => onChangeSidebar(true)}
      >
        <HiMenu className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex justify-center px-8 items-center w-72">
        <Logo long />
      </div>
      <div className="flex items-center w-full">
        <span className="flex flex-col">
          <Typography variant="smallParagraph" weight="regular">
            Connecté(e) en tant que :
          </Typography>
          <Typography variant="h3" weight="semibold">
            {headerTitle || "Gestionnaire EPI"}
          </Typography>
        </span>
        <div className="flex flex-1" />
      </div>
    </div>
  );
};
