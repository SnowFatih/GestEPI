//********** Imports **********/
import { Entretien, EntretienFilters } from '../types/type';
import { pool } from './bdd';


//********** Model **********//
export const entretienModel = {
  getAll: async (): Promise<Entretien[]> => {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = 'SELECT * FROM Entretiens;';
      const rows = await connection.query(query);
      return rows; 
    } catch (error) {
      throw new Error('Erreur de BDD');
    } finally {
      if (connection) connection.release();
    }
  },
  
  getWithFilters: async (
    params: EntretienFilters,
  ) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let query = 'select * from Entretiens where ';
      Object.keys(params).forEach((item, index) => {
        if (item === 'idAvion') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'idMecanicien') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'debutDate') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'finDate') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'description') {
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

  addOrUpdate: async (entretien: Entretien) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = `
        INSERT INTO Entretiens (id, idAvion, idMecanicien, debutDate, finDate, description)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        id=VALUES(id), idAvion=VALUES(idAvion), idMecanicien=VALUES(idMecanicien), debutDate=VALUES(debutDate), finDate=VALUES(finDate), description=VALUES(description);
      `;
      const params = [entretien.id, entretien.idAvion, entretien.idMecanicien, entretien.debutDate, entretien.finDate, entretien.description];
      const result = await connection.query(query, params);
      return result;
    } catch (error) {
      throw new Error("Erreur de BDD lors de la mise à jour ou de la création d'un entretien.");
    } finally {
      if (connection) connection.release();
    }
  },

  delete: async (id: string) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const rows = await pool.query(
        `delete from Entretiens where id = "${id}"`,
      );
      return rows;
    } catch (error) {
      return error;
    } finally {
      if (connection) connection.release();
    }
  },  
};