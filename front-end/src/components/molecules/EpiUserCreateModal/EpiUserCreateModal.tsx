import React, { useState } from "react";
import axios from "axios";
import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { UserType } from "@/types/type";
import { getUserTypeLabel } from "@/utils/getUserTypeLabel";

const initialState = {
  firstName: "",
  lastName: "",
  phone: "",
  mail: "",
  userPassword: "",
  userType: UserType.USER,
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const EpiUserCreateModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [newUser, setNewUser] = useState(initialState);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedValue = name === "userType" ? parseInt(value, 10) : value;
    setNewUser({ ...newUser, [name]: updatedValue });
  };

  const userTypeOptions = Object.values(UserType)
    .filter((value) => typeof value === "number")
    .map((value) => ({
      label: getUserTypeLabel(value),
      value: value,
    }));

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5500/users", newUser);
      console.log("Nouveau utilisateur ajouté:", response.data);
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de l'ajout du nouveau utilisateur:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} maxWidth="xl" onCloseClick={onClose}>
      <Typography marginClass="mt-5" align="center" variant="h2">
        Ajout d'un nouveau utilisateur :
      </Typography>
      <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
        <div className="flex gap-10 w-full">
          <span>
            <Typography variant="paragraph" marginClass="mb-1">
              Nom* :
            </Typography>
            <input
              type="text"
              name="lastName"
              value={newUser?.lastName}
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
              name="firstName"
              value={newUser?.firstName}
              onChange={handleInputChange}
              placeholder="Prénom"
              required
            />
          </span>
        </div>
        <div className="flex gap-10 w-full">
          <span>
            <Typography variant="paragraph" marginClass="mb-1">
              Numéro de téléphone :
            </Typography>
            <input
              type="tel"
              name="phone"
              value={newUser?.phone}
              onChange={handleInputChange}
              placeholder="Numéro de téléphone"
            />
          </span>
          <span>
            <Typography variant="paragraph" marginClass="mb-1">
              Adresse e-mail :
            </Typography>
            <input
              type="email"
              name="mail"
              id="mail"
              value={newUser.mail}
              onChange={handleInputChange}
              placeholder="Adresse e-mail"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
          </span>
        </div>
        <div className="flex gap-10 w-full">
          <span>
            <Typography variant="paragraph" marginClass="mb-1">
              Mot de passe :
            </Typography>
            <input
              type="password"
              name="userPassword"
              id="userPassword"
              value={newUser.userPassword}
              onChange={handleInputChange}
              placeholder="Mot de passe"
            />
          </span>
          <span>
            <Typography variant="paragraph" marginClass="mb-1">
              Rôle de l'utilisateur :
            </Typography>
            <select
              name="userType"
              value={newUser.userType}
              onChange={handleInputChange}
              required
            >
              {userTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </span>
        </div>

        <div className="flex gap-5 justify-around mt-4">
          <Button label="Annuler" color="alert" fullWidth onClick={onClose} />
          <Button type="submit" label="Confirmer" fullWidth />
        </div>
      </form>
    </BaseModal>
  );
};
