import mariadb from 'mariadb';

//********** Pool **********/
export const pool = mariadb.createPool({
  host: 'mysql-fatih.alwaysdata.net',
  // port: 3306, je laisse en pour le local
  user: 'fatih',
  password: 'fatihSnow2526',
  database: 'fatih_gestepi',
  bigNumberStrings: true,
  connectionLimit: 5,
});

