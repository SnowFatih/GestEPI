import React, { useEffect, useState } from "react";
import { Avion } from "@/types/type";
import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { Switch } from "@/components/organisms/Switch";
import axios from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  avion: Avion;
  onSuccess: () => void;
}

export const AvionEditModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  avion,
  onSuccess,
}) => {
  const [editAvion, setEditAvion] = useState<Avion>(avion);

  useEffect(() => {
    setEditAvion(avion);
  }, [avion]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditAvion({ ...editAvion, [name]: value });
  };

  const handleStatusChange = (isActive: boolean) => {
    setEditAvion({ ...editAvion, statut: isActive ? "Actif" : "Inactif" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5500/avions/`, editAvion);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'avion:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} maxWidth="xl" onCloseClick={onClose}>
      <Typography marginClass="mt-5" align="center">
        Modification des informations de l'avion:
      </Typography>
      <Typography variant="h3" align="center" weight="semibold">
        {editAvion?.marque} {editAvion?.modele}
      </Typography>
      <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
        <span className="m-auto mb-5">
          <Switch
            trueLabel="Actif"
            falseLabel="Inactif"
            initialValue={editAvion?.statut === "Actif"}
            onClick={handleStatusChange}
          />
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Immatriculation :
          </Typography>
          <input
            type="text"
            name="immatriculation"
            value={editAvion?.immatriculation}
            onChange={handleInputChange}
            placeholder="Immatriculation"
            required
          />
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Marque :
          </Typography>
          <input
            type="text"
            name="marque"
            value={editAvion?.marque}
            onChange={handleInputChange}
            placeholder="Marque"
            required
          />
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Modèle :
          </Typography>
          <input
            type="text"
            name="modele"
            value={editAvion?.modele}
            onChange={handleInputChange}
            placeholder="Modèle"
            required
          />
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Heures de vol :
          </Typography>
          <input
            type="number"
            name="heuresDeVol"
            value={String(editAvion?.heuresDeVol)}
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
          <span className="flex">
            <input
              type="text"
              name="logoUrl"
              value={editAvion?.logoUrl}
              onChange={handleInputChange}
              placeholder="URL du Logo"
              className={editAvion.logoUrl && "rounded-r-none"}
            />
            {editAvion.logoUrl && (
              <img
                alt={editAvion.logoUrl}
                src={editAvion.logoUrl}
                className="w-32 h-20 rounded-r-lg ring-2 ring-gray-300 object-cover bg-gray-100"
              />
            )}
          </span>
        </span>

        <div className="flex gap-5 justify-around mt-4">
          <Button label="Annuler" color="alert" fullWidth onClick={onClose} />
          <Button type="submit" label="Confirmer" fullWidth />
        </div>
      </form>
    </BaseModal>
  );
};
