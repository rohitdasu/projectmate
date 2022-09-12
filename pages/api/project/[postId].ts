import { Project } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { errorResponse, successResponse } from '../../../lib/http.response';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { postId } = req.query;

    try {
      const data = await getPostById(postId?.toString());
      if (!data) {
        return successResponse({
          res,
          message: "Project doesn't exist",
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
  }
  return errorResponse({
    res,
    message: 'Bad Request',
    statusCode: 400,
    success: false,
  });
}

async function getPostById(id?: string) {
  try {
    if (!id) {
      return false;
    }

    const data: Project | null = await prisma.project.findFirst({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
