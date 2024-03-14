import { Column } from "@tanstack/react-table";
import React from "react";
import { BsChevronDown, BsChevronExpand, BsChevronUp } from "react-icons/bs";

const iconClassName = "h-3.5 w-3.5 text-gray-700";

export interface SortButtonProps {
  column: Column<any, any>;
}

export function SortButton({ column }: SortButtonProps) {
  if (column.getCanSort() === false) {
    return null;
  }

  return column.getIsSorted() ? (
    column.getIsSorted() === "desc" ? (
      <BsChevronDown className={iconClassName} />
    ) : (
      <BsChevronUp className={iconClassName} />
    )
  ) : (
    <BsChevronExpand className={iconClassName} />
  );
}
