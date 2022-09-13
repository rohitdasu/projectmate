import { string, z } from 'zod';

export const postSchema = z.object({
  authorId: z.string().min(5),
  title: string({
    required_error: 'Title is required',
  }).min(3),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(15),
  githubRepository: z
    .string({
      required_error: 'githubRepository is required',
    })
    .url(),

  tags: z.array(z.string()).min(1).max(5),
});
