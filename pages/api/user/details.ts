import { getServerAuthSession } from '@/lib/getServerAuthSession';
import { errorResponse, successResponse } from '@/lib/httpResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    return errorResponse({
      res,
      message: 'Unauthorized',
      statusCode: 401,
      success: false,
    });
  }

  switch (req.method) {
    case 'GET':
      try {
        const data = await getUserDetails(session);
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
    default:
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
  title: true,
  description: true,
  skills: true,
};

async function getUserDetails(session: Session) {
  try {
    const data = await prisma.user.findFirst({
      where: { email: session.user?.email },
      select: UserDetails,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
