import { string, z } from 'zod';

export const postSchema = z.object({
  email: z.string().email(),
  title: string({
    required_error: 'Title is required',
  }).min(3),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(15),
  content: z.string({
    required_error: 'Content is required',
  }),
  githubRepository: z.string({
    required_error: 'githubRepository is required',
  }),

  coverImg: z.string().url().optional(),
  tags: z.array(z.string()).min(1).max(5),
});
