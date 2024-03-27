import React from "react";
import axios from "axios";
import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";

import { EPI, EpiType } from "@/types/type";
import { getEpiTypeName } from "@/utils/getEpiTypeName";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  epi: EPI;
  epiTypes: EpiType[];
  onSuccess: () => void;
}

export const EpiListDeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  epi,
  epiTypes,
  onSuccess,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5500/epi/${epi.id}`);
      console.log(`EPI avec l'id ${epi.id} supprimé.`);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'epi:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} maxWidth="xl" onCloseClick={onClose}>
      <Typography variant="h1" marginClass="mt-5" align="center">
        Confirmer la suppression
      </Typography>
      <Typography variant="paragraph" marginClass="my-4" align="center">
        Êtes-vous sûr de vouloir supprimer :{" "}
        <strong>
          {getEpiTypeName(epiTypes, epi.epiType)} [{epi.innerId}]
        </strong>{" "}
        ?
      </Typography>

      <div className="flex justify-around gap-5">
        <Button
          type="button"
          label="Annuler"
          color="alert"
          fullWidth
          onClick={onClose}
        />
        <Button
          type="submit"
          label="Supprimer"
          color="primary"
          fullWidth
          onClick={handleDelete}
        />
      </div>
    </BaseModal>
  );
};
