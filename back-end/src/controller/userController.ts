//********** Imports **********//
import express, { NextFunction, Request, Response } from 'express';
import { User, UserFilter } from '../types/type';
import { manageGetAllUsers, managePostOrPutUser, manageDeleteUser } from '../managers/userManagers';


const router = express.Router();


//********** Routes **********//
// get epiChecks
router.get('/', async (req: Request, res: Response<UserFilter[] | string>, next: NextFunction) => {
  try {
    const filters: any = req.query;
    res.status(200).json(await manageGetAllUsers(filters));
  } catch (error) {
    next(error);
  }
});

// création d'un epiCheck avec le body a remplir | ou bien la modification upsert (update or insert)
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const epiCheckData: User = req.body;
    const epiCheck = await managePostOrPutUser(epiCheckData);
    res.status(201).json(epiCheck);
  } catch (error) {
    next(error);
  }
});

// delete epiCheck avec une id
router.delete('/:id', async (req: Request, res: Response<{ message: string }>, next: NextFunction) => {
  try {
    const id = req.params.id;
    const deleteMessage = await manageDeleteUser(id);
    res.status(200).json({ message: deleteMessage });
  } catch (error) {
    next(error);
  }
});
  


export default router;