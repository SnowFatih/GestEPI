import React, { useEffect, useState } from "react";
import { Avion, Mecanicien } from "@/types/type";
import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import axios from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  avions: Avion[];
  mecanicien: Mecanicien;
  onSuccess: () => void;
}

export const MecanicienEditModal: React.FC<ModalProps> = ({
  avions,
  isOpen,
  onClose,
  mecanicien,
  onSuccess,
}) => {
  const [editMecanicien, setEditMecanicien] = useState<Mecanicien>(mecanicien);

  useEffect(() => {
    setEditMecanicien(mecanicien);
  }, [mecanicien]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditMecanicien({ ...editMecanicien, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5500/mecaniciens/`, editMecanicien);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mecanicien:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} maxWidth="xl" onCloseClick={onClose}>
      <Typography marginClass="mt-5" align="center">
        Modification des informations du mécanicien:
      </Typography>
      <Typography variant="h3" align="center" weight="semibold">
        {editMecanicien?.nom} {editMecanicien?.prenom}
      </Typography>
      <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Nom :
          </Typography>
          <input
            type="text"
            name="nom"
            value={editMecanicien?.nom}
            onChange={handleInputChange}
            placeholder="Nom"
            required
          />
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Prénom :
          </Typography>
          <input
            type="text"
            name="prenom"
            value={editMecanicien?.prenom}
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
            value={editMecanicien?.idAvion}
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
