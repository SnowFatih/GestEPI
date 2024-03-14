import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import cs from "classnames";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbSearch } from "react-icons/tb";

import { StyledContainer } from "@/components/atoms/StyledContainer";
import { Typography } from "@/components/atoms/Typography";

import Pagination, { DEFAULT_PAGE_SIZES } from "./Pagination";
import { SearchBar } from "./SearchBar";
import { SortButton } from "./SortButton";
import { fuzzyFilter } from "./utils";
import React from "react";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  enableGlobalSearch?: boolean;
  enablePagination?: boolean;
  enableSorting?: boolean;
  searchPlaceholder?: string;
  displayTotalNumber?: boolean;
  itemLabel?: string;
  onRowClick?: (data: Data) => void;
  advancedBarRightElement?: React.ReactNode;
  defaultSortingState?: SortingState;
};

export function DataTable<Data extends object>({
  data,
  columns,
  enableGlobalSearch,
  searchPlaceholder,
  enablePagination = true,
  enableSorting = true,
  displayTotalNumber,
  itemLabel,
  onRowClick,
  advancedBarRightElement,
  defaultSortingState,
}: DataTableProps<Data>) {
  const [sorting, setSorting] = useState<SortingState>(
    defaultSortingState ?? []
  );
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: enablePagination
        ? {
            pageSize: DEFAULT_PAGE_SIZES[0],
          }
        : undefined,
    },
    state: {
      sorting: enableSorting ? sorting : undefined,
      globalFilter: enableGlobalSearch ? globalFilter : undefined,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    ...(enableGlobalSearch
      ? {
          onGlobalFilterChange: setGlobalFilter,
          getFilteredRowModel: getFilteredRowModel(),
          globalFilterFn: fuzzyFilter,
        }
      : {}),
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
  });

  const displayAdvancedBar =
    enableGlobalSearch || displayTotalNumber || !!advancedBarRightElement;

  const itemCount = useMemo(() => {
    return table.getRowModel().rows.length;
  }, [data, globalFilter]);

  return (
    <>
      {displayAdvancedBar && (
        <div className="flex mb-3 w-full justify-between">
          {enableGlobalSearch && (
            <SearchBar
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder={searchPlaceholder ?? "Rechercher"}
              rightIcon={<TbSearch className="w-5 h-5 text-slate-500" />}
            />
          )}
          <div className="flex flex-1" />
          <div className="flex items-center gap-5 w-fit">
            {advancedBarRightElement && advancedBarRightElement}
            {displayTotalNumber && (
              <Typography variant="h4" color="gray">
                {itemLabel
                  ? `${itemCount} ${itemLabel.toLowerCase()}`
                  : `${itemCount} élément${itemCount > 1 && "s"}`}
              </Typography>
            )}
          </div>
        </div>
      )}
      <StyledContainer>
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={cs(
                      "px-6 py-4",
                      enableSorting && "cursor-pointer"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <span className="flex gap-1.5 items-center">
                        {enableSorting && <SortButton column={header.column} />}
                        <Typography variant="small" color="gray">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </Typography>
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick && onRowClick(row.original)}
                className={cs({
                  "hover:bg-slate-50:": true,
                  "cursor-pointer ": onRowClick,
                })}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={cs({
                      "px-6 py-4": true,
                      "cursor-pointer": onRowClick,
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </StyledContainer>
      {enablePagination && <Pagination table={table} itemLabel={itemLabel} />}
    </>
  );
}
