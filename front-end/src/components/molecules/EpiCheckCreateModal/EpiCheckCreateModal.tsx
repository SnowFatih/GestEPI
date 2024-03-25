import React, { useState } from "react";
import axios from "axios";
import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { EPI, EpiType, User } from "@/types/type";
import { checkStatusOptions } from "@/utils/statusStyle";
import { getEpiTypeName } from "@/utils/getEpiTypeName";

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
  users: User[];
  types: EpiType[];
  epi: EPI[];
}

export const EpiCheckCreateModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  users,
  types,
  epi,
}) => {
  const [newEpiCheck, setNewEpiCheck] = useState(initialState);

  const epiOptions = epi.map((epiItem) => ({
    id: epiItem.id,
    name: `${getEpiTypeName(types, epiItem.id)} [${epiItem.innerId}] | ${
      epiItem.brand
    } ${epiItem.model} `,
  }));

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
            EPI à contrôler*:
          </Typography>
          <select
            name="epiId"
            value={newEpiCheck.epiId}
            onChange={handleInputChange}
            required
          >
            <option value="">Sélectionnez un EPI</option>
            {epiOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Date du contrôle*:
          </Typography>
          <input
            type="date"
            name="checkDate"
            value={newEpiCheck?.checkDate}
            onChange={handleInputChange}
            required
          />
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Statut du contrôle*:
          </Typography>
          <select
            name="checkStatus"
            value={newEpiCheck.checkStatus}
            onChange={handleInputChange}
            required
          >
            <option value="">Sélectionnez un statut</option>
            {checkStatusOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </span>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Utilisateur à charge du contrôle*:
          </Typography>
          <select
            name="userId"
            value={newEpiCheck.userId}
            onChange={handleInputChange}
            required
          >
            <option value="">Sélectionnez un utilisateur</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
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
