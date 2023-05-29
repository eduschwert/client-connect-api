import { AppDataSource } from '../../data-source';
import { Repository } from 'typeorm';

import { Contact } from '../../entities/contact.entitie';
import {
  TContactRequest,
  TContactResponse,
} from '../../interfaces/contacts.interfaces';
import { contactSchemaResponse } from '../../schemas/contacts.schema';
import { User } from '../../entities/user.entitie';

const createContactService = async (
  data: TContactRequest,
  user: User
): Promise<TContactResponse> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contact: Contact = contactRepository.create({
    user: user,
    ...data,
  });

  await contactRepository.save(contact);

  return contactSchemaResponse.parse(contact);
};

export default createContactService;
