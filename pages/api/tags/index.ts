import { NextApiRequest, NextApiResponse } from 'next';
import { errorResponse, successResponse } from '@/lib/httpResponse';
import { prisma } from '@/lib/prisma';
import { withRateLimit } from '@/lib/withRateLimit';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const data = await getAllTags();
        if (data && data.length < 1) {
          return successResponse({
            res,
            message: 'No tags found',
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

async function getAllTags() {
  try {
    const allProjects = await prisma.project.findMany();

    const allTags = allProjects.flatMap((project) => project.tags);
    const lowercasedArray: string[] = allTags.map((str) =>
      str.toLowerCase().trim()
    );
    // console.log("LINE AT 53" , lowercasedArray);

    const uniqueTagsSet = new Set(lowercasedArray);
    // console.log("LINE AT 56" , uniqueTagsSet);

    return Array.from(uniqueTagsSet);
  } catch (error) {
    throw error;
  }
}

export default withRateLimit(handler);
