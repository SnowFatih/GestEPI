import React, { useEffect, useState } from "react";
import { Avion, Entretien, Mecanicien } from "@/types/type";
import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import axios from "axios";
import { formatDate, formatDateISO } from "@/utils/day";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  avions: Avion[];
  mecaniciens: Mecanicien[];
  entretien: Entretien;
  onSuccess: () => void;
}

export const EntretienEditModal: React.FC<ModalProps> = ({
  avions,
  isOpen,
  onClose,
  entretien,
  mecaniciens,
  onSuccess,
}) => {
  const [editEntretien, setEditEntretien] = useState<Entretien>(entretien);

  useEffect(() => {
    setEditEntretien(entretien);
  }, [entretien]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditEntretien({ ...editEntretien, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedEntretien = {
      ...editEntretien,
      debutDate: formatDateISO(editEntretien.debutDate),
      finDate: formatDateISO(editEntretien.finDate),
    };

    try {
      await axios.post(`http://localhost:5500/entretiens/`, formattedEntretien);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du entretien:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} maxWidth="xl" onCloseClick={onClose}>
      <Typography marginClass="mt-5" align="center">
        Modification des informations du mécanicien:
      </Typography>
      <Typography variant="h3" align="center" weight="semibold">
        {editEntretien?.id}
      </Typography>
      <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Avion en maintenance :
          </Typography>
          <select
            name="idAvion"
            value={editEntretien.idAvion}
            onChange={handleInputChange}
            required
          >
            <option value="">Aucun avion</option>
            {avions.map((avion) => (
              <option key={avion.id} value={avion.id}>
                [{avion.marque}] - {avion.modele}
              </option>
            ))}
          </select>
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Mécanicien en charge* :
          </Typography>
          <select
            name="idMecanicien"
            value={editEntretien.idMecanicien}
            onChange={handleInputChange}
            required
          >
            <option value="">Aucun mécanicien</option>
            {mecaniciens.map((mecanicien) => (
              <option key={mecanicien.id} value={mecanicien.id}>
                {mecanicien.nom} {mecanicien.prenom}
              </option>
            ))}
          </select>
        </span>

        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Date de début :
          </Typography>
          <input
            type="date"
            name="debutDate"
            value={formatDateISO(editEntretien.debutDate)}
            onChange={handleInputChange}
            placeholder="Date de début"
          />
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Date de fin :
          </Typography>
          <input
            type="date"
            name="finDate"
            value={formatDateISO(editEntretien.finDate)}
            onChange={handleInputChange}
            placeholder="Date de fin"
          />
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Description :
          </Typography>
          <textarea
            name="description"
            value={editEntretien.description}
            onChange={handleInputChange}
            placeholder="Description"
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
