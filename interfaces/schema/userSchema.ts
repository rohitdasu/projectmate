import { z } from 'zod';

export const userSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email(),
  firebaseUID: z.string().min(5),
});
