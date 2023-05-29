import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';

import {
  TContactResponse,
  TContactUpdate,
} from '../../interfaces/contacts.interfaces';
import { contactSchemaResponse } from '../../schemas/contacts.schema';
import { Contact } from '../../entities/contact.entitie';

const updateContactService = async (
  newData: TContactUpdate,
  oldData: Contact
): Promise<TContactResponse> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contact = contactRepository.create({
    ...oldData,
    ...newData,
  });

  await contactRepository.save(contact);

  const updatedContact = contactSchemaResponse.parse(contact);

  return updatedContact;
};

export default updateContactService;
