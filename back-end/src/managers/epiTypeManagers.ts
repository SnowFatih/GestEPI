//********** Imports **********//
import { epiTypeModel } from '../models/epiTypeModel'; 
import { EpiType, EpiTypeFilter } from '../types/type';


//********** Managers **********//
export const manageGetAllEpiTypes = async (filters?: EpiTypeFilter): Promise<EpiType[]> => {
  if (filters && Object.keys(filters).length) {
    return epiTypeModel.getWithFilters(filters);
  }
  return epiTypeModel.getAll();
};


export const managePostOrPutEpiType = async (epiTypeData: EpiType): Promise<EpiType> => {
  try {
    const result = await epiTypeModel.addOrUpdate(epiTypeData);
    console.log("Résultat de l'opération DB:", result);
    if (result.affectedRows >= 1) {
      return epiTypeData;
    } else {
      throw new Error(`Opération DB non conforme : ${result.affectedRows} lignes affectées.`);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour ou de l'ajout d'un epiType");
    throw new Error("Erreur lors de la mise à jour ou de l'ajout d'un epiType");
  }
};



export const manageDeleteEpiType = async (id: any): Promise<string> => {
  try {
    const result = await epiTypeModel.delete(id);
    if (result.affectedRows === 1) {
      return `EpiType avec l'id ${id} a bien été supprimé.`;
    } else {
      throw new Error(`Erreur de suppresion de l'epiType ${id}.`);
    }
  } catch (error) {
    throw new Error(`Erreur de suppresion de l'epiType ${id}.`);
  }
};
