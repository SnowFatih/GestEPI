//********** Imports **********/
import { Mecanicien, MecanicienFilters } from '../types/type';
import { pool } from './bdd';


//********** Model **********//
export const mecanicienModel = {
  getAll: async (): Promise<Mecanicien[]> => {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = 'SELECT * FROM Mecaniciens;';
      const rows = await connection.query(query);
      return rows; 
    } catch (error) {
      throw new Error('Erreur de BDD');
    } finally {
      if (connection) connection.release();
    }
  },
  
  getWithFilters: async (
    params: MecanicienFilters,
  ) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let query = 'select * from Mecaniciens where ';
      Object.keys(params).forEach((item, index) => {
        if (item === 'nom') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'prenom') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'idAvion') {
          query += `${item} = "${params[item]}"`;
        }
        if (index != Object.keys(params).length - 1) {
          query += ' and ';
        }
      });
      const rows = await pool.query(query);
      return rows;
    } catch (error) {
      return error;
    } finally {
      if (connection) connection.release();
    }
  },

  addOrUpdate: async (mecanicien: Mecanicien) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = `
        INSERT INTO Mecaniciens (id, nom, prenom, idAvion)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        id=VALUES(id), nom=VALUES(nom), prenom=VALUES(prenom), idAvion=VALUES(idAvion);
      `;
      const params = [mecanicien.id, mecanicien.nom, mecanicien.prenom, mecanicien.idAvion];
      const result = await connection.query(query, params);
      return result;
    } catch (error) {
      throw new Error("Erreur de BDD lors de la mise à jour ou de l'ajout d'un mecanicien.");
    } finally {
      if (connection) connection.release();
    }
  },

  delete: async (id: string) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const rows = await pool.query(
        `delete from Mecaniciens where id = "${id}"`,
      );
      return rows;
    } catch (error) {
      return error;
    } finally {
      if (connection) connection.release();
    }
  },  
};