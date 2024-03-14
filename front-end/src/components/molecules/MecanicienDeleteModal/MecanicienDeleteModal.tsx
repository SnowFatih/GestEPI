import React from "react";
import axios from "axios";
import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";

import { Mecanicien } from "@/types/type";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  mecanicien: Mecanicien;
  onSuccess: () => void;
}

export const MecanicienDeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  mecanicien,
  onSuccess,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5500/mecaniciens/${mecanicien.id}`);
      console.log(`Mecanicien avec l'id ${mecanicien.id} est supprimé.`);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la suppression du mecanicien:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} maxWidth="xl" onCloseClick={onClose}>
      <Typography variant="h1" marginClass="mt-5" align="center">
        Confirmer la suppression
      </Typography>
      <Typography variant="paragraph" marginClass="my-4" align="center">
        Êtes-vous sûr de vouloir retirer{" "}
        <strong>
          {mecanicien.nom} {mecanicien.prenom}
        </strong>{" "}
        ?
      </Typography>
      <div className="flex justify-around gap-5">
        <Button label="Annuler" color="alert" fullWidth onClick={onClose} />
        <Button
          label="Retirer"
          color="primary"
          fullWidth
          onClick={handleDelete}
        />
      </div>
    </BaseModal>
  );
};
