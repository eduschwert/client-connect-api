import { Request, Response } from 'express';

import {
  TContactRequest,
  TContactUpdate,
} from '../interfaces/contacts.interfaces';
import createContactService from '../services/contacts/createContact.service';
import updateContactService from '../services/contacts/updateContact.service';
import deleteContactService from '../services/contacts/deleteContact.service';
import retrieveUserContactsService from '../services/users/retrieveUserContacts.service';
import { User } from '../entities/user.entitie';
import { Contact } from '../entities/contact.entitie';
import { contactSchemaResponse } from '../schemas/contacts.schema';

const retrieveContactController = async (req: Request, res: Response) => {
  const contact: Contact = res.locals.contact;

  const contactParsed = contactSchemaResponse.parse(contact);

  return res.json(contactParsed);
};

const createContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contactData: TContactRequest = req.body;
  const user: User = res.locals.user;

  const newContact = await createContactService(contactData, user);

  return res.status(201).json(newContact);
};

const updateContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contactData: TContactUpdate = req.body;
  const contact: Contact = res.locals.contact;

  const updatedContact = await updateContactService(contactData, contact);

  return res.json(updatedContact);
};

const deleteContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contact: Contact = res.locals.contact;

  await deleteContactService(contact);

  return res.status(204).send();
};

export {
  retrieveContactController,
  createContactController,
  updateContactController,
  deleteContactController,
};
