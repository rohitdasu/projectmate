import { z } from 'zod';

export const userDetailsSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .min(1),
  description: z.string({ required_error: 'Description is required' }).min(3),
  skills: z.array(z.string()).min(1).max(4),
});
