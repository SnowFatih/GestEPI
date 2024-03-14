import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avion, Mecanicien } from "@/types/type";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { DataTable } from "@/components/molecules/DataTable";
import { configureColumns } from "./tableDefinition";
import { TbPlus, TbUsers } from "react-icons/tb";

import { DashboardLayout } from "@/components/templates/DashboardLayout";

import { MecanicienCreateModal } from "@/components/molecules/MecanicienCreateModal";
import { MecanicienEditModal } from "@/components/molecules/MecanicienEditModal";
import { MecanicienDeleteModal } from "@/components/molecules/MecanicienDeleteModal";

export const MecanicienListPage = () => {
  const [mecaniciens, setMecaniciens] = useState<Mecanicien[]>([]);
  const [avions, setAvions] = useState<Avion[]>([]);
  const [modalState, setModalState] = useState({
    create: false,
    edit: false,
    delete: false,
  });
  const [selectedMecanicien, setSelectedMecanicien] = useState(
    null as Mecanicien | null
  );

  useEffect(() => {
    const fetchAvions = async () => {
      try {
        const response = await axios.get("http://localhost:5500/avions");
        setAvions(response.data);
        console.log("Avions récupérés:", response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des avions");
      }
    };

    fetchAvions();
  }, []);

  useEffect(() => {
    const fetchMecaniciens = async () => {
      try {
        const response = await axios.get("http://localhost:5500/mecaniciens");
        setMecaniciens(response.data);
        console.log("Mecaniciens récupérés:", response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des mecanos");
      }
    };

    fetchMecaniciens();
  }, []);

  const handleOpenCreateModal = () => {
    setModalState({ ...modalState, create: true });
  };

  const handleCloseModal = () => {
    setModalState({ create: false, edit: false, delete: false });
    setSelectedMecanicien(null);
  };

  const handleOpenEditModal = (mecanicien: Mecanicien) => {
    setSelectedMecanicien(mecanicien);
    setModalState({ ...modalState, edit: true });
  };

  const handleOpenDeleteModal = (mecanicien: Mecanicien) => {
    setSelectedMecanicien(mecanicien);
    setModalState({ ...modalState, delete: true });
  };

  const reloadMecaniciens = async () => {
    try {
      const response = await axios.get("http://localhost:5500/mecaniciens");
      setMecaniciens(response.data);
    } catch (error) {
      console.error("Erreur lors du rechargement des mecaniciens:", error);
    }
  };

  return (
    <>
      <DashboardLayout>
        <div className="mt-10 flex items-center m-auto gap-5 border rounded-full bg-white px-6 py-2">
          <TbUsers size={30} />
          <Typography variant="h1" weight="semibold" align="center">
            Liste des mécaniciens
          </Typography>
        </div>
        <div className="flex self-end">
          <Button
            label="Ajouter un mécanicien"
            fullWidth
            onClick={handleOpenCreateModal}
            marginClass="my-5"
            icon={<TbPlus size={20} />}
          />
        </div>

        <DataTable
          displayTotalNumber
          enableGlobalSearch
          data={mecaniciens}
          columns={configureColumns(
            avions,
            handleOpenEditModal,
            handleOpenDeleteModal
          )}
          enablePagination
        />
      </DashboardLayout>

      {selectedMecanicien && modalState.delete && (
        <MecanicienDeleteModal
          isOpen={modalState.delete}
          onClose={handleCloseModal}
          mecanicien={selectedMecanicien}
          onSuccess={reloadMecaniciens}
        />
      )}

      {selectedMecanicien && (
        <MecanicienEditModal
          avions={avions}
          isOpen={modalState.edit}
          onClose={handleCloseModal}
          mecanicien={selectedMecanicien}
          onSuccess={reloadMecaniciens}
        />
      )}

      {modalState.create && (
        <MecanicienCreateModal
          avions={avions}
          isOpen={modalState.create}
          onClose={handleCloseModal}
          onSuccess={reloadMecaniciens}
        />
      )}
    </>
  );
};
