//********** Imports **********//

import { mecanicienModel } from '../models/mecanicienModel';
import { Mecanicien, MecanicienFilters } from '../types/type';


//********** Managers **********//
export const manageGetAllMecaniciens = async (filters?: MecanicienFilters): Promise<Mecanicien[]> => {
  if (filters && Object.keys(filters).length) {
    return mecanicienModel.getWithFilters(filters);
  }
  return mecanicienModel.getAll();
};


export const managePostOrPutMecanicien = async (mecanicienData: Mecanicien): Promise<Mecanicien> => {
  try {
    const result = await mecanicienModel.addOrUpdate(mecanicienData);
    console.log("Résultat de l'opération DB:", result);
    if (result.affectedRows >= 1) {
      return mecanicienData;
    } else {
      throw new Error(`Opération DB non conforme : ${result.affectedRows} lignes affectées.`);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour ou de l'ajout d'un mécanicien");
    throw new Error("Erreur lors de la mise à jour ou de l'ajout d'un mécanicien");
  }
};



export const manageDeleteMecanicien = async (id: string): Promise<string> => {
  try {
    const result = await mecanicienModel.delete(id);
    if (result.affectedRows === 1) {
      return `Mecanicien ${id} a bien été supprimé.`;
    } else {
      throw new Error(`Erreur de suppresion du mecano ${id}.`);
    }
  } catch (error) {
    throw new Error(`Erreur de suppresion du mécano ${id}.`);
  }
};