//********** Imports **********//

import { EpiListModel } from '../models/epiListModel';
import { EPI, EPIFilter } from '../types/type';


//********** Managers **********//
export const manageGetAllEpiLists = async (filters?: EPIFilter): Promise<EPI[]> => {
  if (filters && Object.keys(filters).length) {
    return EpiListModel.getWithFilters(filters);
  }
  return EpiListModel.getAll();
};


export const managePostOrPutEpiList = async (EpiListData: EPI): Promise<EPI> => {
  try {
    const result = await EpiListModel.addOrUpdate(EpiListData);
    console.log("Résultat de l'opération DB:", result);
    if (result.affectedRows >= 1) {
      return EpiListData;
    } else {
      throw new Error(`Opération DB non conforme : ${result.affectedRows} lignes affectées.`);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour ou de l'ajout d'un EpiList");
    throw new Error("Erreur lors de la mise à jour ou de l'ajout d'un EpiList");
  }
};



export const manageDeleteEpiList = async (id: any): Promise<string> => {
  try {
    const result = await EpiListModel.delete(id);
    if (result.affectedRows === 1) {
      return `EpiList avec l'id ${id} a bien été supprimé.`;
    } else {
      throw new Error(`Erreur de suppresion de l'EpiList ${id}.`);
    }
  } catch (error) {
    throw new Error(`Erreur de suppresion de l'EpiList ${id}.`);
  }
};
