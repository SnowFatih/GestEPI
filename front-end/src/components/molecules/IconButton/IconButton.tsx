import classNames from "classnames";
import * as React from "react";
import { IconType } from "react-icons";
import { ImSpinner2 } from "react-icons/im";

export type IconButtonSize = "sm" | "base" | "extraSmall";

type ButtonColor = "primary" | "selected" | "success" | "info" | "purple";

type IconButtonProps = {
  isLoading?: boolean;
  icon?: IconType;
  size?: IconButtonSize;
  iconClassName?: string;
  shadow?: boolean;
  disabled?: boolean;
  color?: ButtonColor;
} & React.ComponentPropsWithRef<"button">;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      disabled = false,
      isLoading,
      color = "primary",
      shadow = true,
      icon: Icon,
      size = "base",
      iconClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={classNames(
          "flex justify-center items-center rounded-[20px]",
          shadow && "shadow-btn-50",
          disabled &&
            "disabled:bg-gray-200 disabled:shadow-none disabled:cursor-not-allowed",
          isLoading &&
            "relative text-transparent transition-none hover:text-transparent disabled:cursor-wait",
          className,
          //*=========== Size ===========
          [
            size === "base" &&
              "min-h-[50px] min-w-[50px] p-1 md:min-h-[50px] md:min-w-[50px] md:p-2",
            size === "sm" &&
              "min-h-[40px] min-w-[40px] p-1 md:min-h-[40px] md:min-w-[40px] md:p-2",
            size === "extraSmall" && "p-1",
          ],
          //*=========== Color ===========
          [
            color === "primary" &&
              "text-[#6D6D88] hover:text-gray-400 duration-300 ease-in bg-white disabled:bg-primary-500",
            color === "selected" &&
              "text-white hover:text-white bg-primary-500 duration-300 ease-in",
            color === "purple" &&
              "text-primary-500 hover:text-purple-600 bg-primary-50 duration-300 ease-in",
            color === "success" &&
              "text-slate-50 hover:text-white bg-green-300 duration-300 ease-in",
            color === "info" &&
              "text-slate-50 hover:text-white bg-blue-300 duration-300 ease-in",
          ]
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={classNames(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              [
                color === "primary" && "text-white",
                color === "selected" && "text-slate-200",
              ]
            )}
          >
            <ImSpinner2 className="animate-spin" />
          </div>
        )}
        {Icon && <Icon className={`${iconClassName} font-bold`} />}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
