import { z } from 'zod';

export const schema = z.object({
  tags: z
    .string()
    .array()
    .nonempty('tags are required')
    .min(1, 'tags should have at least one element'),
  projectName: z
    .string()
    .min(1, 'project name is required')
    .min(2, 'project name should be at least 2 characters long'),
  repositoryLink: z
    .string()
    .min(1, 'repository link is required')
    .regex(
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
      'repository link is invalid'
    ),
  projectDescription: z
    .string()
    .min(1, 'project description is required')
    .min(160, 'project description should be at least 160 characters long'),
  coverImage: z.string().optional(),
  content: z.string().optional(),
});
