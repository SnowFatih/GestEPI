import { ColumnDef } from "@tanstack/react-table";
import { TbEdit, TbTrash } from "react-icons/tb";

import { Button } from "@/components/molecules/Button";
import { generateColumnHelper } from "@/components/molecules/DataTable/utils";
import React from "react";
import { EpiType } from "@/types/type";
import { IconEPI } from "@/components/atoms/IconEPI";

export const configureColumns = (
  onEdit: (epiType: EpiType) => void,
  onDelete: (epiType: EpiType) => void
): ColumnDef<EpiType, any>[] => {
  const columnHelper = generateColumnHelper<EpiType>();

  const columns = [
    columnHelper.accessor("label", {
      header: () => "Illustration",
      cell: (info) => (
        <div className="w-24 h-24 items-center justify-center flex">
          <IconEPI type={info.row.original.label} width={150} height={40} />
        </div>
      ),
      enableSorting: false,
      enableGlobalFilter: false,
    }),
    columnHelper.accessor("label", {
      header: () => "Nom de l'équipement",
      cell: (info) => info.getValue(),
    }),
    {
      id: "delete",
      header: () => "Suppression",
      cell: (info: any) => (
        <Button
          onClick={() => onDelete(info.row.original)}
          icon={<TbTrash size={17} />}
          label="Supprimer"
          color="alert"
        />
      ),
      enableSorting: false,
      enableGlobalFilter: false,
    },
    {
      id: "edit",
      header: () => "Modification",
      cell: (info: any) => (
        <Button
          onClick={() => onEdit(info.row.original)}
          icon={<TbEdit size={17} />}
          label="Modifier"
          color="primary"
        />
      ),
      enableSorting: false,
      enableGlobalFilter: false,
    },
  ];
  return columns;
};
