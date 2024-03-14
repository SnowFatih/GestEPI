import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { Avion, Mecanicien } from "@/types/type";
import { formatDate, formatDateISO } from "@/utils/day";

const initialState = {
  idAvion: 0,
  idMecanicien: 0,
  debutDate: formatDate(new Date()),
  finDate: formatDate(new Date()),
  description: "",
};

interface ModalProps {
  avions: Avion[];
  mecaniciens: Mecanicien[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const EntretienCreateModal: React.FC<ModalProps> = ({
  avions,
  mecaniciens,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [newEntretien, setNewEntretien] = useState(initialState);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "debutDate" || name === "finDate") {
      setNewEntretien({ ...newEntretien, [name]: formatDateISO(value) });
    } else {
      setNewEntretien({ ...newEntretien, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5500/entretiens",
        newEntretien
      );
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de l'ajout du nouveau entretien:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} maxWidth="xl" onCloseClick={onClose}>
      <Typography marginClass="mt-5" align="center">
        Ajout d'un nouveau entretien :
      </Typography>
      <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Avion en maintenance :
          </Typography>
          <select
            name="idAvion"
            value={newEntretien.idAvion}
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
            value={newEntretien.idMecanicien}
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
            value={newEntretien.debutDate}
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
            value={newEntretien.finDate}
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
            value={newEntretien.description}
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

export default EntretienCreateModal;
