import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { errorResponse, successResponse } from '@/lib/http.response';
import { prisma } from '@/lib/prisma';
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
      const { userId } = req.query;

      try {
        const data = await getUsersById(userId?.toString());
        if (!data) {
          return successResponse({
            res,
            message: "User doesn't exist",
            results: data,
            statusCode: 200,
            success: false,
          });
        }

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

async function getUsersById(id?: string) {
  try {
    if (!id) {
      return null;
    }

    const data: User | null = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        project: true,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
