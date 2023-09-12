import { object, z } from 'zod';

export const createSessionSchema = object({
  body: object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
