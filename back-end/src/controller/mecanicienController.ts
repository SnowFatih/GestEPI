//********** Imports **********//
import express, { NextFunction, Request, Response } from 'express';

import { Mecanicien } from '../types/type';
import { manageDeleteMecanicien, manageGetAllMecaniciens, managePostOrPutMecanicien } from '../managers/mecanicienManagers';



const router = express.Router();


//********** Routes **********//
// get mecaniciens
router.get('/', async (req: Request, res: Response<Mecanicien[] | string>, next: NextFunction) => {
  try {
    const filters = req.query;
    res.status(200).json(await manageGetAllMecaniciens(filters));
  } catch (error) {
    next(error);
  }
});

// ajout d'un mécanicien avec le body a remplir | ou bien la modification upsert (update or insert)
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mecanicienData: Mecanicien = req.body;
    const mecanicien = await managePostOrPutMecanicien(mecanicienData);
    res.status(201).json(mecanicien);
  } catch (error) {
    next(error);
  }
});

// delete mecacnicien avec une id
router.delete('/:id', async (req: Request, res: Response<{ message: string }>, next: NextFunction) => {
  try {
    const id = req.params.id;
    const deleteMessage = await manageDeleteMecanicien(id);
    res.status(200).json({ message: deleteMessage });
  } catch (error) {
    next(error);
  }
});
  

export default router;