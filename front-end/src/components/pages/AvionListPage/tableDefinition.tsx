import { ColumnDef } from "@tanstack/react-table";
import { TbEdit, TbTrash } from "react-icons/tb";

import { Button } from "@/components/molecules/Button";
import { generateColumnHelper } from "@/components/molecules/DataTable/utils";
import React from "react";
import { Avion } from "@/types/type";
import { Typography } from "@/components/atoms/Typography";

export const configureColumns = (
  onEdit: (avion: Avion) => void,
  onDelete: (avion: Avion) => void
): ColumnDef<Avion, any>[] => {
  const columnHelper = generateColumnHelper<Avion>();

  const columns = [
    columnHelper.accessor("logoUrl", {
      header: () => "Logo",
      cell: (info) => (
        <div className="w-32 h-20 items-center justify-center flex">
          {info.row.original.logoUrl ? (
            <img
              src={info.row.original.logoUrl}
              alt={info.row.original.marque}
              className="h-full w-full object-cover rounded-3xl"
            />
          ) : (
            "N/C"
          )}
        </div>
      ),
      enableSorting: false,
      enableGlobalFilter: false,
    }),
    columnHelper.accessor("immatriculation", {
      header: () => "Immatriculation",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("marque", {
      header: () => "Marque",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("modele", {
      header: () => "Modèle",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("statut", {
      header: () => "Statut",
      cell: (info) => (
        <Typography
          color={info.row.original.statut === "Actif" ? "green" : "red"}
        >
          {info.row.original.statut}
        </Typography>
      ),
    }),
    columnHelper.accessor("heuresDeVol", {
      header: () => "Heures de vol",
      cell: (info) => <div>{info.getValue()} h</div>,
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
