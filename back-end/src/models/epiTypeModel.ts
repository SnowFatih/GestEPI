//********** Imports **********/
import { EpiType } from '../types/type';
import { pool } from './bdd';


//********** Model **********//
export const epiTypeModel = {
  getAll: async (): Promise<EpiType[]> => {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = 'SELECT * FROM epiType;';
      const rows = await connection.query(query);
      return rows; 
    } catch (error) {
      throw new Error('Erreur de BDD');
    } finally {
      if (connection) connection.release();
    }
  },

  getById: async (id: string) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const rows = await pool.query(
        `select * from epiType where id = "${id}"`,
      );
      return rows;
    } catch (error) {
      return error;
    } finally {
      if (connection) connection.release();
    }
  },
  
  getWithFilters: async (
    params: EpiType,
  ) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let query = 'select * from epiType where ';
      Object.keys(params).forEach((item, index) => {
        if (item === 'id') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'label') {
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

  addOrUpdate: async (epiType: EpiType) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = `
        INSERT INTO epiType (id, label)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE 
        id=VALUES(id), label=VALUES(label);
      `;
      const params = [epiType.id, epiType.label];
      const result = await connection.query(query, params);
      return result;
    } catch (error) {
      throw new Error("Erreur de BDD lors de la mise à jour ou de l'ajout d'un epiType.");
    } finally {
      if (connection) connection.release();
    }
  },

  delete: async (id: string) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const rows = await pool.query(
        `delete from epiType where id = "${id}"`,
      );
      return rows;
    } catch (error) {
      return error;
    } finally {
      if (connection) connection.release();
    }
  },  
};