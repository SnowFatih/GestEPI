import React, { useState, useEffect } from "react";
import axios from "axios";
import { EpiType, User } from "@/types/type";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { DataTable } from "@/components/molecules/DataTable";
import { configureColumns } from "./tableDefinition";
import { TbList, TbPlus } from "react-icons/tb";
import { DashboardLayout } from "@/components/templates/DashboardLayout";

import toast from "react-hot-toast";

import { EpiTypeCreateModal } from "@/components/molecules/EpiTypeCreateModal";
import { EpiTypeDeleteModal } from "@/components/molecules/EpiTypeDeleteModal";
import { EpiUserCreateModal } from "@/components/molecules/EpiUserCreateModal";

export const UsersListPage = () => {
  const [epiUser, setEpiUsers] = useState<User[]>([]);
  const [modalState, setModalState] = useState({
    create: false,
    delete: false,
  });
  const [selectedUser, setSelectedUser] = useState(null as User | null);

  useEffect(() => {
    const fetchEpiUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5500/users");
        setEpiUsers(response.data);
        console.log("EpiUsers récupérés:", response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des epiTypes");
      }
    };

    fetchEpiUsers();
  }, []);

  const handleOpenCreateModal = () => {
    setModalState({ ...modalState, create: true });
  };

  const handleCloseModal = () => {
    setModalState({ create: false, delete: false });
    setSelectedUser(null);
  };

  const handleOpenDeleteModal = (epiUser: User) => {
    setSelectedUser(epiUser);
    setModalState({ ...modalState, delete: true });
  };

  const reloadEpiUsers = async (
    message: string = "Action réalisée avec succès"
  ) => {
    try {
      const response = await axios.get("http://localhost:5500/users");
      setEpiUsers(response.data);
      toast.success(message, {
        duration: 4000,
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Erreur lors du rechargement des users:", error);
      toast.error("Erreur lors du rechargement des utilisateurs", {
        duration: 4000,
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <DashboardLayout>
        <div className="mt-10 flex items-center m-auto gap-5 border rounded-full bg-white px-6 py-2">
          <TbList size={30} />
          <Typography variant="h1" weight="semibold" align="center">
            Les types d'équipements
          </Typography>
        </div>

        <div className="flex self-end">
          <Button
            label="Ajouter un utilisateur"
            fullWidth
            onClick={handleOpenCreateModal}
            marginClass="my-5"
            icon={<TbPlus size={20} />}
          />
        </div>

        <DataTable
          displayTotalNumber
          enableGlobalSearch
          data={epiUser}
          columns={configureColumns(handleOpenDeleteModal)}
          enablePagination
        />
      </DashboardLayout>

      {/* {selectedUser && modalState.delete && (
        <EpiUserCreateModal
          isOpen={modalState.delete}
          onClose={handleCloseModal}
          epiType={selectedUser}
          onSuccess={() => reloadEpiUsers("Suppresion d'un type d'équipement")}
        />
      )} */}

      {modalState.create && (
        <EpiUserCreateModal
          isOpen={modalState.create}
          onClose={handleCloseModal}
          onSuccess={() => reloadEpiUsers("Ajout d'un nouveau utilisateur")}
        />
      )}
    </>
  );
};
