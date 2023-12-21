import * as z from 'zod';

export const formSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(180),
  skills: z.string().min(2).max(160),
  github: z
    .string()
    .refine(
      (value) =>
        !value ||
        new RegExp('^(https://)?(www\\.)?github.com/[a-zA-Z0-9_-]+$').test(
          value
        ),
      {
        message: 'Invalid GitHub URL',
      }
    ),
  linkedin: z
    .string()
    .refine(
      (value) =>
        !value ||
        new RegExp(
          '^(https://)?(www\\.)?linkedin.com/in/[a-zA-Z0-9-]+/?$'
        ).test(value),
      {
        message: 'Invalid LinkedIn profile URL',
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
        message: 'Invalid Twitter profile URL',
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
        message: 'Invalid website URL',
      }
    ),
});
