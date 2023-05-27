import { z } from 'zod';
import {
  userSchema,
  userSchemaRequest,
  userSchemaResponse,
} from '../schemas/users.schema';

type TUser = z.infer<typeof userSchema>;
type TUserRequest = z.infer<typeof userSchemaRequest>;
type TUserUpdate = Partial<TUserRequest>;
type TUserResponse = z.infer<typeof userSchemaResponse>;

export { TUser, TUserUpdate, TUserRequest, TUserResponse };
