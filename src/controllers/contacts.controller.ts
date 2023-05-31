import { Request, Response } from 'express';

import {
  TContactRequest,
  TContactUpdate,
} from '../interfaces/contacts.interfaces';
import createContactService from '../services/contacts/createContact.service';
import updateContactService from '../services/contacts/updateContact.service';
import deleteContactService from '../services/contacts/deleteContact.service';
import retrieveUserContactsService from '../services/contacts/retrieveUserContacts.service';
import { User } from '../entities/user.entitie';
import { Contact } from '../entities/contact.entitie';

const retrieveUserContactsController = async (req: Request, res: Response) => {
  const user: User = res.locals.user;
  let perPage: number = 5;
  let page: number = 1;

  if (typeof req.query.perPage === 'string') {
    const perPageQueryParam: string = req.query.perPage;
    const perPageValue: number = parseInt(perPageQueryParam, 10);
    if (!isNaN(perPageValue) && perPageValue >= 1 && perPageValue <= 10) {
      perPage = perPageValue;
    }
  }

  if (typeof req.query.page === 'string') {
    const pageQueryParam: string = req.query.page;
    const pageValue: number = parseInt(pageQueryParam, 10);
    if (!isNaN(pageValue) && pageValue >= 1) {
      page = pageValue;
    }
  }

  const baseUrl: string = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

  const contacts = await retrieveUserContactsService(
    user,
    perPage,
    page,
    baseUrl
  );

  return res.json(contacts);
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
  retrieveUserContactsController,
  createContactController,
  updateContactController,
  deleteContactController,
};
