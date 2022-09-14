import { Project } from '@prisma/client';
import { NextApiResponse, NextApiRequest } from 'next';
import {
  errorResponse,
  successResponse,
  validationResponse,
} from '@/lib/http.response';
import { prisma } from '@/lib/prisma';
import bodyValidator from '@/lib/bodyValidator';
import { postSchema } from '@/schema/index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      try {
        const data = await getAllProject();
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

    case 'POST':
      try {
        const validatedBody = await bodyValidator(req, postSchema);
        const {
          title,
          description,
          githubRepository,
          tags,
          coverImg,
          authorId,
        } = validatedBody;
        const data = await addProject({
          title,
          description,
          githubRepository,
          tags,
          coverImg,
          authorId,
        });
        return successResponse({
          res,
          message: '',
          results: data,
          statusCode: 201,
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

async function getAllProject() {
  try {
    const data: Project[] = await prisma.project.findMany({
      include: { author: true },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

async function addProject(args: {
  title: string;
  description: string;
  githubRepository: string;
  tags: string[];
  coverImg: string;
  authorId: string;
}) {
  const { title, description, githubRepository, tags, coverImg, authorId } =
    args;
  try {
    const data = await prisma.project.create({
      data: {
        title,
        description,
        githubRepository,
        tags,
        coverImg,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
