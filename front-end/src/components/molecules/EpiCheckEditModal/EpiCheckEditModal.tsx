import React, { useEffect, useState } from "react";

import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { Switch } from "@/components/organisms/Switch";
import axios from "axios";
import { EpiCheck } from "@/types/type";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  epiCheck: EpiCheck;
  onSuccess: () => void;
}

export const EpiCheckEditModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  epiCheck,
  onSuccess,
}) => {
  const [editEpiCheck, setEditEpiCheck] = useState<EpiCheck>(epiCheck);

  useEffect(() => {
    setEditEpiCheck(epiCheck);
  }, [epiCheck]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditEpiCheck({ ...editEpiCheck, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5500/checks/`, editEpiCheck);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'epiCheck:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} maxWidth="xl" onCloseClick={onClose}>
      <Typography marginClass="mt-5" align="center" variant="h2">
        Modification du contrôle datant du
      </Typography>
      <Typography variant="h3" align="center" weight="semibold">
        {editEpiCheck?.checkDate}
      </Typography>
      <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Équipement à contrôler* :
          </Typography>
          <input
            type="number"
            name="epiId"
            value={editEpiCheck?.epiId}
            onChange={handleInputChange}
            placeholder="Casque"
            required
          />
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Date du contrôle*:
          </Typography>
          <input
            type="text"
            name="checkDate"
            value={editEpiCheck?.checkDate}
            onChange={handleInputChange}
            placeholder="21 avril 2024"
            required
          />
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Statut du contrôle*:
          </Typography>
          <input
            type="number"
            name="checkStatus"
            value={editEpiCheck?.checkStatus}
            onChange={handleInputChange}
            placeholder="Conforme"
            required
          />
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Utilisateur à charge du contrôle*:
          </Typography>
          <input
            type="number"
            name="userId"
            value={editEpiCheck?.userId}
            onChange={handleInputChange}
            placeholder="Utilisateur"
            required
          />
        </span>

        <div className="flex gap-5 justify-around mt-4">
          <Button label="Annuler" color="alert" fullWidth onClick={onClose} />
          <Button type="submit" label="Confirmer" fullWidth />
        </div>
      </form>
    </BaseModal>
  );
};
