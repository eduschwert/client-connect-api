import { Request, Response } from 'express';
import { TUserRequest } from '../interfaces/users.interfaces';
import createUserService from '../services/users/createUser.service';

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;
  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

export { createUserController };
