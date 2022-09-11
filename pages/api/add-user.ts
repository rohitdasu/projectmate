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
          email: email,
        },
      })
      .then(() => {
        res
          .status(200)
          .json({ message: 'User is created', success: true, data: null });
      })
      .catch((e: any) => {
        console.log(e);
        res.json({ data: null, message: e, success: false });
      });
  }
}
