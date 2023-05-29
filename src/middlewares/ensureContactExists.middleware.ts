import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';

import { AppError } from '../errors/AppError';
import { Contact } from '../entities/contact.entitie';

const ensureContactExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contactId: string = req.params.contactId;

  const findContact: Contact | null = await contactRepository.findOne({
    where: {
      id: contactId,
    },
    relations: {
      user: true,
    },
  });

  if (!findContact) {
    throw new AppError('Contact not found', 404);
  }

  res.locals.contact = findContact;

  return next();
};

export default ensureContactExistsMiddleware;
