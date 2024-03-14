import React, { useState } from "react";
import axios from "axios";
import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { Switch } from "@/components/organisms/Switch";
import { Avion } from "@/types/type";

const initialState = {
  immatriculation: "",
  marque: "",
  modele: "",
  statut: "Actif",
  heuresDeVol: 0,
  logoUrl: "",
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AvionCreateModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [newAvion, setNewAvion] = useState(initialState);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewAvion({ ...newAvion, [name]: value });
  };

  const handleStatusChange = (isActive: boolean) => {
    setNewAvion({ ...newAvion, statut: isActive ? "Actif" : "Inactif" });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5500/avions",
        newAvion
      );
      console.log("Nouvel avion ajouté:", response.data);
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de l'ajout du nouvel avion:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} maxWidth="xl" onCloseClick={onClose}>
      <Typography marginClass="mt-5" align="center">
        Ajout d'un nouvel avion :
      </Typography>
      <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
        <span className="m-auto mb-5">
          <Switch
            trueLabel="Actif"
            falseLabel="Inactif"
            initialValue={newAvion?.statut === "Actif"}
            onClick={handleStatusChange}
          />
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Immatriculation* :
          </Typography>
          <input
            type="text"
            name="immatriculation"
            value={newAvion?.immatriculation}
            onChange={handleInputChange}
            placeholder="Immatriculation"
            required
          />
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Marque* :
          </Typography>
          <input
            type="text"
            name="marque"
            value={newAvion?.marque}
            onChange={handleInputChange}
            placeholder="Marque"
            required
          />
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Modèle* :
          </Typography>
          <input
            type="text"
            name="modele"
            value={newAvion?.modele}
            onChange={handleInputChange}
            placeholder="Modèle"
            required
          />
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Heures de vol* :
          </Typography>
          <input
            type="number"
            name="heuresDeVol"
            value={String(newAvion?.heuresDeVol)}
            onChange={handleInputChange}
            placeholder="Heures de Vol"
            min="0"
            required
          />
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            URL du logo :
          </Typography>
          <input
            type="text"
            name="logoUrl"
            value={newAvion?.logoUrl}
            onChange={handleInputChange}
            placeholder="URL du Logo"
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

export default AvionCreateModal;
