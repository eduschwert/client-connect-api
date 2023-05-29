import { z } from 'zod';
import {
  contactSchema,
  contactSchemaRequest,
  contactSchemaResponse,
} from '../schemas/contacts.schema';

type TContact = z.infer<typeof contactSchema>;
type TContactRequest = z.infer<typeof contactSchemaRequest>;
type TContactUpdate = Partial<TContactRequest>;
type TContactResponse = z.infer<typeof contactSchemaResponse>;

type TPaginationResult = {
  count: number;
  previousPage: string | null;
  nextPage: string | null;
  data: TContactResponse[];
};

export {
  TContact,
  TContactUpdate,
  TContactRequest,
  TContactResponse,
  TPaginationResult,
};
