import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entitie';
import { Repository } from 'typeorm';
import { TUserRequest, TUserResponse } from '../../interfaces/users.interfaces';
import { userSchemaResponse } from '../../schemas/users.schema';
import { AppError } from '../../errors/AppError';

const createUserService = async (
  data: TUserRequest
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepository.create(data);

  await userRepository.save(user);

  return userSchemaResponse.parse(user);
};

export default createUserService;
