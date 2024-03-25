import { ColumnDef } from "@tanstack/react-table";
import { TbEdit, TbTrash } from "react-icons/tb";

import { Button } from "@/components/molecules/Button";
import { generateColumnHelper } from "@/components/molecules/DataTable/utils";
import React from "react";
import { CheckFrequencyUnit, EPI, EpiType, User } from "@/types/type";

import { formatDateString } from "@/utils/date";
import { IconEPI } from "@/components/atoms/IconEPI";

export const configureColumns = (
  onEdit: (epiList: EPI) => void,
  onDelete: (epiList: EPI) => void,
  users: User[],
  epiTypes: EpiType[]
): ColumnDef<EPI, any>[] => {
  const columnHelper = generateColumnHelper<EPI>();

  const columns = [
    columnHelper.accessor("brand", {
      header: () => "Marque",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("model", {
      header: () => "Modèle",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("serialNumber", {
      header: () => "Numéro de série",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("innerId", {
      header: () => "ID interne",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("epiType", {
      header: () => "Type",
      cell: (info) => {
        const epiType = epiTypes.find((type) => type.id === info.getValue());
        return (
          <div className="flex items-center gap-1 w-52">
            <IconEPI type={epiType?.label || ""} width={40} />
            {epiType?.label || "Type non trouvé"}{" "}
          </div>
        );
      },
    }),
    columnHelper.accessor("size", {
      header: () => "Taille",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("color", {
      header: () => "Couleur",
      cell: (info) => (
        <div
          style={{
            backgroundColor: info.getValue(),
          }}
          className="rounded-full border border-black h-7 w-7"
        />
      ),
    }),
    columnHelper.accessor("purchaseDate", {
      header: () => "Date d'achat",
      cell: (info) => {
        const rawDate = info.getValue();
        const formattedDate = formatDateString(rawDate || "");
        return <div className="w-32">{formattedDate}</div>;
      },
    }),
    columnHelper.accessor("manufactureDate", {
      header: () => "Date de fabrication",
      cell: (info) => {
        const rawDate = info.getValue();
        const formattedDate = formatDateString(rawDate || "");
        return <div className="w-32">{formattedDate}</div>;
      },
    }),
    columnHelper.accessor("inServiceDate", {
      header: () => "Date de mise en service",
      cell: (info) => {
        const rawDate = info.getValue();
        const formattedDate = formatDateString(rawDate || "");
        return <div className="w-32">{formattedDate}</div>;
      },
    }),
    columnHelper.accessor("checkFrequency", {
      header: () => "Fréquence de contrôle",
      cell: (info) => (
        <span>
          {info.getValue()}{" "}
          {info.row.original.checkFrequencyUnit === CheckFrequencyUnit.MONTH
            ? "mois"
            : `${info.row.original.checkFrequency > 1 ? "ans" : "an"}`}
        </span>
      ),
    }),

    // columnHelper.accessor("checkDate", {
    //   header: () => "Date de contrôle",
    //   cell: (info) => {
    //     const rawDate = info.getValue();
    //     const formattedDate = formatDateString(rawDate);
    //     return <span>{formattedDate}</span>;
    //   },
    // }),
    // columnHelper.accessor("checkStatus", {
    //   header: () => "État du contrôle",
    //   cell: (info) => (
    //     <span className={getStatusStyle(info.getValue())}>
    //       {getStatusLabel(info.getValue())}
    //     </span>
    //   ),
    // }),
    // columnHelper.accessor("userId", {
    //   header: () => "Utilisateur en charge du contrôle",
    //   cell: (info) => <span>{getUserNameById(users, info.getValue())}</span>,
    // }),
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
