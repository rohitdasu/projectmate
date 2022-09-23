import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { errorResponse, successResponse } from '@/lib/httpResponse';
import { getServerAuthSession } from '@/lib/getServerAuthSession';

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
        const data = await getUsers();
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

async function getUsers() {
  try {
    const data: User[] = await prisma.user.findMany();
    return data;
  } catch (error) {
    throw error;
  }
}
