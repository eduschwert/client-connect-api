import 'dotenv/config';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entitie';
import { AppError } from '../../errors/AppError';
import { TLogin } from '../../interfaces/login.interfaces';

const createLoginService = async (loginData: TLogin): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    email: loginData.email,
  });

  if (!user) {
    throw new AppError('Wrong email or password', 401);
  }

  const passwordMatch = await compare(loginData.password, user.password);

  if (!passwordMatch) {
    throw new AppError('Wrong email or password', 401);
  }

  const token: string = jwt.sign(
    {
      userName: user.name,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: '24h',
      subject: String(user.id),
    }
  );

  return token;
};

export default createLoginService;
