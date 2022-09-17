import { Project } from '@prisma/client';
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
        if (error.code === 'P2023') {
          return errorResponse({
            res,
            message: 'Invalid project id',
            statusCode: 400,
            success: false,
          });
        }
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
