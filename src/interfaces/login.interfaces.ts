import { z } from 'zod';
import { createLoginSchema } from '../schemas/login.schemas';

type TLogin = z.infer<typeof createLoginSchema>;

export { TLogin };
