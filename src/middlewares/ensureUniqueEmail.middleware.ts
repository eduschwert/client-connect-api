import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entitie';
import { AppError } from '../errors/AppError';

const ensureUniqueEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.body.email) {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const findEmail: User | null = await userRepository.findOneBy({
      email: req.body.email,
    });

    if (findEmail) {
      throw new AppError('Email already exists', 409);
    }
  }

  return next();
};

export default ensureUniqueEmailMiddleware;
