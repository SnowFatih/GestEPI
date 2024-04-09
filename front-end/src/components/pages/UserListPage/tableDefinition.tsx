import { ColumnDef } from "@tanstack/react-table";
import { TbTrash } from "react-icons/tb";

import { Button } from "@/components/molecules/Button";
import { generateColumnHelper } from "@/components/molecules/DataTable/utils";
import React from "react";
import { User } from "@/types/type";
import { getUserTypeLabel } from "@/utils/getUserTypeLabel";

export const configureColumns = (
  onDelete: (epiUser: User) => void
): ColumnDef<User, any>[] => {
  const columnHelper = generateColumnHelper<User>();

  const columns = [
    columnHelper.accessor("lastName", {
      header: () => "Nom",
      cell: (info) => <div className="uppercase">{info.getValue()}</div>,
    }),
    columnHelper.accessor("firstName", {
      header: () => "Prénom",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("userType", {
      header: () => "Rôle",
      cell: (info) => <div>{getUserTypeLabel(info.row.original.userType)}</div>,
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
  ];
  return columns;
};
