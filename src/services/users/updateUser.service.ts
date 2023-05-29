import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';

import { TUserResponse, TUserUpdate } from '../../interfaces/users.interfaces';
import { User } from '../../entities/user.entitie';
import { userSchemaResponse } from '../../schemas/users.schema';

const updateUserService = async (
  newData: TUserUpdate,
  oldData: User
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = userRepository.create({
    ...oldData,
    ...newData,
  });

  await userRepository.save(user);

  const updatedUser = userSchemaResponse.parse(user);

  return updatedUser;
};

export default updateUserService;
