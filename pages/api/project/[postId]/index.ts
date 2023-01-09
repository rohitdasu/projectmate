import { Project, User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { errorResponse, successResponse } from '@/lib/httpResponse';
import { prisma } from '@/lib/prisma';
import { getServerAuthSession } from '@/lib/getServerAuthSession';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const { postId } = req.query;
      try {
        const session = await getServerAuthSession({ req, res });
        let reqUser: User | null = null;
        if (session) {
          reqUser = await prisma.user.findFirst({
            where: {
              name: session.user?.name,
            },
          });
          if (!reqUser) {
            return errorResponse({
              res,
              message: 'Request User is not found',
              statusCode: 404,
              success: false,
            });
          }
        }
        const data = await getPostById(reqUser, postId?.toString());
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

export async function getPostById(reqUser: User | null, id?: string) {
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
    if (reqUser && data) {
      const like = await prisma.like.findFirst({
        where: {
          AND: [{ userId: reqUser.id }, { projectId: data.id }],
        },
      });
      if (like) {
        data.liked = true;
      }
    }
    return data;
  } catch (error) {
    throw error;
  }
}
