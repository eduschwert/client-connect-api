import { Request, Response } from 'express';
import { TUserRequest, TUserUpdate } from '../interfaces/users.interfaces';

import createUserService from '../services/users/createUser.service';
import updateUserService from '../services/users/updateUser.service';
import deleteUserService from '../services/users/deleteUser.service';
import retrieveUserService from '../services/users/retrieveUser.service';

const retrieveUserController = async (req: Request, res: Response) => {
  const userId: string = res.locals.userId;

  const user = await retrieveUserService(userId);

  return res.json(user);
};

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;
  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserUpdate = req.body;
  const userId: string = res.locals.userId;

  const updatedUser = await updateUserService(userData, userId);

  return res.json(updatedUser);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: string = res.locals.userId;

  await deleteUserService(userId);

  return res.status(204).send();
};

export {
  createUserController,
  updateUserController,
  deleteUserController,
  retrieveUserController,
};
