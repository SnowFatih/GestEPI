//********** Imports **********//
import { avionModel } from '../models/avionModel'; 
import { Avion, AvionFilters } from '../types/type';


//********** Managers **********//
export const manageGetAllAvions = async (filters?: AvionFilters): Promise<Avion[]> => {
  if (filters && Object.keys(filters).length) {
    return avionModel.getWithFilters(filters);
  }
  return avionModel.getAll();
};


export const managePostOrPutAvion = async (avionData: Avion): Promise<Avion> => {
  try {
    const result = await avionModel.addOrUpdate(avionData);
    console.log("Résultat de l'opération DB:", result);
    if (result.affectedRows >= 1) {
      return avionData;
    } else {
      throw new Error(`Opération DB non conforme : ${result.affectedRows} lignes affectées.`);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour ou de l'ajout d'un avion");
    throw new Error("Erreur lors de la mise à jour ou de l'ajout d'un avion");
  }
};



export const manageDeleteAvion = async (immatriculation: string): Promise<string> => {
  try {
    const result = await avionModel.delete(immatriculation);
    if (result.affectedRows === 1) {
      return `Avion avec l'immatriculation ${immatriculation} a bien été supprimé.`;
    } else {
      throw new Error(`Erreur de suppresion de l'avion ${immatriculation}.`);
    }
  } catch (error) {
    throw new Error(`Erreur de suppresion de l'avion ${immatriculation}.`);
  }
};
  
  
