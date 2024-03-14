import { ColumnDef } from "@tanstack/react-table";
import { TbEdit, TbTrash } from "react-icons/tb";

import { Button } from "@/components/molecules/Button";
import { generateColumnHelper } from "@/components/molecules/DataTable/utils";
import React from "react";

import { Avion, Entretien, Mecanicien } from "@/types/type";

export const configureColumns = (
  avions: Avion[],
  mecaniciens: Mecanicien[],
  onEdit: (entretien: Entretien) => void,
  onDelete: (entretien: Entretien) => void
): ColumnDef<Entretien, any>[] => {
  const columnHelper = generateColumnHelper<Entretien>();

  const columns = [
    columnHelper.accessor("id", {
      header: () => "Ref",
      cell: (info) => <span>#{info.getValue()}</span>,
    }),
    columnHelper.accessor("idAvion", {
      header: () => "Avion en maintenance",
      cell: (info) => {
        const avion = avions.find(
          (avion) => avion.id === info.row.original.idAvion
        );
        return (
          <span>{avion ? `[${avion.marque}] - ${avion.modele}` : "Aucun"}</span>
        );
      },
    }),
    columnHelper.accessor("idMecanicien", {
      header: () => "Mécanicien en charge",
      cell: (info) => {
        const mecanicien = mecaniciens.find(
          (mecanicien) => mecanicien.id === info.row.original.idMecanicien
        );
        return (
          <span>
            {mecanicien ? `${mecanicien.nom} ${mecanicien.prenom}` : "Aucun"}
          </span>
        );
      },
    }),
    columnHelper.accessor("debutDate", {
      header: () => "Date de début",
      cell: (info) => {
        const dateValue = info.getValue();
        if (typeof dateValue === "string" || typeof dateValue === "number") {
          return <span>{new Date(dateValue).toLocaleDateString()}</span>;
        }
        return "N/C";
      },
    }),
    columnHelper.accessor("finDate", {
      header: () => "Date de fin",
      cell: (info) => {
        const dateValue = info.getValue();
        if (typeof dateValue === "string" || typeof dateValue === "number") {
          return <span>{new Date(dateValue).toLocaleDateString()}</span>;
        }
        return "N/C";
      },
    }),
    columnHelper.accessor("description", {
      header: () => "Nature de l'entretien",
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
