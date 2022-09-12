import { Project } from '@prisma/client';
import { NextApiResponse, NextApiRequest } from 'next';
import { errorResponse, successResponse } from '../../../lib/http.response';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
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
  }

  if (req.method === 'POST') {
    const { title, description, githubRepository, tags, authorId } = req.body;
    try {
      const data = await addProject({
        title,
        description,
        githubRepository,
        tags,
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
  authorId: string;
}) {
  const { title, description, githubRepository, tags, authorId } = args;
  try {
    const data = await prisma.project.create({
      data: {
        title,
        description,
        githubRepository,
        tags,
        authorId,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
