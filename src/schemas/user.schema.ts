import { object, string, TypeOf, z } from 'zod';

export const createUserSchema = object({
  body: object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not a valid email'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password too short - should be 6 chars minimum'),
    passwordConfirm: string({
      required_error: 'Password is required',
    }),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>['body'],
  'passwordConfirm'
>;
