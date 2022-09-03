import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import { ResponseType } from '../../interfaces';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET': {
      return getProjects(req, res);
    }
  }
}

async function getProjects(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  try {
    let { db } = await connectToDatabase();

    let projects = await db
      .collection('projects')
      .find({})
      .sort({ published: -1 })
      .toArray();

    return res.json({
      data: JSON.parse(JSON.stringify(projects)),
      success: true,
    });
  } catch (err: any) {
    return res.json({
      message: err?.message,
      data: null,
      success: false,
    });
  }
}
