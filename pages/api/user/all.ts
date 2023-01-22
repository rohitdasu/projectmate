import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { errorResponse, successResponse } from '@/lib/httpResponse';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
    return data.map((user) => {
      return {
        id: user.id,
        name: user.name,
        profilePicture: user.image,
      };
    });
  } catch (error) {
    throw error;
  }
}
