import { ColumnDef } from "@tanstack/react-table";
import { TbEdit, TbTrash } from "react-icons/tb";

import { Button } from "@/components/molecules/Button";
import { generateColumnHelper } from "@/components/molecules/DataTable/utils";
import React from "react";
import { EPI, EpiCheck, EpiType, User } from "@/types/type";
import { IconEPI } from "@/components/atoms/IconEPI";

import { getStatusStyle, getStatusLabel } from "@/utils/statusStyle";
import { getUserNameById } from "@/utils/getUserNameById";
import { formatDateString } from "@/utils/date";
import { getEpiTypeName } from "@/utils/getEpiTypeName";

export const configureColumns = (
  onEdit: (epiCheck: EpiCheck) => void,
  onDelete: (epiCheck: EpiCheck) => void,
  users: User[],
  epi: EPI[],
  epiTypes: EpiType[]
): ColumnDef<EpiCheck, any>[] => {
  const columnHelper = generateColumnHelper<EpiCheck>();

  const columns = [
    columnHelper.accessor("epiId", {
      header: () => "Équipement",
      cell: (info) => {
        const epiItem = epi.find((item) => item.id === info.getValue());
        return (
          <div className="flex items-center gap-1 w-34">
            <>
              <IconEPI
                type={getEpiTypeName(epiTypes, info.getValue())}
                width={30}
                height={30}
              />
              <span>
                {getEpiTypeName(epiTypes, info.getValue())} [{epiItem?.innerId}]
              </span>
            </>
          </div>
        );
      },
    }),
    columnHelper.accessor("checkDate", {
      header: () => "Date de contrôle",
      cell: (info) => {
        const rawDate = info.getValue();
        const formattedDate = formatDateString(rawDate);
        return <span>{formattedDate}</span>;
      },
    }),
    columnHelper.accessor("checkStatus", {
      header: () => "État du contrôle",
      cell: (info) => (
        <span className={getStatusStyle(info.getValue())}>
          {getStatusLabel(info.getValue())}
        </span>
      ),
    }),
    columnHelper.accessor("userId", {
      header: () => "Utilisateur en charge du contrôle",
      cell: (info) => <span>{getUserNameById(users, info.getValue())}</span>,
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
