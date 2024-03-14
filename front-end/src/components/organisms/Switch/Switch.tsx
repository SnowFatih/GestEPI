import cs from "classnames";
import React, { useState } from "react";

import { Typography } from "@/components/atoms/Typography";
import classNames from "classnames";

export type SwitchProps = {
  trueLabel?: string;
  falseLabel?: string;
  initialValue?: boolean;
  onClick?: (value: boolean) => void;
};
export const Switch = ({
  trueLabel = "Oui",
  falseLabel = "Non",
  initialValue = false,
  onClick,
}: SwitchProps) => {
  const [switchValue, setSwitchValue] = useState<boolean>(initialValue);

  const handleClick = () => {
    const newValue = !switchValue;
    setSwitchValue(newValue);
    if (onClick) {
      onClick(newValue);
    }
  };

  return (
    <div className="flex gap-4 items-center w-fit">
      <Typography>{falseLabel}</Typography>
      <div
        className={classNames({
          "relative cursor-pointer grid grid-cols-2 justify-between items-center rounded-full min-h-[30px] border-slate-500 border gap-2 w-max":
            true,
          "bg-slate-100": !switchValue,
          "bg-green-400": switchValue,
        })}
        onClick={handleClick}
        onKeyUp={handleClick}
        role="button"
        aria-hidden
      >
        <div className="h-full w-6 z-30" />
        <div className="h-full w-6 z-30" />
        <div
          className={cs([
            "flex items-center justify-center w-1/2 h-full absolute transition-transform duration-300 p-1",
            switchValue ? "translate-x-full" : "translate-x-0",
          ])}
        >
          <div className="rounded-full h-5 w-5 border border-slate-500 bg-white" />
        </div>
      </div>
      <Typography>{trueLabel}</Typography>
    </div>
  );
};
