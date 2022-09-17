import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { errorResponse, successResponse } from '@/lib/http.response';
import { prisma } from '@/lib/prisma';
import apiAuth from '@/lib/apiAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const isAuth = await apiAuth(req);
  if (!isAuth) {
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
        const data = await getUsersByFirebaseUID(userId?.toString());
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

async function getUsersByFirebaseUID(firebaseUID?: string) {
  try {
    if (!firebaseUID) {
      return null;
    }

    const data: User | null = await prisma.user.findFirst({
      where: {
        firebaseUID,
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
