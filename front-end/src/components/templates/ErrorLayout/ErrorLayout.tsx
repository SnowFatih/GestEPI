import React, { Fragment } from "react";

import { Logo } from "@/components/atoms/Logo";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

export const ErrorLayout = ({
  children = <Fragment />,
}: Props): JSX.Element => {
  return (
    <div className="h-screen flex flex-col justify-center py-12 sm:px-base lg:px-8 items-center flex-1 bg-slate-100">
      <div className="w-60">
        <Logo long />
      </div>
      <div className="mt-largeBase sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-largeBase px-small shadow sm:rounded-lg sm:px-10 text-center">
          {children}
        </div>
      </div>
    </div>
  );
};
