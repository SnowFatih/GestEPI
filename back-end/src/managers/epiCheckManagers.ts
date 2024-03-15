//********** Imports **********//
import { epiCheckModel } from '../models/epiCheckModel'; 
import { EpiCheck, EpiCheckFilter } from '../types/type';


//********** Managers **********//
export const manageGetAllEpiChecks = async (filters?: EpiCheckFilter): Promise<EpiCheck[]> => {
  if (filters && Object.keys(filters).length) {
    return epiCheckModel.getWithFilters(filters);
  }
  return epiCheckModel.getAll();
};


export const managePostOrPutEpiCheck = async (epiCheckData: EpiCheck): Promise<EpiCheck> => {
  try {
    const result = await epiCheckModel.addOrUpdate(epiCheckData);
    console.log("Résultat de l'opération DB:", result);
    if (result.affectedRows >= 1) {
      return epiCheckData;
    } else {
      throw new Error(`Opération DB non conforme : ${result.affectedRows} lignes affectées.`);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour ou de l'ajout d'un epiCheck");
    throw new Error("Erreur lors de la mise à jour ou de l'ajout d'un epiCheck");
  }
};



export const manageDeleteEpiCheck = async (id: any): Promise<string> => {
  try {
    const result = await epiCheckModel.delete(id);
    if (result.affectedRows === 1) {
      return `EpiCheck avec l'id ${id} a bien été supprimé.`;
    } else {
      throw new Error(`Erreur de suppresion de l'epiCheck ${id}.`);
    }
  } catch (error) {
    throw new Error(`Erreur de suppresion de l'epiCheck ${id}.`);
  }
};
