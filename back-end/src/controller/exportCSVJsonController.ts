//********** Imports **********//
import express, { NextFunction, Request, Response } from 'express';
import { exportCSVManager, exportJsonManager, exportJsonManagerById } from '../managers/exportCSVJsonManager';
import { databaseUtils, pool } from '../models/bdd';





const router = express.Router();


//********** Routes **********//

// router.get('/csv', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const csvData = await exportCSVManager();
//     res.header('Content-Type', 'text/csv');
//     res.attachment('epi.csv');
//     res.send(csvData);
//   } catch (error) {
//     next(error);
//   }
// });

router.get('/csv', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const csvData = await exportCSVManager();
    const exportedLines = csvData.split('\n').length - 1;

    res.header('Content-Type', 'text/csv');
    res.attachment('listeDesEpi.csv');
    res.send(csvData);

    await databaseUtils.logExport({
      exportType: 'json',
      userId: 1,  
      exportedLines: exportedLines
  });
  } catch (error) {
    next(error);
  }
});



// router.get('/json', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const jsonData = await exportJsonManager();
//     res.header('Content-Type', 'application/json');
//     res.send(jsonData);
//   } catch (error) {
//     next(error);
//   }
// });

router.get('/json', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jsonData = await exportJsonManager();
    const exportedLines = JSON.parse(jsonData).length;  

    res.header('Content-Type', 'application/json');
    res.send(jsonData);

    await databaseUtils.logExport({
      exportType: 'json',
      userId: 1,  
      exportedLines: exportedLines
  });

  } catch (error) {
    next(error);
  }
});

router.get('/json/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const query = 'SELECT * FROM epi WHERE id = ?;';
      const [result] = await pool.query(query, [id]);
      console.log("Result:", result);
      res.json(result); 
      await databaseUtils.logExport({
        exportType: 'json',
        userId: 1,  
        exportedLines: 1
    });
  } catch (error) {
      console.error('Error fetching data:', error);
  }
});


export default router;