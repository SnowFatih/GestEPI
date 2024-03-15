import React, { useEffect, useState } from "react";

import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { Switch } from "@/components/organisms/Switch";
import axios from "axios";
import { EpiType } from "@/types/type";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  epiType: EpiType;
  onSuccess: () => void;
}

export const EpiTypeEditModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  epiType,
  onSuccess,
}) => {
  const [editEpiType, setEditEpiType] = useState<EpiType>(epiType);

  useEffect(() => {
    setEditEpiType(epiType);
  }, [epiType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditEpiType({ ...editEpiType, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5500/types/`, editEpiType);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'epiType:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} maxWidth="xl" onCloseClick={onClose}>
      <Typography marginClass="mt-5" align="center" variant="h2">
        Modification des informations de l'équipement:
      </Typography>
      <Typography variant="h3" align="center" weight="semibold">
        {editEpiType?.label}
      </Typography>
      <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Nom de l'équipement :
          </Typography>
          <input
            type="text"
            name="label"
            value={editEpiType?.label}
            onChange={handleInputChange}
            placeholder="Nom de l'équipement"
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
