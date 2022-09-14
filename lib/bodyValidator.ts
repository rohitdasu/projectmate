import { NextApiRequest } from 'next';
import { z } from 'zod';

export default async function bodyValidator(
  req: NextApiRequest,
  schema: z.ZodType
) {
  try {
    const validatedBody = await schema.parseAsync(req.body);
    return validatedBody;
  } catch (error) {
    throw error;
  }
}
