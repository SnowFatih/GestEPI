//********** Imports **********//

import { entretienModel } from '../models/entretienModel';
import { Entretien, EntretienFilters } from '../types/type';


//********** Managers **********//
export const manageGetAllEntretiens = async (filters?: EntretienFilters): Promise<Entretien[]> => {
  if (filters && Object.keys(filters).length) {
    return entretienModel.getWithFilters(filters);
  }
  return entretienModel.getAll();
};


export const managePostOrPutEntretien = async (entretienData: Entretien): Promise<Entretien> => {
  try {
    const result = await entretienModel.addOrUpdate(entretienData);
    console.log("Résultat de l'opération DB:", result);
    if (result.affectedRows >= 1) {
      return entretienData;
    } else {
      throw new Error(`Opération DB non conforme : ${result.affectedRows} lignes affectées.`);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour ou de l'ajout d'un entretien");
    throw new Error("Erreur lors de la mise à jour ou de l'ajout d'un entretien");
  }
};



export const manageDeleteEntretien = async (id: string): Promise<string> => {
  try {
    const result = await entretienModel.delete(id);
    if (result.affectedRows === 1) {
      return `Entretien ${id} a bien été supprimé.`;
    } else {
      throw new Error(`Erreur de suppresion de l'entretien ${id}.`);
    }
  } catch (error) {
    throw new Error(`Erreur de suppresion de l'entretien ${id}.`);
  }
};