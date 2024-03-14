//********** Imports **********//
import express, { NextFunction, Request, Response } from 'express';

import { Entretien } from '../types/type';
import { manageDeleteEntretien, manageGetAllEntretiens, managePostOrPutEntretien } from '../managers/entretienManagers';



const router = express.Router();


//********** Routes **********//
// get entretiens
router.get('/', async (req: Request, res: Response<Entretien[] | string>, next: NextFunction) => {
  try {
    const filters = req.query;
    res.status(200).json(await manageGetAllEntretiens(filters));
  } catch (error) {
    next(error);
  }
});

// ajout d'un entretien avec le body a remplir | ou bien la modification upsert (update or insert)
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const entretienData: Entretien = req.body;
    const entretien = await managePostOrPutEntretien(entretienData);
    res.status(201).json(entretien);
  } catch (error) {
    next(error);
  }
});

// delete entretien avec une id
router.delete('/:id', async (req: Request, res: Response<{ message: string }>, next: NextFunction) => {
  try {
    const id = req.params.id;
    const deleteMessage = await manageDeleteEntretien(id);
    res.status(200).json({ message: deleteMessage });
  } catch (error) {
    next(error);
  }
});
  

export default router;