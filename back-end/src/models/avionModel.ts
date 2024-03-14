//********** Imports **********/
import { Avion, AvionFilters } from '../types/type';
import { pool } from './bdd';


//********** Model **********//
export const avionModel = {
  getAll: async (): Promise<Avion[]> => {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = 'SELECT * FROM Avions;';
      const rows = await connection.query(query);
      return rows; 
    } catch (error) {
      throw new Error('Erreur de BDD');
    } finally {
      if (connection) connection.release();
    }
  },

  getByImmatriculation: async (immatriculation: string) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const rows = await pool.query(
        `select * from Avions where immatriculation = "${immatriculation}"`,
      );
      return rows;
    } catch (error) {
      return error;
    } finally {
      if (connection) connection.release();
    }
  },
  
  getWithFilters: async (
    params: AvionFilters,
  ) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let query = 'select * from Avions where ';
      Object.keys(params).forEach((item, index) => {
        if (item === 'immatriculation') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'marque') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'modele') {
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

  addOrUpdate: async (avion: Avion) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = `
        INSERT INTO Avions (id, immatriculation, marque, modele, statut, heuresDeVol, logoUrl)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        id=VALUES(id), marque=VALUES(marque), modele=VALUES(modele), statut=VALUES(statut), heuresDeVol=VALUES(heuresDeVol), logoUrl=VALUES(logoUrl);
      `;
      const params = [avion.id, avion.immatriculation, avion.marque, avion.modele, avion.statut, avion.heuresDeVol, avion.logoUrl];
      const result = await connection.query(query, params);
      return result;
    } catch (error) {
      throw new Error("Erreur de BDD lors de la mise à jour ou de l'ajout d'un avion.");
    } finally {
      if (connection) connection.release();
    }
  },

  delete: async (immatriculation: string) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const rows = await pool.query(
        `delete from Avions where immatriculation = "${immatriculation}"`,
      );
      return rows;
    } catch (error) {
      return error;
    } finally {
      if (connection) connection.release();
    }
  },  
};