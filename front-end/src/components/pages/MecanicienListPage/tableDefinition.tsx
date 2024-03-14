import { ColumnDef } from "@tanstack/react-table";
import { TbEdit, TbTrash } from "react-icons/tb";

import { Button } from "@/components/molecules/Button";
import { generateColumnHelper } from "@/components/molecules/DataTable/utils";
import React from "react";

import { Avion, Mecanicien } from "@/types/type";

export const configureColumns = (
  avions: Avion[],
  onEdit: (mecanicien: Mecanicien) => void,
  onDelete: (mecanicien: Mecanicien) => void
): ColumnDef<Mecanicien, any>[] => {
  const columnHelper = generateColumnHelper<Mecanicien>();

  const columns = [
    columnHelper.accessor("nom", {
      header: () => "Nom",
      cell: (info) => (
        <span className="uppercase">{info.row.original.nom}</span>
      ),
    }),
    columnHelper.accessor("prenom", {
      header: () => "Prénom",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("idAvion", {
      header: () => "Avion attribué",
      cell: (info) => {
        const avion = avions.find(
          (avion) => avion.id === info.row.original.idAvion
        );
        return (
          <span>{avion ? `[${avion.marque}] - ${avion.modele}` : "Aucun"}</span>
        );
      },
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
