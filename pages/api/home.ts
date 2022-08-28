import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';

type Data = {
  data: any;
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET': {
      return getHome(req, res);
    }
  }
}

async function getHome(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    let { db } = await connectToDatabase();

    let home = await db
      .collection('homes')
      .find({})
      .sort({ published: -1 })
      .toArray();

    return res.json({
      data: JSON.parse(JSON.stringify(home[0])),
      success: true,
    });
  } catch (err: any) {
    return res.json({
      data: err?.message,
      success: false,
    });
  }
}
