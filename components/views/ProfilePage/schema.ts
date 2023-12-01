import * as z from 'zod';

export const formSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(180),
  skills: z.string().min(2).max(160),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  website: z.string().optional(),
});
