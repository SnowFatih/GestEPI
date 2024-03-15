//********** Imports **********//
import express, { NextFunction, Request, Response } from 'express';
import { EpiCheck, EpiCheckFilter } from '../types/type';
import { manageGetAllEpiChecks, managePostOrPutEpiCheck, manageDeleteEpiCheck } from '../managers/epiCheckManagers';



const router = express.Router();


//********** Routes **********//
// get epiChecks
router.get('/', async (req: Request, res: Response<EpiCheckFilter[] | string>, next: NextFunction) => {
  try {
    const filters: any = req.query;
    res.status(200).json(await manageGetAllEpiChecks(filters));
  } catch (error) {
    next(error);
  }
});

// création d'un epiCheck avec le body a remplir | ou bien la modification upsert (update or insert)
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const epiCheckData: EpiCheck = req.body;
    const epiCheck = await managePostOrPutEpiCheck(epiCheckData);
    res.status(201).json(epiCheck);
  } catch (error) {
    next(error);
  }
});

// delete epiCheck avec une id
router.delete('/:id', async (req: Request, res: Response<{ message: string }>, next: NextFunction) => {
  try {
    const id = req.params.id;
    const deleteMessage = await manageDeleteEpiCheck(id);
    res.status(200).json({ message: deleteMessage });
  } catch (error) {
    next(error);
  }
});
  


export default router;