import { Request, Response, NextFunction } from 'express';

import { Contact } from '../../entities/contact.entitie';

const ensureIsOwnerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contact: Contact = res.locals.contact;
  const userId: string = res.locals.userId;

  if (contact.user.id !== userId) {
    return res.status(403).json({
      message: 'You don`t have permissions to perform this action',
    });
  }

  return next();
};

export default ensureIsOwnerMiddleware;
