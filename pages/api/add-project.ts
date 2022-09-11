import { NextApiResponse, NextApiRequest } from 'next';
import { ResponseType } from '../../interfaces';
import { prisma } from '../../lib/prisma';

type ProjectType = {
  author: string;
  title: string;
  description: string;
  githubRepo: string;
  tags: string[];
  userId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { author, title, description, githubRepo, tags, userId }: ProjectType =
    req.body;
  if (req.method === 'POST') {
    await prisma.project
      .create({
        data: {
          author: author,
          title: title,
          description: description,
          githubRepository: githubRepo,
          userId: userId,
          tags: tags,
        },
      })
      .then(() => {
        res
          .status(200)
          .json({ message: 'User is created', success: true, data: null });
      })
      .catch((e) => {
        console.log(e);
        res.json({ data: null, message: e, success: false });
      });
  }
}
