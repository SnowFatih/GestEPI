import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avion, Entretien, Mecanicien } from "@/types/type";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { DataTable } from "@/components/molecules/DataTable";
import { configureColumns } from "./tableDefinition";
import { TbPlus, TbTool, TbUsers } from "react-icons/tb";

import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { EntretienCreateModal } from "@/components/molecules/EntretienCreateModal";
import { EntretienDeleteModal } from "@/components/molecules/EntretienDeleteModal";
import { EntretienEditModal } from "@/components/molecules/EntretienEditModal";

export const EntretienListPage = () => {
  const [entretiens, setEntretiens] = useState<Entretien[]>([]);
  const [avions, setAvions] = useState<Avion[]>([]);
  const [mecaniciens, setMecaniciens] = useState<Mecanicien[]>([]);
  const [modalState, setModalState] = useState({
    create: false,
    edit: false,
    delete: false,
  });
  const [selectedEntretien, setSelectedEntretien] = useState(
    null as Entretien | null
  );

  useEffect(() => {
    const fetchAvions = async () => {
      try {
        const response = await axios.get("http://localhost:5500/avions");
        setAvions(response.data);
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
      } catch (error) {
        console.error("Erreur lors de la récupération des avions");
      }
    };

    fetchMecaniciens();
  }, []);

  useEffect(() => {
    const fetchEntretiens = async () => {
      try {
        const response = await axios.get("http://localhost:5500/entretiens");
        setEntretiens(response.data);
        console.log("Entretiens récupérés:", response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des mecanos");
      }
    };

    fetchEntretiens();
  }, []);

  const handleOpenCreateModal = () => {
    setModalState({ ...modalState, create: true });
  };

  const handleCloseModal = () => {
    setModalState({ create: false, edit: false, delete: false });
    setSelectedEntretien(null);
  };

  const handleOpenEditModal = (entretien: Entretien) => {
    setSelectedEntretien(entretien);
    setModalState({ ...modalState, edit: true });
  };

  const handleOpenDeleteModal = (entretien: Entretien) => {
    setSelectedEntretien(entretien);
    setModalState({ ...modalState, delete: true });
  };

  const reloadEntretiens = async () => {
    try {
      const response = await axios.get("http://localhost:5500/entretiens");
      setEntretiens(response.data);
    } catch (error) {
      console.error("Erreur lors du rechargement des entretiens:", error);
    }
  };

  return (
    <>
      <DashboardLayout>
        <div className="mt-10 flex items-center m-auto gap-5 border rounded-full bg-white px-6 py-2">
          <TbTool size={30} />
          <Typography variant="h1" weight="semibold" align="center">
            Liste des entretiens sur les avions
          </Typography>
        </div>
        <div className="flex self-end">
          <Button
            label="Créer un entretien"
            fullWidth
            onClick={handleOpenCreateModal}
            marginClass="my-5"
            icon={<TbPlus size={20} />}
          />
        </div>

        <DataTable
          displayTotalNumber
          enableGlobalSearch
          data={entretiens}
          columns={configureColumns(
            avions,
            mecaniciens,
            handleOpenEditModal,
            handleOpenDeleteModal
          )}
          enablePagination
        />
      </DashboardLayout>

      {selectedEntretien && modalState.delete && (
        <EntretienDeleteModal
          isOpen={modalState.delete}
          onClose={handleCloseModal}
          entretien={selectedEntretien}
          onSuccess={reloadEntretiens}
        />
      )}

      {selectedEntretien && (
        <EntretienEditModal
          avions={avions}
          isOpen={modalState.edit}
          onClose={handleCloseModal}
          entretien={selectedEntretien}
          mecaniciens={mecaniciens}
          onSuccess={reloadEntretiens}
        />
      )}

      {modalState.create && (
        <EntretienCreateModal
          avions={avions}
          mecaniciens={mecaniciens}
          isOpen={modalState.create}
          onClose={handleCloseModal}
          onSuccess={reloadEntretiens}
        />
      )}
    </>
  );
};
