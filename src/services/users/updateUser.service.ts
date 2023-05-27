import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { TUserResponse, TUserUpdate } from '../../interfaces/users.interfaces';
import { User } from '../../entities/user.entitie';
import { userSchemaResponse } from '../../schemas/users.schema';

const updateUserService = async (
  newUserData: TUserUpdate,
  userId: string
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const user = userRepository.create({
    ...oldUserData,
    ...newUserData,
  });

  await userRepository.save(user);

  const updatedUser = userSchemaResponse.parse(user);

  return updatedUser;
};

export default updateUserService;
