import React from "react";
import axios from "axios";
import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";

import { Avion } from "@/types/type";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  avion: Avion;
  onSuccess: () => void;
}

export const AvionDeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  avion,
  onSuccess,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5500/avions/${avion.immatriculation}`
      );
      console.log(
        `Avion avec l'immatriculation ${avion.immatriculation} supprimé.`
      );
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'avion:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} maxWidth="xl" onCloseClick={onClose}>
      <Typography variant="h1" marginClass="mt-5" align="center">
        Confirmer la suppression
      </Typography>
      <Typography variant="paragraph" marginClass="my-4" align="center">
        Êtes-vous sûr de vouloir supprimer{" "}
        <strong>
          {avion.marque} {avion.modele}
        </strong>{" "}
        ?
      </Typography>
      <div className="flex justify-around gap-5">
        <Button label="Annuler" color="alert" fullWidth onClick={onClose} />
        <Button
          label="Supprimer"
          color="primary"
          fullWidth
          onClick={handleDelete}
        />
      </div>
    </BaseModal>
  );
};
