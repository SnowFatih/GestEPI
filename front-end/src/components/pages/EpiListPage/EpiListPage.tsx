import React, { useState, useEffect } from "react";
import axios from "axios";
import { EPI, EpiType, User } from "@/types/type";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { DataTable } from "@/components/molecules/DataTable";
import { configureColumns } from "./tableDefinition";
import { TbHexagonLetterE, TbPlus } from "react-icons/tb";
import { DashboardLayout } from "@/components/templates/DashboardLayout";

import toast from "react-hot-toast";

import { EpiListCreateModal } from "@/components/molecules/EpiListCreateModal";
import { EpiListDeleteModal } from "@/components/molecules/EpiListDeleteModal";
import { EpiTypeEditModal } from "@/components/molecules/EpiTypeEditModal";
import { EpiListEditModal } from "@/components/molecules/EpiListEditModal";

export const EpiListPage = () => {
  const [epiList, setEpiList] = useState<EPI[]>([]);
  const [epiTypes, setEpiTypes] = useState<EpiType[]>([]);
  const [modalState, setModalState] = useState({
    create: false,
    edit: false,
    delete: false,
  });
  const [epiUsers, setUsers] = useState<User[]>([]);
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

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5500/users");
        setUsers(response.data);
        console.log("Users récupérés:", response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des users");
      }
    };
    fetchUsers();

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
      </DashboardLayout>

      {selectedEpiList && modalState.delete && (
        <EpiListDeleteModal
          isOpen={modalState.delete}
          onClose={handleCloseModal}
          epi={selectedEpiList}
          epiTypes={epiTypes}
          onSuccess={() => reloadEpi("Suppresion d'un EPI")}
        />
      )}

      {selectedEpiList && (
        <EpiListEditModal
          isOpen={modalState.edit}
          onClose={handleCloseModal}
          epi={epiList}
          types={epiTypes}
          onSuccess={() => reloadEpi("Modification d'un EPI")}
          epiList={selectedEpiList}
        />
      )}

      {modalState.create && (
        <EpiListCreateModal
          isOpen={modalState.create}
          onClose={handleCloseModal}
          onSuccess={() => reloadEpi("Ajout d'un nouveau EPI")}
          types={epiTypes}
          epi={epiList}
        />
      )}
    </>
  );
};
