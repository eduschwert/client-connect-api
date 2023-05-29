import { Router } from 'express';

import {
  contactSchemaRequest,
  contactSchemaUpdate,
} from '../schemas/contacts.schema';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';
import ensureUniqueEmailMiddleware from '../middlewares/ensureUniqueEmail.middleware';
import ensureUserExistsMiddleware from '../middlewares/ensureUserExists.middleware';
import ensureContactExistsMiddleware from '../middlewares/ensureContactExists.middleware';
import ensureIsOwnerMiddleware from '../middlewares/ensureIsOwner.middleware';
import {
  createContactController,
  deleteContactController,
  retrieveUserContactsController,
  updateContactController,
} from '../controllers/contacts.controller';

const contactsRoutes = Router();

contactsRoutes.use(ensureAuthMiddleware, ensureUserExistsMiddleware);

contactsRoutes.post(
  '',
  ensureDataIsValidMiddleware(contactSchemaRequest),
  ensureUniqueEmailMiddleware,
  createContactController
);

contactsRoutes.get('', retrieveUserContactsController);

contactsRoutes.patch(
  '/:contactId',
  ensureContactExistsMiddleware,
  ensureIsOwnerMiddleware,
  ensureDataIsValidMiddleware(contactSchemaUpdate),
  ensureUniqueEmailMiddleware,
  updateContactController
);

contactsRoutes.delete(
  '/:contactId',
  ensureContactExistsMiddleware,
  ensureIsOwnerMiddleware,
  deleteContactController
);

export default contactsRoutes;
