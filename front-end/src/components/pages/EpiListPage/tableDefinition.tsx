import { ColumnDef } from "@tanstack/react-table";
import { TbEdit, TbTrash } from "react-icons/tb";
import { Button } from "@/components/molecules/Button";
import { generateColumnHelper } from "@/components/molecules/DataTable/utils";
import React from "react";
import { EPI, EpiType } from "@/types/type";
import { IconEPI } from "@/components/atoms/IconEPI";
import { useNavigate } from "react-router-dom";
import { getEpiTypeName } from "@/utils/getEpiTypeName";

export const configureColumns = (
  onDelete: (epiList: EPI) => void,
  onEdit: (epiList: EPI) => void,
  epiTypes: EpiType[]
): ColumnDef<EPI, any>[] => {
  const navigate = useNavigate();
  const columnHelper = generateColumnHelper<EPI>();

  const columns = [
    columnHelper.accessor("epiType", {
      header: () => "Équipement",
      cell: (info) => {
        return (
          <div className="flex items-center gap-1 w-34">
            <>
              <IconEPI
                type={getEpiTypeName(epiTypes, info.getValue())}
                width={30}
                height={30}
              />
              <span>{getEpiTypeName(epiTypes, info.getValue())}</span>
            </>
          </div>
        );
      },
    }),
    columnHelper.accessor("innerId", {
      header: () => "Id interne",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("brand", {
      header: () => "Marque",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("brand", {
      header: () => "Marque",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("model", {
      header: () => "Modèle",
      cell: (info) => info.getValue(),
    }),
    {
      id: "redirection",
      header: () => "Voir",
      cell: (info: any) => (
        <Button
          onClick={() => navigate(`/epi/details/${info.row.original.id}`)}
          icon={<TbEdit size={17} />}
          label="Voir"
          color="secondary"
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
