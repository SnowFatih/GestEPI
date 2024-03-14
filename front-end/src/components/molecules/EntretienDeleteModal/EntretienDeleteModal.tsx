import React from "react";
import axios from "axios";
import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";

import { Avion, Entretien } from "@/types/type";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  entretien: Entretien;
  onSuccess: () => void;
}

export const EntretienDeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  entretien,
  onSuccess,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5500/entretiens/${entretien.id}`);
      console.log(`Entretien avec l'id ${entretien.id} est supprimé.`);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la suppression du entretien:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} maxWidth="xl" onCloseClick={onClose}>
      <Typography variant="h1" marginClass="mt-5" align="center">
        Confirmer la suppression
      </Typography>
      <Typography variant="paragraph" marginClass="my-4" align="center">
        Êtes-vous sûr de vouloir retirer l'entretien{" "}
        <strong>#{entretien.id}</strong> ?
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
