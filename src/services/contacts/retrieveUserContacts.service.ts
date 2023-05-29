import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';

import { TPaginationResult } from '../../interfaces/contacts.interfaces';
import { User } from '../../entities/user.entitie';
import { Contact } from '../../entities/contact.entitie';

const retrieveUserContactsService = async (
  user: User,
  perPage: number,
  page: number,
  baseUrl: string
): Promise<TPaginationResult> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const totalCount: number = await contactRepository.count({
    where: {
      user: { id: user.id },
    },
  });

  const totalPages: number = Math.ceil(totalCount / perPage);
  const startIndex: number = (page - 1) * perPage;

  const query = contactRepository
    .createQueryBuilder('contact')
    .leftJoin('contact.user', 'user')
    .where('user.id = :userId', { userId: user.id })
    .orderBy('contact.name', 'ASC')
    .skip(startIndex)
    .take(perPage);

  const paginatedContacts: Contact[] = await query.getMany();

  const result: TPaginationResult = {
    count: totalCount,
    previousPage:
      page > 1 ? `${baseUrl}?perPage=${perPage}&page=${page - 1}` : null,
    nextPage:
      page < totalPages
        ? `${baseUrl}?perPage=${perPage}&page=${page + 1}`
        : null,
    data: paginatedContacts,
  };

  return result;
};

export default retrieveUserContactsService;
