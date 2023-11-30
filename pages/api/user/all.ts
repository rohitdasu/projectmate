import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { errorResponse, successResponse } from '@/lib/httpResponse';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      try {
        const data = await getUsers();
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

async function getUsers() {
  try {
    const users: User[] = await prisma.user.findMany();

    const usersWithProjects = await Promise.all(
      users.map(async (user) => {
        const projects = await prisma.project.findMany({
          where: { authorId: user.id },
        });

        const userProjects = projects.map((project) => project.title);

        return {
          id: user.id,
          name: user.name,
          title: user.title,
          username: user.username,
          skills: user.skills,
          description: user.description,
          profilePicture: user.image,
          role: userProjects.length > 0 ? 'GS' : 'NS',
          projects: userProjects,
          numberOfProjects: userProjects.length,
        };
      })
    );

    const sortedUsers = usersWithProjects.sort(
      (a, b) => b.numberOfProjects - a.numberOfProjects
    );

    return sortedUsers;
  } catch (error) {
    throw error;
  }
}
