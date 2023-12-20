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
  githubRepository: z
    .string({
      required_error: 'githubRepository is required',
    })
    .regex(
      new RegExp(
        '^(https://)?(www\\.)?github.com/[a-zA-Z0-9_-]+/[a-zA-Z0-9_-]+$'
      ),
      {
        message: 'Invalid URL (We support only GitHub repositories now)',
      }
    ),
  liveUrl: z
    .string()
    .refine(
      (value) =>
        !value ||
        new RegExp(
          '^(https://)?(www\\.)?[a-zA-Z0-9_-]+(\\.[a-zA-Z]{2,})+(/[a-zA-Z0-9_-]*)*$'
        ).test(value),
      {
        message: 'Invalid URL (We support only live websites now)',
      }
    ),
  coverImg: z.string().url().optional(),
  tags: z.array(z.string()).min(1).max(5),
});
