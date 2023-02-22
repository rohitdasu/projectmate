import { z } from 'zod';

export const schema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(2, 'Title name should be at least 2 characters long')
    .max(40, 'Title should not be greater than 40 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(2, 'Description should be at least 2 characters long')
    .max(80, 'Description should not be greater than 80 characters'),
  skills: z
    .string()
    .array()
    .nonempty('Skills are required')
    .min(1, 'Skills should have at least one element'),
});
