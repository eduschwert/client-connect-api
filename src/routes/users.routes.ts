import { Router } from 'express';

import {
  createUserController,
  deleteUserController,
  retrieveUserController,
  updateUserController,
} from '../controllers/users.controller';

import { userSchemaRequest, userSchemaUpdate } from '../schemas/users.schema';

import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';
import ensureUniqueEmailMiddleware from '../middlewares/ensureUniqueEmail.middleware';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureUserExistsMiddleware from '../middlewares/ensureUserExists.middleware';

const usersRoutes = Router();

usersRoutes.post(
  '',
  ensureDataIsValidMiddleware(userSchemaRequest),
  ensureUniqueEmailMiddleware,
  createUserController
);

usersRoutes.get(
  '',
  ensureAuthMiddleware,
  ensureUserExistsMiddleware,
  retrieveUserController
);

usersRoutes.patch(
  '',
  ensureAuthMiddleware,
  ensureUserExistsMiddleware,
  ensureDataIsValidMiddleware(userSchemaUpdate),
  ensureUniqueEmailMiddleware,
  updateUserController
);
usersRoutes.delete(
  '',
  ensureAuthMiddleware,
  ensureUserExistsMiddleware,
  deleteUserController
);

export default usersRoutes;
