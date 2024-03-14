//********** Imports **********//
import express, { NextFunction, Request, Response } from 'express';
import { manageDeleteAvion, manageGetAllAvions, managePostOrPutAvion } from '../managers/avionManagers';
import { Avion } from '../types/type';



const router = express.Router();


//********** Routes **********//
// get avions
router.get('/', async (req: Request, res: Response<Avion[] | string>, next: NextFunction) => {
  try {
    const filters = req.query;
    res.status(200).json(await manageGetAllAvions(filters));
  } catch (error) {
    next(error);
  }
});

// création d'un avion avec le body a remplir | ou bien la modification upsert (update or insert)
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const avionData: Avion = req.body;
    const avion = await managePostOrPutAvion(avionData);
    res.status(201).json(avion);
  } catch (error) {
    next(error);
  }
});

// delete avion avec une immatriculation
router.delete('/:immatriculation', async (req: Request, res: Response<{ message: string }>, next: NextFunction) => {
  try {
    const immatriculation = req.params.immatriculation;
    const deleteMessage = await manageDeleteAvion(immatriculation);
    res.status(200).json({ message: deleteMessage });
  } catch (error) {
    next(error);
  }
});
  




export default router;