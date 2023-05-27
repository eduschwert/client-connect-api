import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entitie';
import { userSchemaResponse } from '../../schemas/users.schema';

const retrieveUserService = async (userId: string) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const user = userSchemaResponse.parse(findUser);

  return user;
};

export default retrieveUserService;
