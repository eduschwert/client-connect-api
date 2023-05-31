import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';

import { AppError } from '../../errors/AppError';
import { User } from '../../entities/user.entitie';

const ensureUniqueEmailUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.body.email) {
    const userId: string = res.locals.userId;
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const findEmailUser: User | null = await userRepository.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (findEmailUser && findEmailUser.id !== userId) {
      throw new AppError('Email already exists', 409);
    }
  }
  return next();
};

export default ensureUniqueEmailUserMiddleware;
