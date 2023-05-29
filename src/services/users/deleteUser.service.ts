import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entitie';

const deleteUserService = async (user: User): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  await userRepository.remove(user);
};

export default deleteUserService;
