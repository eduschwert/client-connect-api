import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';

import { Contact } from '../../entities/contact.entitie';

const deleteContactService = async (contact: Contact): Promise<void> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  await contactRepository.remove(contact);
};

export default deleteContactService;
