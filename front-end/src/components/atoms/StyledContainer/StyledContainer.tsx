import classNames from "classnames";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
}

export const StyledContainer: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        classNames(" border border-gray-200 sm:rounded-lg bg-white", className)
      )}
    >
      {children}
    </div>
  );
};
