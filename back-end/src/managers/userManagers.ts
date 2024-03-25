//********** Imports **********//
import { userModel } from '../models/userModel'; 
import { User, UserFilter } from '../types/type';


//********** Managers **********//
export const manageGetAllUsers = async (filters?: UserFilter): Promise<User[]> => {
  if (filters && Object.keys(filters).length) {
    return userModel.getWithFilters(filters);
  }
  return userModel.getAll();
};


export const managePostOrPutUser = async (epiCheckData: User): Promise<User> => {
  try {
    const result = await userModel.addOrUpdate(epiCheckData);
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



export const manageDeleteUser = async (id: any): Promise<string> => {
  try {
    const result = await userModel.delete(id);
    if (result.affectedRows === 1) {
      return `User avec l'id ${id} a bien été supprimé.`;
    } else {
      throw new Error(`Erreur de suppresion de l'epiCheck ${id}.`);
    }
  } catch (error) {
    throw new Error(`Erreur de suppresion de l'epiCheck ${id}.`);
  }
};
