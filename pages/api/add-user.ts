import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseType } from '../../interfaces';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email } = req.body;

  if (req.method === 'POST') {
    const new_user = await prisma.user
      .create({
        where: {
          email: email,
        },
      })
      .then(() => {
        res
          .status(200)
          .json({ message: 'User is created', success: true, data: new_user });
      })
      .catch((e: any) => {
        console.log(e);
        res.json({ data: null, message: e, success: false });
      });
  }
}
