import { Router } from 'express';

import {
  createUserController,
  deleteUserController,
  retrieveUserContactsController,
  retrieveUserController,
  updateUserController,
} from '../controllers/users.controller';
import { userSchemaRequest, userSchemaUpdate } from '../schemas/users.schema';
import ensureAuthMiddleware from '../middlewares/global/ensureAuth.middleware';
import ensureUserExistsMiddleware from '../middlewares/users/ensureUserExists.middleware';
import ensureDataIsValidMiddleware from '../middlewares/global/ensureDataIsValid.middleware';
import ensureUniqueEmailUserMiddleware from '../middlewares/users/ensureUniqueEmailUser.middleware';

const usersRoutes = Router();

usersRoutes.post(
  '',
  ensureDataIsValidMiddleware(userSchemaRequest),
  ensureUniqueEmailUserMiddleware,
  createUserController
);

usersRoutes.get(
  '',
  ensureAuthMiddleware,
  ensureUserExistsMiddleware,
  retrieveUserController
);

usersRoutes.get(
  '/contacts',
  ensureAuthMiddleware,
  ensureUserExistsMiddleware,
  retrieveUserContactsController
);

usersRoutes.patch(
  '',
  ensureAuthMiddleware,
  ensureUserExistsMiddleware,
  ensureDataIsValidMiddleware(userSchemaUpdate),
  ensureUniqueEmailUserMiddleware,
  updateUserController
);

usersRoutes.delete(
  '',
  ensureAuthMiddleware,
  ensureUserExistsMiddleware,
  deleteUserController
);

export default usersRoutes;
