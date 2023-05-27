import { z } from 'zod';

const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(255),
  email: z.string().email().max(254),
  password: z.string().min(4).max(100),
  phone: z.string().refine((value) => phoneRegex.test(value), {
    message:
      'Phone number must be in the format "(XX) XXXX-XXXX" or "(XX) XXXX-XXXXX"',
  }),
});

const userSchemaRequest = userSchema.omit({
  id: true,
});

const userSchemaResponse = userSchema
  .omit({
    password: true,
  })
  .extend({
    createdAt: z.date(),
    updatedAt: z.date(),
  });

export { userSchema, userSchemaRequest, userSchemaResponse };
