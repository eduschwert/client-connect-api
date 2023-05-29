import { z } from 'zod';

const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;

const contactSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(255),
  email: z.string().email().max(254),
  password: z.string().min(4).max(100),
  phone: z.string().refine((value) => phoneRegex.test(value), {
    message:
      'Phone number must be in the format "(XX) XXXX-XXXX" or "(XX) XXXX-XXXXX"',
  }),
});

const contactSchemaRequest = contactSchema.omit({
  id: true,
});

const contactSchemaUpdate = contactSchemaRequest.partial();

const contactSchemaResponse = contactSchema
  .omit({
    password: true,
  })
  .extend({
    createdAt: z.date(),
    updatedAt: z.date(),
  });

export {
  contactSchema,
  contactSchemaRequest,
  contactSchemaUpdate,
  contactSchemaResponse,
};
