import { ColumnDef } from "@tanstack/react-table";
import { TbEdit, TbTrash } from "react-icons/tb";

import { Button } from "@/components/molecules/Button";
import { generateColumnHelper } from "@/components/molecules/DataTable/utils";
import React from "react";
import { EpiCheck } from "@/types/type";
import { Typography } from "@/components/atoms/Typography";
import { IconEPI } from "@/components/atoms/IconEPI";

export const configureColumns = (
  onEdit: (epiCheck: EpiCheck) => void,
  onDelete: (epiCheck: EpiCheck) => void
): ColumnDef<EpiCheck, any>[] => {
  const columnHelper = generateColumnHelper<EpiCheck>();

  const columns = [
    // columnHelper.accessor("epiId", {
    //   header: () => "Nom de l'équipement",
    //   cell: (info) => (
    //     <div className="w-24 h-24 items-center justify-center flex">
    //       <IconEPI type={info.row.original.label} />
    //     </div>
    //   ),
    //   enableSorting: false,
    //   enableGlobalFilter: false,
    // }),
    columnHelper.accessor("epiId", {
      header: () => "Nom de l'équipement",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("checkDate", {
      header: () => "Date de contrôle",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("checkStatus", {
      header: () => "État du contrôle",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("userId", {
      header: () => "Utilisateur en charge du contrôle",
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
