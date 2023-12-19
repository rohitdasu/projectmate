import * as z from 'zod';

export const formSchema = z.object({
  projectname: z.string().min(1).max(100),
  repositoryURL: z
    .string()
    .regex(new RegExp('^https://github.com/[a-zA-Z0-9_-]+/[a-zA-Z0-9_-]+$'), {
      message: 'Invalid URL (We support only GitHub repositories now)',
    }),
  tags: z.string().min(1).max(160),
  description: z.string().min(160).max(500),
  liveUrl: z
    .string()
    .optional()
    .refine((value) => !value || /^https:\/\/(www\.)?.*$/.test(value), {
      message: 'Invalid URL (We support only live websites now)',
    }),
});
