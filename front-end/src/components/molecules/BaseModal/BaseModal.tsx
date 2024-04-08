/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from "classnames";
import React from "react";
import { FaTimes } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  children?: React.ReactNode | React.ReactNode[];
  maxWidth?: "md" | "lg" | "xl" | "xxl" | "full";
  onCloseClick?: () => void;
  closeOnOutsideClick?: boolean;
};

export const BaseModal: React.FC<Props> = ({
  children,
  isOpen,
  closeOnOutsideClick = true,
  maxWidth = "lg",
  onCloseClick,
}: Props) => {
  if (!isOpen) {
    return null;
  }

  if (!onCloseClick) {
    return null;
  }

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-400/80 backdrop-blur-[1px] flex justify-center items-center z-[99990] "
      onClick={() => closeOnOutsideClick && onCloseClick()}
    >
      <div
        className={classNames(
          "block bg-slate-100 h-fit p-8 border rounded-xl backdrop-blur-md",
          {
            "overflow-y-auto": isOpen,
            "max-w-md": maxWidth === "md",
            "max-w-lg": maxWidth === "lg",
            "min-w-[550px]": maxWidth === "xl",
            "min-w-[700px]": maxWidth === "xxl",
            "w-full": maxWidth === "full",
          }
        )}
        onClick={stopPropagation}
      >
        {onCloseClick && (
          <span
            className="absolute top-4 right-3 text-2xl text-slate-400 hover:text-slate-500 cursor-pointer"
            onClick={onCloseClick}
          >
            <FaTimes />
          </span>
        )}
        <div className=" max-h-[70vh] overflow-auto">{children}</div>
      </div>
    </div>
  );
};
