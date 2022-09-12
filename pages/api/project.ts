import { NextApiResponse, NextApiRequest } from 'next';
import { ResponseType } from '../../interfaces';
import { prisma } from '../../lib/prisma';

type ProjectType = {
  author: string;
  title: string;
  description: string;
  githubRepository: string;
  tags: string[];
  userId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  switch (req.method) {
    case 'GET': {
      return getPost(req, res);
    }
    case 'POST': {
      return addPost(req, res);
    }
  }
  if (req.method === 'POST') {
  }
}

async function getPost(req: NextApiRequest, res: NextApiResponse) {
  await prisma.project
    .findMany({ include: { author: {} } })
    .then((data) => {
      res
        .status(200)
        .json({ message: 'Projects data', success: true, data: data });
    })
    .catch((e) => {
      res.status(400).json({ data: null, message: e.message, success: false });
    });
}

async function addPost(req: NextApiRequest, res: NextApiResponse) {
  const { title, description, githubRepository, tags, userId }: ProjectType =
    req.body;
  await prisma.project
    .create({
      data: {
        title,
        description,
        githubRepository,
        tags,
        authorId: userId,
      },
    })
    .then((data) => {
      res.status(200).json({
        message: 'Project is created',
        success: true,
        data: data,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({ data: e, message: e, success: false });
    });
}
