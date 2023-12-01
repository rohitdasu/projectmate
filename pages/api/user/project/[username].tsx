import { errorResponse, successResponse } from '@/lib/httpResponse';
import { Project } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      try {
        const { username } = req.query;

        // Check if the username parameter is provided
        if (!username) {
          return errorResponse({
            res,
            message: 'Bad Request - Missing username parameter',
            statusCode: 400,
            success: false,
          });
        }

        const data = await getProjectsByUsername(username as string);
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

async function getProjectsByUsername(username: string) {
  try {
    const data: Project[] = await prisma.project.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      where: { author: { username: { equals: username } } },
    });
    if (!data) {
      throw new Error('User not found');
    }
    return data;
  } catch (error) {
    throw error;
  }
}
