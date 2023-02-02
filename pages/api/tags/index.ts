import { NextApiRequest, NextApiResponse } from 'next';
import { errorResponse, successResponse } from '@/lib/httpResponse';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
    const allTags = new Set<string>();
    allProjects.forEach((project) =>
      project.tags.forEach((tag) => allTags.add(tag))
    );
    return Array.from(allTags);
  } catch (error) {
    throw error;
  }
}
