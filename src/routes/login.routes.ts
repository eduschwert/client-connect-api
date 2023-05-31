import { Router } from 'express';

import { createLoginController } from '../controllers/login.controller';
import { createLoginSchema } from '../schemas/login.schemas';
import ensureDataIsValidMiddleware from '../middlewares/global/ensureDataIsValid.middleware';

const loginRoutes: Router = Router();

loginRoutes.post(
  '',
  ensureDataIsValidMiddleware(createLoginSchema),
  createLoginController
);

export default loginRoutes;
