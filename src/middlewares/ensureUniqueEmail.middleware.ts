import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';

import { AppError } from '../errors/AppError';
import { User } from '../entities/user.entitie';
import { Contact } from '../entities/contact.entitie';

const ensureUniqueEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.body.email) {
    const userId: string = res.locals.userId;
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const findEmail: User | null = await userRepository.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (findEmail && findEmail.id !== userId) {
      throw new AppError('Email already exists', 409);
    }

    const contactRepository: Repository<Contact> =
      AppDataSource.getRepository(Contact);

    const findEmailContact: Contact | null = await contactRepository.findOne({
      where: {
        email: req.body.email,
      },
      relations: {
        user: true,
      },
    });

    if (findEmailContact && findEmailContact.user.id !== userId) {
      throw new AppError('Email already exists', 409);
    }

    return next();
  }
};

export default ensureUniqueEmailMiddleware;
