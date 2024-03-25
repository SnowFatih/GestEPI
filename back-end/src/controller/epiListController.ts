//********** Imports **********//
import express, { NextFunction, Request, Response } from 'express';
import { EPI, EPIFilter } from '../types/type';
import { manageGetAllEpiLists, managePostOrPutEpiList, manageDeleteEpiList } from '../managers/epiListManagers';




const router = express.Router();


//********** Routes **********//
// get EpiLists
router.get('/', async (req: Request, res: Response<EPIFilter[] | string>, next: NextFunction) => {
  try {
    const filters: any = req.query;
    res.status(200).json(await manageGetAllEpiLists(filters));
  } catch (error) {
    next(error);
  }
});

// création d'un EpiList avec le body a remplir | ou bien la modification upsert (update or insert)
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const EpiListData: EPI = req.body;
    const EpiList = await managePostOrPutEpiList(EpiListData);
    res.status(201).json(EpiList);
  } catch (error) {
    next(error);
  }
});

// delete EpiList avec une id
router.delete('/:id', async (req: Request, res: Response<{ message: string }>, next: NextFunction) => {
  try {
    const id = req.params.id;
    const deleteMessage = await manageDeleteEpiList(id);
    res.status(200).json({ message: deleteMessage });
  } catch (error) {
    next(error);
  }
});
  


export default router;