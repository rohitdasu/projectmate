import * as z from 'zod';

const socialMediaRegex = {
  github: new RegExp('^https://github.com/[a-zA-Z0-9_-]+/[a-zA-Z0-9_-]+$'),
  linkedin: new RegExp('^https://www.linkedin.com/in/[a-zA-Z0-9_-]+$'),
  twitter: new RegExp('^https://twitter.com/[a-zA-Z0-9_]+$'),
  website: new RegExp(
    '^https?://(www\\.)?[a-zA-Z0-9_-]+(\\.[a-zA-Z]{2,})+(/[a-zA-Z0-9_-]*)*$'
  ),
};

export const formSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(180),
  skills: z.string().min(2).max(160),
  github: z
    .string()
    .optional()
    .refine((value) => !value || socialMediaRegex.github.test(value), {
      message: 'Invalid GitHub URL',
    }),
  linkedin: z
    .string()
    .optional()
    .refine((value) => !value || socialMediaRegex.linkedin.test(value), {
      message: 'Invalid LinkedIn profile URL',
    }),
  twitter: z
    .string()
    .optional()
    .refine((value) => !value || socialMediaRegex.twitter.test(value), {
      message: 'Invalid Twitter profile URL',
    }),
  website: z
    .string()
    .optional()
    .refine((value) => !value || socialMediaRegex.website.test(value), {
      message: 'Invalid website URL',
    }),
});
