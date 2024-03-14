import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { Avion } from "@/types/type";

const initialState = {
  nom: "",
  prenom: "",
  idAvion: 0,
};

interface ModalProps {
  avions: Avion[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const MecanicienCreateModal: React.FC<ModalProps> = ({
  avions,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [newMecanicien, setNewMecanicien] = useState(initialState);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewMecanicien({ ...newMecanicien, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5500/mecaniciens",
        newMecanicien
      );
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de l'ajout du nouveau mécanicien:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} maxWidth="xl" onCloseClick={onClose}>
      <Typography marginClass="mt-5" align="center">
        Ajout d'un nouveau mécanicien :
      </Typography>
      <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Nom* :
          </Typography>
          <input
            type="text"
            name="nom"
            value={newMecanicien?.nom}
            onChange={handleInputChange}
            placeholder="Nom"
            required
          />
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Prénom* :
          </Typography>
          <input
            type="text"
            name="prenom"
            value={newMecanicien?.prenom}
            onChange={handleInputChange}
            placeholder="Prénom"
            required
          />
        </span>

        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Avion attribué :
          </Typography>
          <select
            name="idAvion"
            value={newMecanicien.idAvion}
            onChange={handleInputChange}
            required
          >
            <option value="">Aucun avion attribué</option>
            {avions.map((avion) => (
              <option key={avion.id} value={avion.id}>
                [{avion.marque}] - {avion.modele}
              </option>
            ))}
          </select>
        </span>

        <div className="flex gap-5 justify-around mt-4">
          <Button label="Annuler" color="alert" fullWidth onClick={onClose} />
          <Button type="submit" label="Confirmer" fullWidth />
        </div>
      </form>
    </BaseModal>
  );
};

export default MecanicienCreateModal;
