//********** Imports **********/
import { EPI } from '../types/type';
import { pool } from './bdd';


//********** Model **********//
export const EpiListModel = {
  getAll: async (): Promise<EPI[]> => {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = 'SELECT * FROM epi;';
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
        `select * from epi where id = "${id}"`,
      );
      return rows;
    } catch (error) {
      return error;
    } finally {
      if (connection) connection.release();
    }
  },
  
  getWithFilters: async (
    params: EPI,
  ) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let query = 'select * from epi where ';
      Object.keys(params).forEach((item, index) => {
        if (item === 'id') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'brand') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'model') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'serialNumber') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'innerId') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'epiType') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'size') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'color') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'purchaseDate') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'manufactureDate') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'inServiceDate') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'checkFrequency') {
          query += `${item} = "${params[item]}"`;
        }
        if (item === 'checkFrequencyUnit') {
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

  addOrUpdate: async (EpiList: EPI) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const query = `
        INSERT INTO epi (id, brand, model, serialNumber, innerId, epiType, size, color, purchaseDate, manufactureDate, inServiceDate, checkFrequency, checkFrequencyUnit)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        id=VALUES(id), brand=VALUES(brand), model=VALUES(model), serialNumber=VALUES(serialNumber), innerId=VALUES(innerId), epiType=VALUES(epiType), size=VALUES(size), color=VALUES(color), purchaseDate=VALUES(purchaseDate), manufactureDate=VALUES(manufactureDate), inServiceDate=VALUES(inServiceDate), checkFrequency=VALUES(checkFrequency), checkFrequencyUnit=VALUES(checkFrequencyUnit);
      `;
      const params = [EpiList.id, EpiList.brand, EpiList.model, EpiList.serialNumber, EpiList.innerId, EpiList.epiType, EpiList.size, EpiList.color, EpiList.purchaseDate, EpiList.manufactureDate, EpiList.inServiceDate, EpiList.checkFrequency, EpiList.checkFrequencyUnit];
      const result = await connection.query(query, params);
      return result;
    } catch (error) {
      throw new Error("Erreur de BDD lors de la mise à jour ou de l'ajout d'un EpiList.");
    } finally {
      if (connection) connection.release();
    }
  },

  delete: async (id: string) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const rows = await pool.query(
        `delete from epi where id = "${id}"`,
      );
      return rows;
    } catch (error) {
      return error;
    } finally {
      if (connection) connection.release();
    }
  },  
};