//********** Imports **********/
import { EpiCheck } from '../types/type';
import { pool } from './bdd';


//********** Model **********//
export const epiCheckModel = {
  getAll: async (): Promise<EpiCheck[]> => {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = 'SELECT * FROM epiCheck;';
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
        `select * from epiCheck where id = "${id}"`,
      );
      return rows;
    } catch (error) {
      return error;
    } finally {
      if (connection) connection.release();
    }
  },
  
  getWithFilters: async (
    params: EpiCheck,
  ) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let query = 'select * from epiCheck where ';
      Object.keys(params).forEach((item, index) => {
        if (item === 'id') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'epiId') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'checkDate') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'checkStatus') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'userId') {
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

  addOrUpdate: async (epiCheck: EpiCheck) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = `
        INSERT INTO epiCheck (id, epiId, checkDate, checkStatus, userId)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        id=VALUES(id), epiId=VALUES(epiId), checkDate=VALUES(checkDate), checkStatus=VALUES(checkStatus), userId=VALUES(userId);
      `;
      const params = [epiCheck.id, epiCheck.epiId, epiCheck.checkDate, epiCheck.checkStatus, epiCheck.userId];
      const result = await connection.query(query, params);
      return result;
    } catch (error) {
      throw new Error("Erreur de BDD lors de la mise à jour ou de l'ajout d'un epiCheck.");
    } finally {
      if (connection) connection.release();
    }
  },

  delete: async (id: string) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const rows = await pool.query(
        `delete from epiCheck where id = "${id}"`,
      );
      return rows;
    } catch (error) {
      return error;
    } finally {
      if (connection) connection.release();
    }
  },  
};