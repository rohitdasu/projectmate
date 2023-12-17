import { z } from 'zod';

// Define a regex pattern for URL validation
const socialMediaRegex = {
  github: new RegExp('^https://github.com/[a-zA-Z0-9_-]+/[a-zA-Z0-9_-]+$'),
  linkedin: new RegExp('^https://www.linkedin.com/in/[a-zA-Z0-9_-]+$'),
  twitter: new RegExp('^https://twitter.com/[a-zA-Z0-9_]+$'),
  website: new RegExp(
    '^https?://(www\\.)?[a-zA-Z0-9_-]+(\\.[a-zA-Z]{2,})+(/[a-zA-Z0-9_-]*)*$'
  ),
};
export const userDetailsSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .min(1),
  description: z.string({ required_error: 'Description is required' }).min(3),
  skills: z.array(z.string()).min(1).max(4),
  socialSites: z
    .object({
      github: z
        .string()
        .nullable()
        .refine((value) => !value || socialMediaRegex.github.test(value), {
          message: 'Invalid URL format for the github',
        }),
      linkedin: z
        .string()
        .nullable()
        .refine((value) => !value || socialMediaRegex.linkedin.test(value), {
          message: 'Invalid URL format for the linkedin',
        }),
      twitter: z
        .string()
        .nullable()
        .refine((value) => !value || socialMediaRegex.twitter.test(value), {
          message: 'Invalid URL format for the twitter',
        }),
      website: z
        .string()
        .nullable()
        .refine((value) => !value || socialMediaRegex.website.test(value), {
          message: 'Invalid URL format for the website',
        }),
    })
    .optional(),
});
