import { getServerAuthSession } from '@/lib/getServerAuthSession';
import { errorResponse, successResponse } from '@/lib/httpResponse';
import { Project } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { prisma } from '@/lib/prisma';

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
        const data = await getProject(session);
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

async function getProject(session: Session) {
  try {
    const data: Project[] = await prisma.project.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      where: { author: { email: session.user?.email } },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
