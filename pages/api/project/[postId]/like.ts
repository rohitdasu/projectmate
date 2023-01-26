import { NextApiRequest, NextApiResponse } from 'next';
import {
  errorResponse,
  successResponse,
  validationResponse,
} from '@/lib/httpResponse';
import { prisma } from '@/lib/prisma';
import { getServerAuthSession } from '@/lib/getServerAuthSession';
import { getPostById } from '.';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { postId } = req.query;
  switch (req.method) {
    // desc   Like the project
    // route  POST /api/project/:postId/like
    case 'POST':
      try {
        const session = await getServerAuthSession({ req, res });
        if (!session) {
          return errorResponse({
            res,
            message: 'Unauthorized',
            statusCode: 401,
            success: false,
          });
        }
        const reqUser = await prisma.user.findFirst({
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
        const project = await getPostById(reqUser, postId?.toString());
        if (!project) {
          return errorResponse({
            res,
            message: 'Project is not found',
            statusCode: 404,
            success: false,
          });
        }
        // If the project is yours => throw Error
        if (reqUser?.id === project.authorId) {
          return errorResponse({
            res,
            message: 'This project is yours',
            statusCode: 500,
            success: false,
          });
        }
        const isLiked = await checkLikeProject(
          reqUser.id.toString(),
          project.id.toString()
        );
        if (isLiked) {
          return errorResponse({
            res,
            message: 'You already like this project',
            statusCode: 422,
            success: false,
          });
        }
        const { project: data } = await likeProject(
          reqUser.id.toString(),
          project.id.toString()
        );
        return successResponse({
          res,
          message: '',
          results: data,
          statusCode: 200,
          success: true,
        });
      } catch (error) {
        if (error.name === 'ZodError') {
          return validationResponse({
            res,
            error,
          });
        }
        return errorResponse({
          res,
          message: 'Internal Error',
          statusCode: 500,
          success: false,
        });
      }
    // desc   Unlike the project
    // route  DELETE /api/project/:postId/like
    case 'DELETE':
      try {
        const session = await getServerAuthSession({ req, res });
        if (!session) {
          return errorResponse({
            res,
            message: 'Unauthorized',
            statusCode: 401,
            success: false,
          });
        }
        const reqUser = await prisma.user.findFirst({
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
        const project = await getPostById(reqUser, postId?.toString());
        if (!project) {
          return errorResponse({
            res,
            message: 'Project is not found',
            statusCode: 404,
            success: false,
          });
        }
        // If the project is yours => throw Error
        if (reqUser?.id === project.authorId) {
          return errorResponse({
            res,
            message: 'This project is yours',
            statusCode: 500,
            success: false,
          });
        }
        const isLiked = await checkLikeProject(
          reqUser.id.toString(),
          project.id.toString()
        );
        if (!isLiked) {
          return errorResponse({
            res,
            message: 'You do not like this project',
            statusCode: 422,
            success: false,
          });
        }
        const { project: data } = await unlikeProject(
          reqUser.id.toString(),
          project.id.toString()
        );
        return successResponse({
          res,
          message: '',
          results: data,
          statusCode: 200,
          success: true,
        });
      } catch (error) {
        if (error.name === 'ZodError') {
          return validationResponse({
            res,
            error,
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

async function likeProject(userId: string, postId: string) {
  try {
    const [like, project] = await prisma.$transaction([
      prisma.like.create({
        data: {
          userId: userId,
          projectId: postId,
        },
      }),
      prisma.project.update({
        where: {
          id: postId,
        },
        data: {
          likesCount: {
            increment: 1,
          },
        },
        include: {
          author: true,
        },
      }),
    ]);
    return { like, project };
  } catch (error) {
    throw error;
  }
}

async function unlikeProject(userId: string, postId: string) {
  try {
    const [like, project] = await prisma.$transaction([
      prisma.like.delete({
        where: {
          userId_projectId: {
            userId: userId,
            projectId: postId,
          },
        },
      }),
      prisma.project.update({
        where: {
          id: postId,
        },
        data: {
          likesCount: {
            decrement: 1,
          },
        },
        include: {
          author: true,
        },
      }),
    ]);
    return { like, project };
  } catch (error) {
    throw error;
  }
}

async function checkLikeProject(userId?: string, postId?: string) {
  try {
    const data = await prisma.like.findFirst({
      where: {
        AND: [{ userId: userId }, { projectId: postId }],
      },
    });
    if (data) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
}
