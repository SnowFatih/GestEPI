//********** Imports **********//
import express, { NextFunction, Request, Response } from 'express';
import { EpiType, EpiTypeFilter } from '../types/type';
import { manageGetAllEpiTypes, managePostOrPutEpiType, manageDeleteEpiType } from '../managers/epiTypeManagers';



const router = express.Router();


//********** Routes **********//
// get epiTypes
router.get('/', async (req: Request, res: Response<EpiTypeFilter[] | string>, next: NextFunction) => {
  try {
    const filters: any = req.query;
    res.status(200).json(await manageGetAllEpiTypes(filters));
  } catch (error) {
    next(error);
  }
});

// création d'un epiType avec le body a remplir | ou bien la modification upsert (update or insert)
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const epiTypeData: EpiType = req.body;
    const epiType = await managePostOrPutEpiType(epiTypeData);
    res.status(201).json(epiType);
  } catch (error) {
    next(error);
  }
});

// delete epiType avec une id
router.delete('/:id', async (req: Request, res: Response<{ message: string }>, next: NextFunction) => {
  try {
    const id = req.params.id;
    const deleteMessage = await manageDeleteEpiType(id);
    res.status(200).json({ message: deleteMessage });
  } catch (error) {
    next(error);
  }
});
  


export default router;