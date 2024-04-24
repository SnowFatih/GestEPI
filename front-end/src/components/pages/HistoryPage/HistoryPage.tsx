import React, { useState, useEffect } from "react";
import axios from "axios";
import { EPI, EpiCheck, EpiType } from "@/types/type";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { DataTable } from "@/components/molecules/DataTable";
import { configureColumns } from "./tableDefinition";
import { TbDownload, TbHexagonLetterE, TbPlus } from "react-icons/tb";
import { DashboardLayout } from "@/components/templates/DashboardLayout";

import toast from "react-hot-toast";

import { EpiListCreateModal } from "@/components/molecules/EpiListCreateModal";
import { EpiListDeleteModal } from "@/components/molecules/EpiListDeleteModal";
import { EpiListEditModal } from "@/components/molecules/EpiListEditModal";

export const HistoryPage = () => {
  const [epiList, setEpiList] = useState<EPI[]>([]);
  const [epiChecks, setEpiChecks] = useState<EpiCheck[]>([]);
  const [epiTypes, setEpiTypes] = useState<EpiType[]>([]);
  const [modalState, setModalState] = useState({
    create: false,
    edit: false,
    delete: false,
  });
  const [selectedEpiList, setSelectedEpiList] = useState(null as EPI | null);

  useEffect(() => {
    const fetchEpiList = async () => {
      try {
        const response = await axios.get("http://localhost:5500/epi");
        setEpiList(response.data);
        console.log("EpiList récupérés:", response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste des epis");
      }
    };
    fetchEpiList();

    const fetchEpiChecks = async () => {
      try {
        const response = await axios.get("http://localhost:5500/checks");
        setEpiChecks(response.data);
        console.log("EpiChecks récupérés:", response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des epiChecks");
      }
    };
    fetchEpiChecks();

    const fetchEpiTypes = async () => {
      try {
        const response = await axios.get("http://localhost:5500/types");
        setEpiTypes(response.data);
        console.log("Epi type récupérés:", response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des epiTypes", error);
      }
    };
    fetchEpiTypes();
  }, []);

  const exportAllDataAsCSV = async () => {
    try {
      const response = await axios.get("http://localhost:5500/export/csv", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "epiChecks.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Failed to export data as CSV", error);
      toast.error("Failed to export data as CSV");
    }
  };

  const exportAllDataAsJSON = async () => {
    try {
      const response = await axios.get("http://localhost:5500/export/json", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "listeDesEpi.json");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Failed to export data as JSON", error);
      toast.error("Failed to export data as JSON");
    }
  };

  const handleOpenCreateModal = () => {
    setModalState({ ...modalState, create: true });
  };

  const handleCloseModal = () => {
    setModalState({ create: false, edit: false, delete: false });
    setSelectedEpiList(null);
  };

  const handleOpenEditModal = (epiList: EPI) => {
    setSelectedEpiList(epiList);
    setModalState({ ...modalState, edit: true });
  };

  const handleOpenDeleteModal = (epiList: EPI) => {
    setSelectedEpiList(epiList);
    setModalState({ ...modalState, delete: true });
  };

  const reloadEpi = async (message: string = "Action réalisée avec succès") => {
    try {
      const response = await axios.get("http://localhost:5500/epi");
      setEpiList(response.data);
      toast.success(message, {
        duration: 4000,
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Erreur lors du rechargement des epi:", error);
      toast.error("Erreur lors du rechargement des contrôles", {
        duration: 4000,
        position: "bottom-right",
      });
    }
  };

  const cannotBeDeleted = (epi: EPI) => {
    const check = epiChecks.find((check) => check.epiId === epi.id);
    return check ? check.id : null;
  };

  return (
    <>
      <DashboardLayout>
        <div className="mt-10 flex items-center m-auto gap-5 border rounded-full bg-white px-6 py-2">
          <TbHexagonLetterE size={30} />
          <Typography variant="h1" weight="semibold" align="center">
            Équipements de Protection Individuelle
          </Typography>
        </div>

        <div className="flex self-end">
          <Button
            label="Ajouter un EPI"
            fullWidth
            onClick={handleOpenCreateModal}
            marginClass="my-5"
            icon={<TbPlus size={20} />}
          />
        </div>

        <DataTable
          displayTotalNumber
          enableGlobalSearch
          data={epiList}
          columns={configureColumns(
            handleOpenDeleteModal,
            handleOpenEditModal,
            epiTypes
          )}
          enablePagination
        />

        <div className="flex gap-5 justify-end">
          <Button
            onClick={exportAllDataAsCSV}
            label="CSV"
            icon={<TbDownload size={17} />}
            color="primary"
          />
          <Button
            onClick={exportAllDataAsJSON}
            label="Json"
            icon={<TbDownload size={17} />}
            color="primary"
          />
        </div>
      </DashboardLayout>

      {selectedEpiList && modalState.delete && (
        <EpiListDeleteModal
          isOpen={modalState.delete}
          onClose={handleCloseModal}
          epi={selectedEpiList}
          cannotDelete={cannotBeDeleted(selectedEpiList) !== null}
          epiTypes={epiTypes}
          onSuccess={() => reloadEpi("Suppresion d'un EPI")}
        />
      )}

      {selectedEpiList && (
        <EpiListEditModal
          isOpen={modalState.edit}
          onClose={handleCloseModal}
          epi={selectedEpiList}
          epiTypes={epiTypes}
          onSuccess={() => reloadEpi("Modification de l'EPI")}
          epiList={epiList}
        />
      )}

      {modalState.create && (
        <EpiListCreateModal
          isOpen={modalState.create}
          onClose={handleCloseModal}
          onSuccess={() => reloadEpi("Ajout d'un nouveau EPI")}
          epiTypes={epiTypes}
          epiList={epiList}
        />
      )}
    </>
  );
};
