import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';

import { AppError } from '../../errors/AppError';
import { User } from '../../entities/user.entitie';
import { Contact } from '../../entities/contact.entitie';

const ensureUniqueContactMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.body.email || req.body.phone) {
    const user: User = res.locals.user;
    const contact: Contact | null = res.locals.contact;

    if (req.body.email == user.email) {
      throw new AppError(
        'You cannot create a contact with the same email as yours',
        409
      );
    }

    const contactRepository: Repository<Contact> =
      AppDataSource.getRepository(Contact);

    const contactFindEmail: Contact | null = req.body.email
      ? await contactRepository.findOne({
          where: {
            email: req.body.email,
            user: {
              id: user.id,
            },
          },
        })
      : null;

    if (contactFindEmail && contact?.id !== contactFindEmail.id) {
      throw new AppError('You already have a contact with the same email', 409);
    }

    const contactFindPhone: Contact | null = req.body.phone
      ? await contactRepository.findOne({
          where: {
            phone: req.body.phone,
            user: {
              id: user.id,
            },
          },
        })
      : null;

    if (contactFindPhone && contact?.id !== contactFindPhone.id) {
      throw new AppError('You already have a contact with the same phone', 409);
    }
  }
  return next();
};

export default ensureUniqueContactMiddleware;
