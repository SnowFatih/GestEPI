//********** Imports **********/
import { User } from '../types/type';
import { pool } from './bdd';


//********** Model **********//
export const userModel = {
  getAll: async (): Promise<User[]> => {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = 'SELECT * FROM epiUser;';
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
        `select * from epiUser where id = "${id}"`,
      );
      return rows;
    } catch (error) {
      return error;
    } finally {
      if (connection) connection.release();
    }
  },
  
  getWithFilters: async (
    params: User,
  ) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let query = 'select * from epiUser where ';
      Object.keys(params).forEach((item, index) => {
        if (item === 'id') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'firstName') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'lastName') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'phone') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'mail') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'userPassword') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'userType') {
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

  addOrUpdate: async (epiUser: User) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = `
        INSERT INTO epiUser (id, firstName, lastName, phone, mail, userPassword, userType)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        id=VALUES(id), firstName=VALUES(firstName), lastName=VALUES(lastName), phone=VALUES(phone), mail=VALUES(mail), userPassword=VALUES(userPassword), userType=VALUES(userType);
      `;
      const params = [epiUser.id, epiUser.firstName, epiUser.lastName, epiUser.phone, epiUser.mail, epiUser.userPassword, epiUser.userType];
      const result = await connection.query(query, params);
      return result;
    } catch (error) {
      throw new Error("Erreur de BDD lors de la mise à jour ou de l'ajout d'un user.");
    } finally {
      if (connection) connection.release();
    }
  },

  delete: async (id: string) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const rows = await pool.query(
        `delete from epiUser where id = "${id}"`,
      );
      return rows;
    } catch (error) {
      return error;
    } finally {
      if (connection) connection.release();
    }
  },  
};