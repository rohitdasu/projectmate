import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseType } from '../../interfaces';
import { prisma } from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  switch (req.method) {
    case 'GET': {
      return getUsers(req, res);
    }
    case 'POST': {
      return addUser(req, res);
    }
  }
}

async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  await prisma.user
    .findMany()
    .then((data) => {
      res
        .status(200)
        .json({ message: 'Users data', success: true, data: data });
    })
    .catch((e) => {
      res.status(400).json({ data: null, message: e.message, success: false });
    });
}

async function addUser(req: NextApiRequest, res: NextApiResponse) {
  const { email, firebaseUID } = req.body;
  await prisma.user
    .create({
      data: {
        firebaseUID,
        email,
      },
    })
    .then((data) => {
      res
        .status(200)
        .json({ message: 'User is created', success: true, data: data });
    })
    .catch((e) => {
      res.status(400).json({ data: null, message: e.message, success: false });
    });
}
