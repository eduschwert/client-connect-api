import { z } from 'zod';

const createLoginSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(4).max(100),
});

export { createLoginSchema };
