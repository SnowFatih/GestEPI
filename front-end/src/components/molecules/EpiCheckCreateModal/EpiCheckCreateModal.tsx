import React, { useState } from "react";
import axios from "axios";
import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";

const initialState = {
  epiId: "",
  checkDate: "",
  checkStatus: "",
  userId: "",
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const EpiCheckCreateModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [newEpiCheck, setNewEpiCheck] = useState(initialState);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewEpiCheck({ ...newEpiCheck, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5500/checks",
        newEpiCheck
      );
      console.log("Nouvel epiCheck ajouté:", response.data);
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de l'ajout du nouvel epiCheck:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} maxWidth="xl" onCloseClick={onClose}>
      <Typography marginClass="mt-5" align="center" variant="h2">
        Effectuer un nouveau contrôle d'EPI :
      </Typography>
      <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Équipement à contrôler* :
          </Typography>
          <input
            type="number"
            name="epiId"
            value={newEpiCheck?.epiId}
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
            value={newEpiCheck?.checkDate}
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
            value={newEpiCheck?.checkStatus}
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
            value={newEpiCheck?.userId}
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
