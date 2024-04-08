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
  cannotDelete?: boolean;
}

export const EpiListDeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  epi,
  epiTypes,
  onSuccess,
  cannotDelete = false,
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
    <BaseModal isOpen={isOpen} maxWidth="lg" onCloseClick={onClose}>
      {!cannotDelete ? (
        <>
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
        </>
      ) : (
        <>
          <Typography
            variant="h2"
            marginClass="my-4"
            align="center"
            transform="uppercase"
            color="red"
            weight="semibold"
          >
            Attention :
          </Typography>
          <Typography
            variant="h4"
            align="center"
            color="red"
            marginClass="mb-2"
          >
            Vous ne pouvez pas supprimer cet EPI car il{" "}
            <strong>possède un contrôle</strong>
          </Typography>
          <Typography
            variant="smallParagraph"
            marginClass="mb-10"
            align="center"
          >
            Si vous êtes sûr de vouloir supprimer cet EPI, veuillez d'abord
            supprimer le(s) contrôle(s) associé(s).
          </Typography>
        </>
      )}

      <div className="flex justify-around gap-5">
        <Button
          type="button"
          label="Annuler"
          color="alert"
          fullWidth
          onClick={onClose}
        />
        {!cannotDelete ? (
          <Button
            type="submit"
            label="Supprimer"
            color="primary"
            fullWidth
            onClick={handleDelete}
          />
        ) : (
          <Button
            type="button"
            label="Voir les contrôles"
            color="secondary"
            fullWidth
            href="/checks"
          />
        )}
      </div>
    </BaseModal>
  );
};
