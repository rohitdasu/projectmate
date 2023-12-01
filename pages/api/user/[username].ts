import { errorResponse, successResponse } from '@/lib/httpResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { username } = req.query;

    if (!username) {
      return errorResponse({
        res,
        message: 'Bad Request - Missing username parameter',
        statusCode: 400,
        success: false,
      });
    }

    try {
      const data = await getUserDetailsByUsername(username as string);
      return successResponse({
        res,
        message: '',
        results: data,
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      return errorResponse({
        res,
        message: 'Internal Error',
        statusCode: 500,
        success: false,
      });
    }
  } else {
    return errorResponse({
      res,
      message: 'Bad Request',
      statusCode: 400,
      success: false,
    });
  }
}

const UserDetails: Prisma.UserSelect = {
  _count: {
    select: {
      project: true,
    },
  },
  id: true,
  name: true,
  image: true,
  title: true,
  description: true,
  skills: true,
  socialSites: true,
  username: true,
};

async function getUserDetailsByUsername(username: string) {
  try {
    const data = await prisma.user.findFirst({
      where: { username: { equals: username } },
      select: UserDetails,
    });
    if (!data) {
      throw new Error('User not found');
    }
    return data;
  } catch (error) {
    throw error;
  }
}
