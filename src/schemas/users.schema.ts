import { z } from 'zod';

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;

const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(255),
  email: z.string().email().max(254),
  password: z.string().refine((value) => passwordRegex.test(value), {
    message:
      'Password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, one digit, and one special character.',
  }),
  phone: z.string().refine((value) => phoneRegex.test(value), {
    message:
      'Phone number must be in the format "(XX) XXXX-XXXX" or "(XX) XXXX-XXXXX"',
  }),
});

const userSchemaRequest = userSchema.omit({
  id: true,
});

const userSchemaUpdate = userSchemaRequest.partial();

const userSchemaResponse = userSchema
  .omit({
    password: true,
  })
  .extend({
    createdAt: z.date(),
    updatedAt: z.date(),
  });

export { userSchema, userSchemaRequest, userSchemaUpdate, userSchemaResponse };
