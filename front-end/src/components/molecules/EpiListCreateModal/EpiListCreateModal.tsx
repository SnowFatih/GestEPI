import React, { useState } from "react";

import axios from "axios";
import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { CheckFrequencyUnit, EPI, EpiType, User } from "@/types/type";
import { getEpiTypeName } from "@/utils/getEpiTypeName";
import classNames from "classnames";
import { TbPlus, TbX } from "react-icons/tb";

const basicColors = [
  { name: "Rouge", value: "#ff0000" },
  { name: "Vert", value: "#00ff00" },
  { name: "Bleu", value: "#0000ff" },
  { name: "Jaune", value: "#ffff00" },
  { name: "Orange", value: "#ffa500" },
];

const initialState = {
  brand: "",
  model: "",
  serialNumber: "",
  innerId: "",
  epiType: "",
  size: "",
  color: "",
  purchaseDate: "",
  manufactureDate: "",
  inServiceDate: "",
  checkFrequency: 1,
  checkFrequencyUnit: CheckFrequencyUnit.YEAR,
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  users: User[];
  types: EpiType[];
  epi: EPI[];
}

export const EpiListCreateModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  users,
  types,
  epi,
}) => {
  const [newEpiList, setNewEpiList] = useState(initialState);

  const epiOptions = types.map((epiItem) => ({
    id: epiItem.id,
    name: epiItem.label,
  }));

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewEpiList({ ...newEpiList, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5500/epi",
        newEpiList
      );
      console.log("Nouvel Epi ajouté:", response.data);
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de l'ajout du nouvel EpiList:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} maxWidth="xxl" onCloseClick={onClose}>
      <Typography marginClass="mt-5" align="center" variant="h2">
        Ajouter un nouveau EPI :
      </Typography>
      <form className="flex flex-col gap-4 gap-y-8 p-4" onSubmit={handleSubmit}>
        <div className="gap-5 grid grid-cols-2">
          <span>
            <Typography variant="paragraph" marginClass="mb-1">
              Marque*:
            </Typography>
            <input
              type="text"
              name="brand"
              value={newEpiList.brand}
              onChange={handleInputChange}
            />
          </span>
          <span>
            <Typography variant="paragraph" marginClass="mb-1">
              Modèle*:
            </Typography>
            <input
              type="text"
              name="model"
              value={newEpiList.model}
              onChange={handleInputChange}
            />
          </span>
        </div>
        <div className="gap-5 grid grid-cols-2">
          <span>
            <Typography variant="paragraph" marginClass="mb-1">
              Numéro de série*:
            </Typography>
            <input
              type="text"
              name="serialNumber"
              value={newEpiList.serialNumber}
              onChange={handleInputChange}
            />
          </span>
          <span>
            <Typography variant="paragraph" marginClass="mb-1">
              ID interne*:
            </Typography>
            <input
              type="text"
              name="innerId"
              value={newEpiList.innerId}
              onChange={handleInputChange}
            />
          </span>
        </div>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Type d'EPI*:
          </Typography>
          <select
            name="epiType"
            value={newEpiList.epiType}
            onChange={handleInputChange}
            required
          >
            <option value="">Sélectionnez un type d'EPI</option>
            {epiOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </span>

        <div className="grid grid-cols-2">
          <span>
            <Typography variant="paragraph" marginClass="mb-1">
              Taille:
            </Typography>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                name="size"
                min={0}
                value={newEpiList.size}
                onChange={handleInputChange}
                className="w-20"
              />
              <label>m</label>
            </div>
          </span>
          <span>
            <Typography variant="paragraph" marginClass="mb-1">
              Couleur:
            </Typography>

            <div className="flex flex-wrap gap-2 mb-2">
              {basicColors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  style={{
                    backgroundColor: color.value,
                  }}
                  className={classNames("w-8 h-8 rounded-full cursor-pointer", {
                    "border-2 border-black": newEpiList.color === color.value,
                  })}
                  onClick={() =>
                    setNewEpiList({ ...newEpiList, color: color.value })
                  }
                  title={color.name}
                />
              ))}
              <label
                style={{
                  backgroundColor: newEpiList.color,
                }}
                className={classNames(
                  "w-8 h-8 flex items-center justify-center border-2 rounded-full cursor-pointer",
                  newEpiList.color
                    ? `border-black border-solid ${
                        basicColors.some((c) => c.value === newEpiList.color)
                          ? "border-dashed"
                          : `border-solid`
                      }`
                    : "border-dashed border-gray-400"
                )}
              >
                <input
                  type="color"
                  className="w-full h-full opacity-0 cursor-pointer"
                  value={newEpiList.color}
                  onChange={handleInputChange}
                  name="color"
                />
                <div
                  className={classNames(
                    "flex justify-center text-center relative",
                    newEpiList.color &&
                      !basicColors.some((c) => c.value === newEpiList.color) &&
                      "2px solid black"
                  )}
                >
                  <TbPlus size={20} className="mr-2" />
                </div>
              </label>
            </div>
          </span>
        </div>
        <div className="gap-3 grid grid-cols-3">
          <span>
            <Typography variant="paragraph" marginClass="mb-1">
              Date d'achat:
            </Typography>
            <input
              type="date"
              name="purchaseDate"
              value={newEpiList.purchaseDate}
              onChange={handleInputChange}
            />
          </span>

          <span>
            <Typography variant="paragraph" marginClass="mb-1">
              Date de fabrication:
            </Typography>
            <input
              type="date"
              name="manufactureDate"
              value={newEpiList.manufactureDate}
              onChange={handleInputChange}
            />
          </span>
          <span>
            <Typography variant="paragraph" marginClass="mb-1">
              Date de mise en service:
            </Typography>
            <input
              type="date"
              name="inServiceDate"
              value={newEpiList.inServiceDate}
              onChange={handleInputChange}
            />
          </span>
        </div>
        <span>
          <Typography variant="paragraph" marginClass="mb-1">
            Fréquence de contrôle*:
          </Typography>

          <div className="flex items-center gap-2">
            <input
              type="number"
              name="checkFrequency"
              value={newEpiList.checkFrequency}
              onChange={handleInputChange}
              required
              min={0}
              className="w-20"
            />
            <label>fois</label>

            <div className="flex flex-col ml-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="checkFrequencyUnit"
                  value={CheckFrequencyUnit.YEAR}
                  checked={
                    newEpiList.checkFrequencyUnit === CheckFrequencyUnit.YEAR
                  }
                  onChange={handleInputChange}
                />
                par an{newEpiList.checkFrequency > 1 && "s"}
              </label>
              <label className="flex items-center gap-2 ">
                <input
                  type="radio"
                  name="checkFrequencyUnit"
                  value={CheckFrequencyUnit.MONTH}
                  checked={
                    newEpiList.checkFrequencyUnit === CheckFrequencyUnit.MONTH
                  }
                  onChange={handleInputChange}
                />
                par mois
              </label>
            </div>
          </div>
        </span>

        <div className="flex gap-5 justify-around mt-4">
          <Button label="Annuler" color="alert" fullWidth onClick={onClose} />
          <Button type="submit" label="Ajouter" fullWidth />
        </div>
      </form>
    </BaseModal>
  );
};
