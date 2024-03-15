import React, { useState, useEffect } from "react";
import axios from "axios";
import { EpiCheck } from "@/types/type";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { DataTable } from "@/components/molecules/DataTable";
import { configureColumns } from "./tableDefinition";
import { TbPlane, TbPlus } from "react-icons/tb";
import { DashboardLayout } from "@/components/templates/DashboardLayout";

import toast from "react-hot-toast";
import { EpiCheckCreateModal } from "@/components/molecules/EpiCheckCreateModal";
import { EpiCheckDeleteModal } from "@/components/molecules/EpiCheckDeleteModal";
import { EpiCheckEditModal } from "@/components/molecules/EpiCheckEditModal";

export const EpiCheckListPage = () => {
  const [epiChecks, setEpiChecks] = useState<EpiCheck[]>([]);
  const [modalState, setModalState] = useState({
    create: false,
    edit: false,
    delete: false,
  });
  const [selectedEpiCheck, setSelectedEpiCheck] = useState(
    null as EpiCheck | null
  );

  useEffect(() => {
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
  }, []);

  const handleOpenCreateModal = () => {
    setModalState({ ...modalState, create: true });
  };

  const handleCloseModal = () => {
    setModalState({ create: false, edit: false, delete: false });
    setSelectedEpiCheck(null);
  };

  const handleOpenEditModal = (epiCheck: EpiCheck) => {
    setSelectedEpiCheck(epiCheck);
    setModalState({ ...modalState, edit: true });
  };

  const handleOpenDeleteModal = (epiCheck: EpiCheck) => {
    setSelectedEpiCheck(epiCheck);
    setModalState({ ...modalState, delete: true });
  };

  const reloadEpiChecks = async (
    message: string = "Action réalisée avec succès"
  ) => {
    try {
      const response = await axios.get("http://localhost:5500/types");
      setEpiChecks(response.data);
      toast.success(message, {
        duration: 4000,
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Erreur lors du rechargement des epiChecks:", error);
      toast.error("Erreur lors du rechargement des contrôles", {
        duration: 4000,
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <DashboardLayout>
        <div className="mt-10 flex items-center m-auto gap-5 border rounded-full bg-white px-6 py-2">
          <TbPlane size={30} />
          <Typography variant="h1" weight="semibold" align="center">
            Contrôle des EPI
          </Typography>
        </div>

        <div className="flex self-end">
          <Button
            label="Réaliser un contrôle"
            fullWidth
            onClick={handleOpenCreateModal}
            marginClass="my-5"
            icon={<TbPlus size={20} />}
          />
        </div>

        <DataTable
          displayTotalNumber
          enableGlobalSearch
          data={epiChecks}
          columns={configureColumns(handleOpenEditModal, handleOpenDeleteModal)}
          enablePagination
        />
      </DashboardLayout>

      {selectedEpiCheck && modalState.delete && (
        <EpiCheckDeleteModal
          isOpen={modalState.delete}
          onClose={handleCloseModal}
          epiCheck={selectedEpiCheck}
          onSuccess={() => reloadEpiChecks("Suppresion d'un contrôle")}
        />
      )}

      {selectedEpiCheck && (
        <EpiCheckEditModal
          isOpen={modalState.edit}
          onClose={handleCloseModal}
          epiCheck={selectedEpiCheck}
          onSuccess={() => reloadEpiChecks("Modification du contrôle")}
        />
      )}

      {modalState.create && (
        <EpiCheckCreateModal
          isOpen={modalState.create}
          onClose={handleCloseModal}
          onSuccess={() => reloadEpiChecks("Ajout d'un nouveau contrôle")}
        />
      )}
    </>
  );
};
