//********** Imports **********/
import { EPI } from '../types/type';
import { pool } from './bdd';
import { createObjectCsvStringifier } from 'csv-writer';

//********** Model **********//
export const exportCSVJsonModel = {
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
  

  exportJSON: async (): Promise<string> => {
    try {
      const data = await (this as any).getAll();
      return JSON.stringify(data);
    } catch (error) {
      throw new Error('Erreur lors de l\'exportation JSON');
    }
  },  


  exportCSV: async (): Promise<string> => {
    try {
      const data = await (this as any).getAll();
      const csvStringifier = createObjectCsvStringifier({
        header: [
          {id: 'id', title: 'ID'},
          {id: 'brand', title: 'Brand'},
          {id: 'model', title: 'Model'},
          {id: 'serialNumber', title: 'Serial Number'},
          {id: 'innerId', title: 'Internal ID'},
          {id: 'epiType', title: 'EPI Type'},
          {id: 'size', title: 'Size'},
          {id: 'color', title: 'Color'},
          {id: 'purchaseDate', title: 'Purchase Date'},
          {id: 'manufactureDate', title: 'Manufacture Date'},
          {id: 'inServiceDate', title: 'In Service Date'},
          {id: 'checkFrequency', title: 'Check Frequency'},
          {id: 'checkFrequencyUnit', title: 'Check Frequency Unit'}
        ]
      });

      const header = csvStringifier.getHeaderString();
      const records = csvStringifier.stringifyRecords(data);
      return header + records;
    } catch (error) {
      throw new Error('Erreur lors de l\'exportation CSV');
    } 
  }
};
