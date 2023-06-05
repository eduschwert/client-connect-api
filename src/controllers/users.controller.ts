import { Request, Response } from 'express';

import {
  TUserRequest,
  TUserResponse,
  TUserUpdate,
} from '../interfaces/users.interfaces';
import createUserService from '../services/users/createUser.service';
import updateUserService from '../services/users/updateUser.service';
import deleteUserService from '../services/users/deleteUser.service';
import { User } from '../entities/user.entitie';
import { userSchemaResponse } from '../schemas/users.schema';
import retrieveUserContactsService from '../services/users/retrieveUserContacts.service';

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

const retrieveUserController = async (req: Request, res: Response) => {
  const user: User = res.locals.user;

  const userParsed: TUserResponse = userSchemaResponse.parse(user);

  return res.json(userParsed);
};

const retrieveUserContactsController = async (req: Request, res: Response) => {
  const user: User = res.locals.user;
  const contacts = await retrieveUserContactsService(user);
  return res.json(contacts);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserUpdate = req.body;
  const user: User = res.locals.user;

  const updatedUser = await updateUserService(userData, user);

  return res.json(updatedUser);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: User = res.locals.user;

  await deleteUserService(user);

  return res.status(204).send();
};

export {
  createUserController,
  updateUserController,
  deleteUserController,
  retrieveUserController,
  retrieveUserContactsController,
};
