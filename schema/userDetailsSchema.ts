import { z } from 'zod';

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
        .refine(
          (value) =>
            !value ||
            new RegExp('(https://)?(www\\.)?github.com/[a-zA-Z0-9_-]+$').test(
              value
            ),
          {
            message: 'Invalid URL format for the github',
          }
        ),
      linkedin: z
        .string()
        .refine(
          (value) =>
            !value ||
            new RegExp(
              '(https://)?(www\\.)?linkedin.com/in/[a-zA-Z0-9-]+/?$'
            ).test(value),
          {
            message: 'Invalid URL format for the linkedin',
          }
        ),
      twitter: z
        .string()
        .refine(
          (value) =>
            !value ||
            new RegExp('^(https://)?(www\\.)?twitter.com/[a-zA-Z0-9_]+$').test(
              value
            ),
          {
            message: 'Invalid URL format for the twitter',
          }
        ),
      website: z
        .string()
        .refine(
          (value) =>
            !value ||
            new RegExp(
              '^(https://)?(www\\.)?[a-zA-Z0-9_-]+(\\.[a-zA-Z]{2,})+(/[a-zA-Z0-9_-]*)*$'
            ).test(value),
          {
            message: 'Invalid URL format for the website',
          }
        ),
    })
    .optional(),
});
