import { Router } from 'express';

import {
  contactSchemaRequest,
  contactSchemaUpdate,
} from '../schemas/contacts.schema';
import {
  createContactController,
  deleteContactController,
  retrieveUserContactsController,
  updateContactController,
} from '../controllers/contacts.controller';
import ensureContactExistsMiddleware from '../middlewares/contacts/ensureContactExists.middleware';
import ensureIsOwnerMiddleware from '../middlewares/contacts/ensureIsOwner.middleware';
import ensureAuthMiddleware from '../middlewares/global/ensureAuth.middleware';
import ensureDataIsValidMiddleware from '../middlewares/global/ensureDataIsValid.middleware';
import ensureUserExistsMiddleware from '../middlewares/users/ensureUserExists.middleware';
import ensureUniqueContactMiddleware from '../middlewares/contacts/ensureUniqueContact.middleware';

const contactsRoutes = Router();

contactsRoutes.use(ensureAuthMiddleware, ensureUserExistsMiddleware);

contactsRoutes.post(
  '',
  ensureDataIsValidMiddleware(contactSchemaRequest),
  ensureUniqueContactMiddleware,
  createContactController
);

contactsRoutes.get('', retrieveUserContactsController);

contactsRoutes.patch(
  '/:contactId',
  ensureContactExistsMiddleware,
  ensureIsOwnerMiddleware,
  ensureDataIsValidMiddleware(contactSchemaUpdate),
  ensureUniqueContactMiddleware,
  updateContactController
);

contactsRoutes.delete(
  '/:contactId',
  ensureContactExistsMiddleware,
  ensureIsOwnerMiddleware,
  deleteContactController
);

export default contactsRoutes;
