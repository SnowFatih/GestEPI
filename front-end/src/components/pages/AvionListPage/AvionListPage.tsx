import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avion } from "@/types/type";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { DataTable } from "@/components/molecules/DataTable";
import { configureColumns } from "./tableDefinition";
import { TbPlane, TbPlus } from "react-icons/tb";
import { AvionEditModal } from "@/components/molecules/AvionEditModal";
import { AvionCreateModal } from "@/components/molecules/AvionCreateModal";
import { AvionDeleteModal } from "@/components/molecules/AvionDeleteModal";
import { DashboardLayout } from "@/components/templates/DashboardLayout";

export const AvionListPage = () => {
  const [avions, setAvions] = useState<Avion[]>([]);
  const [modalState, setModalState] = useState({
    create: false,
    edit: false,
    delete: false,
  });
  const [selectedAvion, setSelectedAvion] = useState(null as Avion | null);

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

  const handleOpenCreateModal = () => {
    setModalState({ ...modalState, create: true });
  };

  const handleCloseModal = () => {
    setModalState({ create: false, edit: false, delete: false });
    setSelectedAvion(null);
  };

  const handleOpenEditModal = (avion: Avion) => {
    setSelectedAvion(avion);
    setModalState({ ...modalState, edit: true });
  };

  const handleOpenDeleteModal = (avion: Avion) => {
    setSelectedAvion(avion);
    setModalState({ ...modalState, delete: true });
  };

  const reloadAvions = async () => {
    try {
      const response = await axios.get("http://localhost:5500/avions");
      setAvions(response.data);
    } catch (error) {
      console.error("Erreur lors du rechargement des avions:", error);
    }
  };

  return (
    <>
      <DashboardLayout>
        <div className="mt-10 flex items-center m-auto gap-5 border rounded-full bg-white px-6 py-2">
          <TbPlane size={30} />
          <Typography variant="h1" weight="semibold" align="center">
            Liste des avions
          </Typography>
        </div>

        <div className="flex self-end">
          <Button
            label="Ajouter un avion"
            fullWidth
            onClick={handleOpenCreateModal}
            marginClass="my-5"
            icon={<TbPlus size={20} />}
          />
        </div>

        <DataTable
          displayTotalNumber
          enableGlobalSearch
          data={avions}
          columns={configureColumns(handleOpenEditModal, handleOpenDeleteModal)}
          enablePagination
        />
      </DashboardLayout>

      {selectedAvion && modalState.delete && (
        <AvionDeleteModal
          isOpen={modalState.delete}
          onClose={handleCloseModal}
          avion={selectedAvion}
          onSuccess={reloadAvions}
        />
      )}

      {selectedAvion && (
        <AvionEditModal
          isOpen={modalState.edit}
          onClose={handleCloseModal}
          avion={selectedAvion}
          onSuccess={reloadAvions}
        />
      )}

      {modalState.create && (
        <AvionCreateModal
          isOpen={modalState.create}
          onClose={handleCloseModal}
          onSuccess={reloadAvions}
        />
      )}
    </>
  );
};
