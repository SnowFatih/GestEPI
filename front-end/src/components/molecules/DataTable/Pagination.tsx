import { Table } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import {
  TbChevronLeft,
  TbChevronLeftPipe,
  TbChevronRight,
  TbChevronRightPipe,
} from "react-icons/tb";

import { Typography } from "@/components/atoms/Typography";
import React from "react";

export const DEFAULT_PAGE_SIZES = [10, 25, 50, 100];

export type PaginationProps<Data extends object> = {
  table: Table<Data>;
  paginationSizes?: number[];
  itemLabel?: string;
};

export default function Pagination<Data extends object>({
  table,
  paginationSizes = DEFAULT_PAGE_SIZES,
  itemLabel,
}: PaginationProps<Data>) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col-reverse md:flex-row w-full my-6 items-center gap-3 justify-between">
      <div className="flex flex-col items-center md:items-start">
        <Typography variant="h5" color="gray">
          {itemLabel ? `${itemLabel} Page` : `Affichage par page`}
        </Typography>
        <select
          className="border p-1 mt-1 rounded w-16 border-gray-200 "
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {paginationSizes.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <button
          className={`${
            !table.getCanPreviousPage()
              ? "bg-gray-100"
              : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
          } rounded p-1`}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <TbChevronLeftPipe size={18} />
        </button>
        <button
          className={`${
            !table.getCanPreviousPage()
              ? "bg-gray-100"
              : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
          } rounded p-1`}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <TbChevronLeft size={18} />
        </button>
        <span className="flex items-center gap-1">
          <input
            min={1}
            max={table.getPageCount()}
            type="number"
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-0.5 rounded w-10"
          />
          <Typography variant="h5" color="gray">
            de {table.getPageCount()}
          </Typography>
        </span>
        <button
          className={`${
            !table.getCanNextPage()
              ? "bg-gray-100"
              : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
          } rounded p-1`}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <TbChevronRight size={18} />
        </button>
        <button
          className={`${
            !table.getCanNextPage()
              ? "bg-gray-100"
              : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
          } rounded p-1`}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <TbChevronRightPipe size={18} />
        </button>
      </div>
    </div>
  );
}
