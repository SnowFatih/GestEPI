import React, { useState, useEffect } from "react";
import axios from "axios";
import { EpiType } from "@/types/type";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { DataTable } from "@/components/molecules/DataTable";
import { configureColumns } from "./tableDefinition";
import { TbPlane, TbPlus } from "react-icons/tb";
import { DashboardLayout } from "@/components/templates/DashboardLayout";

import toast from "react-hot-toast";

import { EpiTypeEditModal } from "@/components/molecules/EpiTypeEditModal";
import { EpiTypeCreateModal } from "@/components/molecules/EpiTypeCreateModal";
import { EpiTypeDeleteModal } from "@/components/molecules/EpiTypeDeleteModal";

export const EpiTypeListPage = () => {
  const [epiTypes, setEpiTypes] = useState<EpiType[]>([]);
  const [modalState, setModalState] = useState({
    create: false,
    edit: false,
    delete: false,
  });
  const [selectedEpiType, setSelectedEpiType] = useState(
    null as EpiType | null
  );

  useEffect(() => {
    const fetchEpiTypes = async () => {
      try {
        const response = await axios.get("http://localhost:5500/epi-types");
        setEpiTypes(response.data);
        console.log("EpiTypes récupérés:", response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des epiTypes");
      }
    };

    fetchEpiTypes();
  }, []);

  const handleOpenCreateModal = () => {
    setModalState({ ...modalState, create: true });
  };

  const handleCloseModal = () => {
    setModalState({ create: false, edit: false, delete: false });
    setSelectedEpiType(null);
  };

  const handleOpenEditModal = (epiType: EpiType) => {
    setSelectedEpiType(epiType);
    setModalState({ ...modalState, edit: true });
  };

  const handleOpenDeleteModal = (epiType: EpiType) => {
    setSelectedEpiType(epiType);
    setModalState({ ...modalState, delete: true });
  };

  const reloadEpiTypes = async (
    message: string = "Action réalisée avec succès"
  ) => {
    try {
      const response = await axios.get("http://localhost:5500/epi-types");
      setEpiTypes(response.data);
      toast.success(message, {
        duration: 4000,
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Erreur lors du rechargement des epiTypes:", error);
      toast.error("Erreur lors du rechargement des types d'équipements", {
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
            Liste des types d'équipements
          </Typography>
        </div>

        <div className="flex self-end">
          <Button
            label="Ajouter un type d'équipement"
            fullWidth
            onClick={handleOpenCreateModal}
            marginClass="my-5"
            icon={<TbPlus size={20} />}
          />
        </div>

        <DataTable
          displayTotalNumber
          enableGlobalSearch
          data={epiTypes}
          columns={configureColumns(handleOpenEditModal, handleOpenDeleteModal)}
          enablePagination
        />
      </DashboardLayout>

      {selectedEpiType && modalState.delete && (
        <EpiTypeDeleteModal
          isOpen={modalState.delete}
          onClose={handleCloseModal}
          epiType={selectedEpiType}
          onSuccess={() => reloadEpiTypes("Suppresion d'un type d'équipement")}
        />
      )}

      {selectedEpiType && (
        <EpiTypeEditModal
          isOpen={modalState.edit}
          onClose={handleCloseModal}
          epiType={selectedEpiType}
          onSuccess={() =>
            reloadEpiTypes("Modification du nom de l'équipement")
          }
        />
      )}

      {modalState.create && (
        <EpiTypeCreateModal
          isOpen={modalState.create}
          onClose={handleCloseModal}
          onSuccess={() =>
            reloadEpiTypes("Ajout d'un nouveau type d'équipement")
          }
        />
      )}
    </>
  );
};
