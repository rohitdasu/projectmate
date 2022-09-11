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
  if (req.method === 'POST') {
    const {
      author,
      title,
      description,
      githubRepo,
      tags,
      userId,
    }: ProjectType = req.body;
    await prisma.project
      .create({
        data: {
          author,
          title,
          description,
          githubRepository: githubRepo,
          userId,
          tags,
        },
      })
      .then((data) => {
        console.log(data);
        res.status(200).json({
          message: 'User is created',
          success: true,
          data: data,
        });
      })
      .catch((e) => {
        console.log(e);
        res.json({ data: e, message: e, success: false });
      });
  }
}
