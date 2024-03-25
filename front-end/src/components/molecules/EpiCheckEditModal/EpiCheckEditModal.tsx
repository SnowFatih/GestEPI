import React, { useEffect, useState } from "react";

import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { Switch } from "@/components/organisms/Switch";
import axios from "axios";
import { EPI, EpiCheck, EpiType, User } from "@/types/type";
import { checkStatusOptions } from "@/utils/statusStyle";
import { formatDateString, getFormattedDateFromDate } from "@/utils/date";
import { getUserNameById } from "@/utils/getUserNameById";
import { getEpiTypeName } from "@/utils/getEpiTypeName";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  epiCheck: EpiCheck;
  onSuccess: () => void;
  users: User[];
  types: EpiType[];
  epi: EPI[];
}

export const EpiCheckEditModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  epiCheck,
  onSuccess,
  users,
  types,
  epi,
}) => {
  const [editEpiCheck, setEditEpiCheck] = useState<EpiCheck>(epiCheck);

  const epiOptions = epi.map((epiItem) => ({
    id: epiItem.id,
    name: `${getEpiTypeName(types, epiItem.id)} [${epiItem.innerId}] | ${
      epiItem.brand
    } ${epiItem.model} `,
  }));

  useEffect(() => {
    setEditEpiCheck(epiCheck);
  }, [epiCheck]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditEpiCheck({ ...editEpiCheck, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5500/checks/`, editEpiCheck);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'epiCheck:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} maxWidth="xl" onCloseClick={onClose}>
      <Typography marginClass="mt-5" align="center" variant="h2">
        Modification du contrôle datant du
      </Typography>
      <Typography variant="h3" align="center">
        <strong>{formatDateString(editEpiCheck?.checkDate)}</strong> réalisé par{" "}
        {""}
        <strong>{getUserNameById(users, editEpiCheck?.userId)}</strong>
      </Typography>
      <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            EPI contrôlé*:
          </Typography>
          <select
            name="epiId"
            value={editEpiCheck.epiId}
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
            value={editEpiCheck?.checkDate}
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
            value={editEpiCheck?.checkStatus}
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
            value={editEpiCheck?.userId}
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
          <Button type="submit" label="Modifier" fullWidth />
        </div>
      </form>
    </BaseModal>
  );
};
