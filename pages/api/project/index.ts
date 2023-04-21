import { Project } from '@prisma/client';
import { NextApiResponse, NextApiRequest } from 'next';
import {
  errorResponse,
  successResponse,
  validationResponse,
} from '@/lib/httpResponse';
import { prisma } from '@/lib/prisma';
import bodyValidator from '@/lib/bodyValidator';
import { postSchema } from '@/schema/index';
import { getServerAuthSession } from '@/lib/getServerAuthSession';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const { limit, cursorId } = req.query;
      const projectLimit: number = Number(limit) || 10;
      try {
        const data = await getAllProject({
          limit: projectLimit,
          cursorId: cursorId ? cursorId.toString() : undefined,
        });
        return res.json(data);
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
        const session = await getServerAuthSession({ req, res });
        if (!session) {
          return errorResponse({
            res,
            message: 'Unauthorized',
            statusCode: 401,
            success: false,
          });
        }
        const validatedBody = await bodyValidator(req, postSchema);
        const {
          title,
          description,
          content,
          githubRepository,
          tags,
          coverImg,
          email,
        } = validatedBody;
        const data = await addProject({
          title,
          description,
          content,
          githubRepository,
          tags,
          coverImg,
          email,
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

async function getAllProject(args: { limit: number; cursorId?: string }) {
  const { limit, cursorId } = args;
  try {
    let data: Project[];

    const includeOption = {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    };

    if (cursorId) {
      data = await prisma.project.findMany({
        take: limit,
        skip: 1,
        cursor: {
          id: cursorId,
        },
        include: includeOption,
        orderBy: { createdAt: 'desc' },
      });
    } else {
      data = await prisma.project.findMany({
        take: limit,
        include: includeOption,
        orderBy: { createdAt: 'desc' },
      });
    }

    return data;
  } catch (error) {
    throw error;
  }
}

async function addProject(args: {
  title: string;
  description: string;
  content: string;
  githubRepository: string;
  tags: string[];
  coverImg: string;
  email: string;
}) {
  const {
    title,
    description,
    content,
    githubRepository,
    tags,
    coverImg,
    email,
  } = args;
  try {
    const data = await prisma.project.create({
      data: {
        title,
        description,
        content,
        githubRepository,
        tags,
        coverImg,
        author: {
          connect: {
            email: email,
          },
        },
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
