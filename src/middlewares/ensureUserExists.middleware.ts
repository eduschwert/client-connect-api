import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';

import { User } from '../entities/user.entitie';
import { AppError } from '../errors/AppError';

const ensureUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const userId = res.locals.userId;

  const findUser: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError('User not found or invalid credentials', 401);
  }

  res.locals.user = findUser;

  return next();
};

export default ensureUserExistsMiddleware;
