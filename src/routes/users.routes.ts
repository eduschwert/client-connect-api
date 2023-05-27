import { Router } from 'express';

import { createUserController } from '../controllers/users.controller';

import { userSchemaRequest } from '../schemas/users.schema';

import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';
import ensureUniqueEmailMiddleware from '../middlewares/ensureUniqueEmail.middleware';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';

const usersRoutes = Router();

usersRoutes.post(
  '',
  ensureDataIsValidMiddleware(userSchemaRequest),
  ensureUniqueEmailMiddleware,
  createUserController
);

export default usersRoutes;
