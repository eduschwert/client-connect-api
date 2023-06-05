import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';

import { TPaginationResult } from '../../interfaces/contacts.interfaces';
import { User } from '../../entities/user.entitie';
import { Contact } from '../../entities/contact.entitie';

const retrieveUserContactsService = async (user: User): Promise<Contact[]> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const query = contactRepository
    .createQueryBuilder('contact')
    .leftJoin('contact.user', 'user')
    .where('user.id = :userId', { userId: user.id })
    .orderBy('contact.name', 'ASC');

  const contacts: Contact[] = await query.getMany();

  return contacts;
};

export default retrieveUserContactsService;
