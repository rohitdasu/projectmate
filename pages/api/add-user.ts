import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseType } from '../../interfaces';
import { prisma } from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email } = req.body;

  if (req.method === 'POST') {
    await prisma.user
      .create({
        data: {
          email,
        },
      })
      .then((data) => {
        res
          .status(200)
          .json({ message: 'User is created', success: true, data: data });
      })
      .catch((e) => {
        console.log(e);
        res
          .status(400)
          .json({ data: null, message: e.message, success: false });
      });
  }
}
