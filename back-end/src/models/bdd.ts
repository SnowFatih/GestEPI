import mariadb from 'mariadb';

//********** Pool **********/
export const pool = mariadb.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'gestions_vols',
  bigNumberStrings: true,
  connectionLimit: 5,
});

