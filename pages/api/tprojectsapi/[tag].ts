import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { errorResponse, successResponse } from '@/lib/httpResponse';
import { withRateLimit } from '@/lib/withRateLimit';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { tag } = req.query;
      try {
        const data = await getPostById(tag as string | string[] | undefined);
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

async function getPostById(tag: string | string[] | undefined) {
  try {
    if (!tag) {
      return false;
    }
    const includeOption = {
      author: {
        select: {
          name: true,
          image: true,
          username: true,
        },
      },
    };
    const data = await prisma.project.findMany({
      where: {
        tags: {
          // Use Prisma's 'in' filter to find projects with tags matching any in the 'tags' array
          hasEvery: tag,
        },
      },
      include: includeOption,
      orderBy: { createdAt: 'desc' },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export default withRateLimit(handler);
