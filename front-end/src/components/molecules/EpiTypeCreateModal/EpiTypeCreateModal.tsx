import React, { useState } from "react";
import axios from "axios";
import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";

const initialState = {
  label: "",
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const EpiTypeCreateModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [newEpiType, setNewEpiType] = useState(initialState);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewEpiType({ ...newEpiType, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5500/types",
        newEpiType
      );
      console.log("Nouvel epiType ajouté:", response.data);
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de l'ajout du nouvel epiType:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} maxWidth="xl" onCloseClick={onClose}>
      <Typography marginClass="mt-5" align="center" variant="h2">
        Ajout d'un nouveau type d'équipement :
      </Typography>
      <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Nom de l'équipement* :
          </Typography>
          <input
            type="text"
            name="label"
            value={newEpiType?.label}
            onChange={handleInputChange}
            placeholder="Casque"
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
