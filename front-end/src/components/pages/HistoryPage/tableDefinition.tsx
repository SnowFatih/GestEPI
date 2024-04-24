import { ColumnDef } from "@tanstack/react-table";
import {
  TbDownload,
  TbEdit,
  TbExternalLink,
  TbEye,
  TbTrash,
} from "react-icons/tb";
import { Button } from "@/components/molecules/Button";
import { generateColumnHelper } from "@/components/molecules/DataTable/utils";
import React from "react";
import { EPI, EpiType } from "@/types/type";
import { IconEPI } from "@/components/atoms/IconEPI";
import { useNavigate } from "react-router-dom";
import { getEpiTypeName } from "@/utils/getEpiTypeName";
import axios from "axios";

export const configureColumns = (
  onDelete: (epiList: EPI) => void,
  onEdit: (epiList: EPI) => void,
  epiTypes: EpiType[]
): ColumnDef<EPI, any>[] => {
  const navigate = useNavigate();
  const columnHelper = generateColumnHelper<EPI>();

  const exportDataAsCSV = async (epi: EPI) => {
    try {
      const response = await axios.get(
        `http://localhost:5500/export/csv/${epi.id}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${epi.innerId}_epi.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Failed to export data as CSV", error);
    }
  };

  const exportDataAsJSON = async (epi: EPI) => {
    try {
      const response = await axios.get(
        `http://localhost:5500/export/json/${epi.id}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${epi.innerId}_epi.json`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Failed to export data as JSON", error);
    }
  };

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
          icon={<TbExternalLink size={17} />}
          label="Voir"
          color="secondary"
        />
      ),
      enableSorting: false,
      enableGlobalFilter: false,
    },
    {
      id: "csvExport",
      header: () => "Exporter en CSV",
      cell: (info: any) => (
        <Button
          onClick={() => exportDataAsCSV(info.row.original)}
          icon={<TbDownload size={17} />}
          label="CSV"
          color="primary"
        />
      ),
      enableSorting: false,
      enableGlobalFilter: false,
    },
    {
      id: "id",
      header: () => "Exporter en Json",
      cell: (info: any) => (
        <Button
          onClick={() => exportDataAsJSON(info.row.original)}
          label="Json"
          icon={<TbDownload size={17} />}
          color="primary"
        />
      ),
      enableSorting: false,
      enableGlobalFilter: false,
    },
  ];
  return columns;
};
